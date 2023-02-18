import { Component, JSXElement } from "solid-js";

const Card: Component<{
  title: string,
  description: string,
  img: { uri: string, alt: string },
  actions?: JSXElement
}> = ({ title, description, img, actions }) => {
  return (
    <div class="card w-96 bg-base-100 shadow-xl">
      {
        img && <figure class="p-5 h-60"><img src={img.uri} alt={img.alt} /></figure>
      }
      <div class="card-body">
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