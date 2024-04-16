import { Injectable } from "@nestjs/common";
import { Prisma, UserProductStatus, UserToProducts } from "@prisma/client";
import { PrismaService } from "./prisma.service";
import { EventEmitter2, OnEvent } from "@nestjs/event-emitter";
import { spawn } from "child_process";

type CreateInstance = { subscriptionId: string, priceId: string, productId: number }

@Injectable()
export class InstancesService {
  constructor(
    private prisma: PrismaService,
    private ee: EventEmitter2
  ) { }

  async instances(userId: number) {
    return this.prisma.userToProducts.findMany({
      where: { userId },
      include: { product: true }
    })
  }

  async instance(id: string, userId: number) {
    return this.prisma.userToProducts.findUnique({
      where: { id, userId },
      include: { product: true }
    })
  }

  async createInstances(instances: CreateInstance[], userId: number) {
    const _instances = await this.prisma.$transaction(
      instances.map((i) =>
        this.prisma.userToProducts.create({
          data: {
            userId: userId,
            productId: i.productId,
            subscriptionId: i.subscriptionId,
            status: UserProductStatus.Pending,
          }
        })
      )
    )

    _instances.forEach((instance) => {
      this.ee.emit('instance.created', instance)
      this.putJson(instance)
    })
  }

  async updateInstance(params: {
    where: Prisma.UserToProductsWhereUniqueInput;
    data: Prisma.UserToProductsUpdateInput;
  }) {
    const { where, data } = params;
    data.updatedAt = new Date()

    const rv = await this.prisma.userToProducts.update({
      data,
      where,
      include: {
        product: true
      },
    });

    if (data.addons) {
      this.ee.emit("instance.addons.updated", rv.subscriptionId, data.addons, rv.product.prices)
    }

    return rv
  }

  async deleteInstance(id: string) {
    const result = await this.prisma.userToProducts.delete({ where: { id } })

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

  putJson(instance: UserToProducts) {
    return new Promise((res, rej) => {
      const json = JSON.stringify({ id: instance.id, title: instance.title })
      const remote = "rkadmin@rentakloud.com"

      // Assuming our SSH id is added to the target server, so we are not prompted for password
      const child = spawn(`echo '${json}' | ssh ${remote} 'cat > /tmp/db.json'`, {
        shell: true
      })

      child.on('exit', (code, signal) => {
        const output: string = child.stdout.read()?.toString()
        if (code === 0) {
          res(true)
        } else {
          res(false)
        }
      })

      child.on('error', (err) => {
        rej(err)
      })
    })
  }
}