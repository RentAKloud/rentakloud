import { ApiResponse, HttpService } from "~/services/HttpService";
import { Paginated } from "~/types/common";
import { InstanceConfig } from "~/types/instance";

class ConfigsApi {
  static async all(query?: URLSearchParams): ApiResponse<Paginated<InstanceConfig>> {
    return await HttpService.get("/configs", query)
  }

  static async one(id: number): ApiResponse<InstanceConfig> {
    return await HttpService.get(`/configs/${id}`)
  }
}

export default ConfigsApi