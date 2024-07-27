import { Toast, toaster } from "@kobalte/core/toast";
import { JSXElement } from "solid-js";

export class NotificationService {
  private static toast(
    message: string | JSXElement,
    type: "info" | "success" | "error",
  ) {
    toaster.show((props) => (
      <Toast
        toastId={props.toastId}
        class="alert"
        classList={{
          "alert-success": type === "success",
          "alert-info": type === "info",
          "alert-error": type === "error",
        }}
      >
        <Toast.Title>{message}</Toast.Title>
      </Toast>
    ));
  }

  static info(message: string | JSXElement) {
    this.toast(message, "info");
  }

  static success(message: string | JSXElement) {
    this.toast(message, "success");
  }

  static error(message: string | JSXElement) {
    this.toast(message, "error");
  }
}
