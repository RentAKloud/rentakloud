export type InstanceAddonKey = "cpu" | "ram" | "hdd" | "ssd"

export type InstanceAddon = {
  id: InstanceAddonKey
  quantity: number
}

export type PlanPrice = {
  amount: number
  currency: string
  priceId: string
  interval: string
}

export type Plan = {
  planName: string
  prices: PlanPrice[]
  addons: {
    id: InstanceAddonKey
    prices: PlanPrice[]
  }[]
}