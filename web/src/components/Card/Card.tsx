import { Component, Show } from "solid-js";
import { Card as _Card } from "../../types/ui";

const Card: Component<_Card> = (props) => {
  const { title, description, img, actions, center = false } = props

  return (
    <div class={`card bg-base-100 shadow-xl ${props.class || ""}`}>
      <Show when={img}>
        <figure class="p-5 h-60"><img src={img!.uri} alt={img!.alt} style={{ height: "100%", "object-fit": "contain" }} /></figure>
      </Show>

      <div class={`card-body ${center && "text-center items-center"}`}>
        <h2 class="card-title">{title}</h2>

        <Show when={typeof description === "string"}>
          <p innerHTML={description as string} />
        </Show>

        <Show when={typeof description === "object"}>
          <p>{description}</p>
        </Show>

        {props.children}

        <Show when={actions}>
          <div class="card-actions justify-center mt-5">
            {actions}
          </div>
        </Show>
      </div>
    </div>
  )
}

export default Card