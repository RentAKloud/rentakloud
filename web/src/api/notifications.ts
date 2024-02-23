import { Notification, NotificationStatus } from "~/types/notification";
import { ApiResponse, HttpService } from "~/services/HttpService";

class NotificationsApi {
  static async all(query?: URLSearchParams): ApiResponse<Notification[]> {
    return await HttpService.get("/notifications", query)
  }

  static async one(id: number): ApiResponse<Notification> {
    return await HttpService.get(`/notifications/${id}`)
  }

  static async updateStatus(id: string, status: NotificationStatus) {
    return await HttpService.patch(`/notifications/${id}`, { status })
  }
}

export default NotificationsApi