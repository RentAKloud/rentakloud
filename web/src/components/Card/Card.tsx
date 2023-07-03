import { Component, JSXElement, Show } from "solid-js";

const Card: Component<{
  title: string,
  description: string | JSXElement,
  img?: { uri: string, alt: string },
  actions?: JSXElement,
  center?: boolean,
  class?: string
}> = ({ title, description, img, actions, center = false, class: _class }) => {
  return (
    <div class={`card bg-base-100 shadow-xl ${_class || ""}`}>
      {
        img && <figure class="p-5 h-60"><img src={img.uri} alt={img.alt} style={{ height: "100%", "object-fit": "contain" }} /></figure>
      }
      <div class={`card-body ${center && "text-center items-center"}`}>
        <h2 class="card-title">{title}</h2>
        <Show when={typeof description === "string"}>
          <p innerHTML={description as string} />
        </Show>

        <Show when={typeof description === "object"}>
          <p>{description}</p>
        </Show>

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