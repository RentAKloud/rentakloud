import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { Config, Prisma, InstanceStatus, Instance, User, Subscription, Product } from "@prisma/client";
import { PrismaService } from "./prisma.service";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { spawn } from "child_process";
import { CreateInstance, InstancesFindManyQuery } from "src/types/instances.dto";
import { ConfigService } from "@nestjs/config";
import { ProvisioningJob } from "src/queue-consumers/provisioning.consumer";
import { Queue } from "bull";
import { InjectQueue } from "@nestjs/bull";

@Injectable()
export class InstancesService {
  private readonly logger = new Logger(InstancesService.name);

  constructor(
    private prisma: PrismaService,
    private ee: EventEmitter2,
    private readonly config: ConfigService,
    @InjectQueue('provisioning') private provisioningQueue: Queue<ProvisioningJob>
  ) { }

  async instances(params: InstancesFindManyQuery) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.instance.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        subscription: {
          include: {
            product: {
              select: {
                name: true,
                images: true
              }
            }
          }
        },
      }
    })
  }

  async instance(where: Prisma.InstanceWhereUniqueInput) {
    return this.prisma.instance.findUnique({
      where,
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
          include: {
            config: true,
            user: true,
            subscription: {
              include: {
                product: {
                  select: { slug: true }
                }
              }
            }
          }
        })
      )
    )

    _instances.forEach((instance) => {
      this.ee.emit('instance.created', instance)
      this.provisioningQueue.add(instance)
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
    const result = await this.prisma.instance.delete({
      where: { id },
      include: { subscription: true }
    })

    this.ee.emit("instance.deleted", result)

    return result
  }

  async count(params: InstancesFindManyQuery) {
    return this.prisma.instance.count(params)
  }

  async initIPSecTunnel(vmId: string) {
    const cmd = `/sbin/ipsec down ${vmId}; /sbin/ipsec up ${vmId}`
    const { status, output } = await this._script(cmd)

    if (status && output && output.includes("established successfully")) {
      return true
    } else {
      return false
    }
  }

  async initProvisioning(instance: Instance & {
    config: Config, user: User, subscription: Subscription & { product: { slug: string } }
  }) {

    const d = {
      id: instance.vmId, title: instance.title,
      cpus: instance.config.cpus,
      ram: instance.config.ram,
      ssd: instance.config.ssd,
      hdd: instance.config.hdd,
    }

    // Step 1: Save VM info in db.json
    const K = 1024
    const vmType = instance.subscription.product.slug === "rak-daas" ? 'w10pro' : 'deb12'
    const customerId = instance.user.id + 5000
    const vmId = d.id

    const cmd1 = `/home/scripts/crvminfo.sh ${vmId} ${customerId} ${d.cpus} ${d.ram * K} ${d.ssd * K} ${vmType}`
    const { status, output } = await this._script(cmd1)

    if (status) {
      this.logger.debug("1. crvminfo.sh done")
    } else {
      this.logger.error("1. crvminfo failed", output)
      return
    }

    /** Step 2: Get provision target server and slot **/
    const cmd2 = `/home/scripts/getavailslot.sh`
    const { status: status2, output: output2 } = await this._script(cmd2)

    if (status2) {
      this.logger.debug("2. getavailslot.sh done")
    } else {
      this.logger.error("2. getavailslot failed")
      return
    }

    // slot is just an index used for ports
    const [vmHost, hostIp, slot] = output2.split("\n")

    this.updateInstance({
      where: { id: instance.id, vmId },
      data: {
        hostName: vmHost,
        hostIp,
        wsPort: 7000 + +slot,
        vncPath: `/vm${vmId}`
      }
    })

    // Step 3: Call distvms.sh
    const cmd = `/home/scripts/distvms.sh ${vmId} ${vmHost} ${hostIp} ${slot}`
    const { status: status3, output: output3 } = await this._script(cmd)

    if (status3) {
      this.logger.debug("3. distvms done", output3)
    } else {
      this.logger.error("3. distvms failed", output3)
      return
    }
  }

  _script(cmd: string): Promise<{
    status: boolean
    output: string
    error?: string
  }> {
    const isDev = this.config.get('NODE_ENV') === 'development'
    // Assuming our SSH id is added to the target server, so we are not prompted for password
    const remote = `rkadmin@rentakloud.com`

    return new Promise((resolve, reject) => {
      const child = spawn(isDev ? `ssh ${remote} '${cmd}'` : cmd, {
        shell: true
      })

      child.on('exit', (code, signal) => {
        const output: string = child.stdout.read()?.toString()
        if (code === 0) {
          resolve({ status: true, output })
        } else {
          resolve({ status: false, output, error: "Non-zero exit code" })
        }
      })

      child.on('error', (err) => {
        this.logger.error(err)
        reject(err)
      })
    })
  }

  async action(id: string, action: "start" | "stop" | "restart") {
    const { vmId } = (await this.instances({
      where: {
        OR: [
          { id },
          { vmId: +id || undefined }
        ]
      }
    }))[0]

    const actions = {
      "start": `/home/scripts/start-vm-onhost.sh ${vmId}`,
      "stop": `/home/scripts/powerdown-vm-onhost.sh ${vmId}`,
      "restart": `/home/scripts/reboot-vm-onhost.sh ${vmId}`,
    }

    const { status, output, error } = await this._script(actions[action])

    if (!status) {
      console.error(output, error)
      throw new BadRequestException(error)
    }

    return { status }
  }
}