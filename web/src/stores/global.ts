import { createEffect, createResource, onCleanup } from "solid-js";
import NotificationsApi from "~/api/notifications";
import { authStore } from "./auth";
import { NotificationStatus } from "~/types/notification";
import { HttpService } from "~/services/HttpService";
import { AppSettings } from "~/types/common";
import { API_URL } from "~/config/constants";

export const [notifications, { refetch: refetchNotifications }] =
  createResource(async () => {
    if (!authStore.user) return;

    const params = new URLSearchParams([
      ["status", NotificationStatus.Created],
    ]);
    const { result, error } = await NotificationsApi.all(params);
    if (!error) {
      return result;
    }
  });

createEffect(() => {
  if (authStore.user) refetchNotifications();
});

export const [appSettings, { refetch: refetchAppSettings }] = createResource(
  async () => {
    const { result, error } = await HttpService.get<AppSettings>(
      "/options/app-settings",
    );
    if (!error) {
      return result;
    }
  },
);

createEffect(() => {
  if (!authStore.access_token) return;

  const eventSource = new EventSource(
    API_URL + `/sse?token=${authStore.access_token}`,
    {},
  );

  eventSource.onopen = (e) => {
    console.log("SSE connection established");
  };

  eventSource.onmessage = onMessage;

  eventSource.onerror = (e) => {
    console.log("SSE connection errored");
  };

  onCleanup(() => {
    eventSource.removeEventListener("message", onMessage);
    eventSource.close();
  });

  function onMessage({ data }: MessageEvent) {
    const { type, data: d } = JSON.parse(data);
    if (type === "update") {
      if (d === "app-settings") refetchAppSettings();
    }
  }
});
