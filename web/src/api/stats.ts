import { ApiResponse, HttpService } from "~/services/HttpService";

class StatsApi {
  static async dashboard(): ApiResponse<any> {
    return await HttpService.get("/stats/dashboard")
  }
}

export default StatsApi