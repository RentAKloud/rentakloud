import { createResource } from "solid-js"
import NotificationsApi from "~/api/notifications"

export const [notifications, { refetch }] = createResource(async () => {
  const { result, error } = await NotificationsApi.all()
  if (!error) {
    return result
  }
})