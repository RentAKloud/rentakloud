import { Component, JSXElement } from "solid-js";

const Card: Component<{
  title: string,
  description: string | JSXElement,
  img?: { uri: string, alt: string },
  actions?: JSXElement,
  center?: boolean
}> = ({ title, description, img, actions, center = false }) => {
  return (
    <div class="card w-96 bg-base-100 shadow-xl">
      {
        img && <figure class="p-5 h-60"><img src={img.uri} alt={img.alt} style={{ height: "100%", "object-fit": "contain" }} /></figure>
      }
      <div class={`card-body ${center && "text-center items-center"}`}>
        <h2 class="card-title">{title}</h2>
        <p>{description}</p>
        <div class="card-actions justify-center mt-5">
          {actions}
        </div>
      </div>
    </div>
  )
}

export default Card