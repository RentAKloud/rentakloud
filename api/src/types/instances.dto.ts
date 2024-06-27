import { InstanceStatus, Prisma } from "@prisma/client"
import { Expose, Transform } from "class-transformer"
import { IsOptional } from "class-validator"

export type InstanceAddonKey = "cpu" | "ram" | "hdd" | "ssd"

export type InstanceAddon = {
  id: InstanceAddonKey
  quantity: number
}

export type CreateInstance = {
  subscriptionId: string
  priceId: string
  productId: number
  configId: number
}

export type PlanPrice = {
  amount: number
  currency: string
  priceId: string
  interval: string
}

export type Plan = {
  planName: string
  configId: number
  prices: PlanPrice[]
  addons: {
    id: InstanceAddonKey
    prices: PlanPrice[]
  }[]
}

export type InstanceCallback = {
  status: InstanceStatus
  vncPath: string
  publicIp: string
  privateIp: string
}

export class InstancesQuery {
  @Expose({ name: 'sort-by' })
  @IsOptional()
  @Transform(({ value }) => ['title', 'createdAt'].includes(value) ? value : '')
  sortBy: string

  @IsOptional()
  @Transform(({ value }) => +value)
  page: number

  @Expose({ name: 'page-size' })
  @IsOptional()
  @Transform(({ value }) => +value)
  pageSize: number

  @IsOptional()
  q: string
}

export class InstancesFindManyQuery {
  skip?: number;
  take?: number;
  cursor?: Prisma.InstanceWhereUniqueInput;
  where?: Prisma.InstanceWhereInput;
  orderBy?: Prisma.InstanceOrderByWithRelationInput;
}