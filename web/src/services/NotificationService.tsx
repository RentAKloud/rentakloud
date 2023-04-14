import { Toast, toaster } from "@kobalte/core";
import { JSXElement } from "solid-js";

export class NotificationService {
  static info(message: string | JSXElement) {
    toaster.show(props => (
      <Toast.Root toastId={props.toastId} class="alert alert-info">
        <Toast.Title>{message}</Toast.Title>
      </Toast.Root>
    ))
  }
}