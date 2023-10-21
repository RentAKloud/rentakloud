import { Notification, NotificationStatus } from "~/types/notification";
import { ApiResponse, HttpService } from "~/services/HttpService";

class NotificationsApi {
  static async all(): ApiResponse<Notification[]> {
    return await HttpService.get("/notifications")
  }

  static async one(id: number): ApiResponse<Notification> {
    return await HttpService.get(`/notifications/${id}`)
  }

  static async updateStatus(id: number, status: NotificationStatus) {
    return await HttpService.post(`/notifications/${id}`, { status })
  }
}

export default NotificationsApi