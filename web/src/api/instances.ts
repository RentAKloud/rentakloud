import { ApiResponse, HttpService } from "~/services/HttpService";
import { CreateInstanceReq } from "~/types/instance";
import { Instance } from "~/types/instance";

class InstancesApi {
  static async all(): ApiResponse<Instance[]> {
    return await HttpService.get("/instances")
  }

  static async one(id: string): ApiResponse<Instance> {
    return await HttpService.get(`/instances/${id}`)
  }

  static async createMany(subscriptions: CreateInstanceReq[]) {
    return await HttpService.post("/instances", { subscriptions })
  }

  static async update(id:string, instance: Partial<Instance>) {
    return await HttpService.patch(`/instances/${id}`, instance)
  }

  static async delete(id: string) {
    return await HttpService.delete(`/instances/${id}`)
  }

  static async initVNCTunnel(vmId: string) {
    return await HttpService.post('/instances/setup-vnc-tunnel', { vmId })
  }
}

export default InstancesApi