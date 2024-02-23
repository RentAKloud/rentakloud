import { createEffect, createResource } from "solid-js"
import NotificationsApi from "~/api/notifications"
import { authStore } from "./auth"
import { NotificationStatus } from "~/types/notification"

export const [notifications, { refetch }] = createResource(async () => {
  if (!authStore.user) return

  const params = new URLSearchParams([["status", NotificationStatus.Created]])
  const { result, error } = await NotificationsApi.all(params)
  if (!error) {
    return result
  }
})

createEffect(() => {
  if (authStore.user) refetch()
})