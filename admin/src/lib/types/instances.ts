import type { Product } from "./common";

export type Instance = {
  id: string;
  title: string
  product: Product;
  addons: InstanceAddon[]
  config: Config
  createdAt: string;
  vncPath?: string;
  status: "Pending" | "Active" | "Inactive";
}

export type Config = {
  id: number
  name: string
  cpus: number
  ram: number // GBs
  ssd: number
  hdd: number
}

export type InstanceAddonKey = "cpu" | "ram" | "hdd" | "ssd"

export type InstanceAddon = {
  id: InstanceAddonKey
  quantity: number
}