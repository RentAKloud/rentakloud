import { Component } from "solid-js";

const Testimonial: Component<{
  name: string,
  text: string,
  img: { uri: string, alt: string },
}> = ({ name, text, img }) => {
  return (
    <div class="card w-96 bg-base-100 shadow-xl items-center">
      {
        img && (
          <figure class="p-5 h-60 w-60">
            <img src={img.uri} alt={img.alt} class="rounded-full" style={{ height: "100%", "object-fit": "cover" }} />
          </figure>
        )
      }
      <div class="card-body">
        {/* <h2 class="card-title">{title}</h2> */}
        <p class="italic">{text}</p>
        {name && <p>— {name}</p>}
      </div>
    </div>
  )
}

export default Testimonial