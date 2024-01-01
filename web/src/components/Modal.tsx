import { AlertDialog } from "@kobalte/core";
import { Component, JSXElement, Show } from "solid-js";

const Modal: Component<{
  title: string;
  description: string | JSXElement;
  actions?: JSXElement;
  onClose?: () => void;
  isOpen?: boolean;
  hideCloseBtn?: boolean;
}> = (props) => {
  return (
    <AlertDialog.Root open={props.isOpen} onOpenChange={(isOpen => console.log(isOpen))}>
      {/* <AlertDialog.Trigger class="btn">Open</AlertDialog.Trigger> */}
      <AlertDialog.Portal>
        <AlertDialog.Overlay class="fixed inset-0 z-50" />
        <AlertDialog.Content class="modal modal-open modal-bottom sm:modal-middle"
          onclick={(e) =>
            e.target.classList.contains("modal-open") && props.onClose && props.onClose()
          }>
          <div class="modal-box relative">
            <AlertDialog.Title class="font-bold text-lg">{props.title}</AlertDialog.Title>

            <Show when={!props.hideCloseBtn}>
              <AlertDialog.CloseButton class="btn btn-sm btn-circle absolute right-2 top-2" onClick={props.onClose}>
                ✕
              </AlertDialog.CloseButton>
            </Show>
            <AlertDialog.Description class="">
              {props.description}
              <div class="modal-action">
                {props.actions}
              </div>
            </AlertDialog.Description>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}

export default Modal