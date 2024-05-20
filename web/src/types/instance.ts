import { Product } from "./product";


export type Instance = {
  id: string;
  title: string;
  subscription: {
    product: Product;
  };
  config: InstanceConfig;
  addons: InstanceAddon[];
  createdAt: string;
  vncPath?: string;
  status: "Pending" | "Active" | "Inactive";
};

export type InstanceConfig = {
  id: number
  ram: number
  cpus: number
  ssd: number
  hdd: number
}

export type InstanceAddonKey = "cpu" | "ram" | "hdd" | "ssd";

export type InstanceAddon = {
  id: InstanceAddonKey;
  quantity: number;
};

export type CreateInstanceReq = {
  subscriptionId: string;
  productId: number;
  priceId: string;
};

