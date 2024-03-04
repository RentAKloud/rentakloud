import { createEffect, createResource } from "solid-js"
import NotificationsApi from "~/api/notifications"
import { authStore } from "./auth"
import { NotificationStatus } from "~/types/notification"
import { HttpService } from "~/services/HttpService"
import { AppSettings } from "~/types/common"

export const [notifications, { refetch: refetchNotifications }] = createResource(async () => {
  if (!authStore.user) return

  const params = new URLSearchParams([["status", NotificationStatus.Created]])
  const { result, error } = await NotificationsApi.all(params)
  if (!error) {
    return result
  }
})

createEffect(() => {
  if (authStore.user) refetchNotifications()
})


export const [appSettings, { refetch: refetchAppSettings }] = createResource(async () => {
  const { result, error } = await HttpService.get<AppSettings>("/options/app-settings")
  if (!error) {
    return result
  }
})