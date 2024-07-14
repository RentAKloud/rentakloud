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
  vmId: number;
  status: "Pending" | "Active" | "Inactive";
  hostIp: string;
  privateIp: string;
  publicIp: string;
  hostName: string;
  wsPort: number;
};

export type InstanceConfig = {
  id: number;
  name: string;
  ram: number;
  cpus: number;
  ssd: number;
  hdd: number;
};

export type InstanceAddonKey = "cpu" | "ram" | "hdd" | "ssd";

export type InstanceAddon = {
  id: InstanceAddonKey;
  quantity: number;
};

export type CreateInstanceReq = {
  subscriptionId: string;
  productId: number;
  planId: number;
  priceId: string;
};

export type InstanceAction = "start" | "stop" | "restart" | "start-ssh";
