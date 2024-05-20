import { Injectable } from "@nestjs/common";
import { Config, Prisma, InstanceStatus, Instance } from "@prisma/client";
import { PrismaService } from "./prisma.service";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { spawn } from "child_process";
import { CreateInstance } from "src/types/instances.dto";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class InstancesService {
  constructor(
    private prisma: PrismaService,
    private ee: EventEmitter2,
    private readonly config: ConfigService,
  ) { }

  async instances(userId: number) {
    return this.prisma.instance.findMany({
      where: { userId },
      include: {
        subscription: {
          include: {
            product: {
              select: { name: true, images: true }
            }
          }
        },
      }
    })
  }

  async instance(id: string, userId: number) {
    return this.prisma.instance.findUnique({
      where: { id, userId },
      include: {
        subscription: {
          include: {
            product: {
              select: { name: true, images: true }
            }
          }
        },
        config: true
      }
    })
  }

  async createInstances(instances: CreateInstance[], userId: number) {
    const _instances = await this.prisma.$transaction(
      instances.map((i) =>
        this.prisma.instance.create({
          data: {
            user: { connect: { id: userId } },
            subscription: { connect: { id: i.subscriptionId } },
            config: { connect: { id: i.configId } },
            status: InstanceStatus.Pending,
          },
          include: { config: true }
        })
      )
    )

    _instances.forEach((instance) => {
      this.ee.emit('instance.created', instance)
      this.initProvisioning(instance)
    })
  }

  async updateInstance(params: {
    where: Prisma.InstanceWhereUniqueInput;
    data: Prisma.InstanceUpdateInput;
  }) {
    const { where, data } = params;
    data.updatedAt = new Date()

    const rv = await this.prisma.instance.update({
      data,
      where,
      include: {
        subscription: {
          include: {
            product: true
          }
        }
      },
    });

    if (data.addons) {
      this.ee.emit("instance.addons.updated", rv.subscriptionId, data.addons, rv.subscription.product.prices)
    }

    return rv
  }

  async deleteInstance(id: string) {
    const result = await this.prisma.instance.delete({ where: { id } })

    this.ee.emit("user_product.deleted", result)

    return result
  }

  initIPSecTunnel(vmId: string) {
    return new Promise((res, rej) => {
      const child = spawn(`/sbin/ipsec down ${vmId}; /sbin/ipsec up ${vmId}`, {
        shell: true,
      })

      child.on('exit', (code, signal) => {
        // child.stdout.on('data', (chunk) => {
        //   res(chunk.toString())
        // })
        const output: string = child.stdout.read()?.toString()
        if (code === 0 && output && output.includes("established successfully")) {
          res(true)
        } else {
          res(false)
        }
      })

      // child.on('message', (msg) => {
      //   console.log(msg)
      //   res(msg)
      // })

      child.on('error', (err) => {
        rej(err)
      })
    })
  }

  initProvisioning(instance: Instance & { config: Config },
    vmId?: number, custId?: number, slotId?: number // for testing only (these are supposed to be system generated)
  ) {
    const isDev = this.config.get('NODE_ENV') === 'development'

    return new Promise((res, rej) => {
      const d = {
        id: instance.id, title: instance.title,
        cpus: instance.config.cpus,
        ram: instance.config.ram,
        ssd: instance.config.ssd,
        hdd: instance.config.hdd,
      }
      const json = JSON.stringify(d)
      // const env = this.config.get('NODE_ENV')
      const remote = `rkadmin@rentakloud.com`

      // Assuming our SSH id is added to the target server, so we are not prompted for password
      // const child = spawn(`echo '${json}' | ssh ${remote} 'cat > /tmp/db.json'`, {
      //   shell: true
      // })

      // Step 1: Save VM info in db.json
      const vmType = 'win10pro'
      const cmd = `/home/scripts/crvminfo.sh ${vmId} ${custId} ${d.cpus} ${d.ram} ${d.ssd} ${vmType}`
      const child = spawn(isDev ? `ssh ${remote} '${cmd}'` : cmd, {
        shell: true
      })

      child.on('exit', (code, signal) => {
        const output: string = child.stdout.read()?.toString()
        if (code === 0) {
          res(true)
          console.log("done")

          /** Step 2: Use infra.json to figure out which rak/server to provision to */
          const vmHost = 'rakserver03'
          const hostIp = '192.168.10.193'
          const slot = slotId // an index used for ports

          // Step 3: Call distvms.sh
          const cmd = `/home/scripts/distvms.sh ${vmId} ${vmHost} ${hostIp} ${slot}`
          const distVmChild = spawn(isDev ? `ssh ${remote} '${cmd}'` : cmd, {
            shell: true
          })

          // Step 4: Call depvm-on-all.sh
          // const distVmChild = spawn(`ssh ${remote} '/home/scripts/depvm-on-all.sh ${vmId}'`, {
          //   shell: true
          // })

          distVmChild.on('exit', (code, signal) => {
            const output: string = child.stdout.read()?.toString()
            if (code === 0) {
              res(true)
              console.log("done", output)
            } else {
              res(false)
              console.log(code, "something wrong", output)
            }
          })

          distVmChild.on('error', (err) => {
            console.log(err)
            rej(err)
          })
        } else {
          res(false)
          console.log(code, "something wrong", output)
        }
      })

      child.on('error', (err) => {
        console.log(err)
        rej(err)
      })
    })
  }
}