import { Notification, NotificationStatus } from "~/types/notification";
import { HttpService } from "~/services/HttpService";

class NotificationsApi {
  static async all(): Promise<Notification[]> {
    return await HttpService.get("/notifications")
  }

  static async one(id: number): Promise<Notification> {
    return await HttpService.get(`/notifications/${id}`)
  }

  static async updateStatus(id: number, status: NotificationStatus) {
    return await HttpService.post(`/notifications/${id}`, { status })
  }
}

export default NotificationsApi