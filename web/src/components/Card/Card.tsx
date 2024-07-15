import { Component, Show } from "solid-js";
import { CardProps } from "~/types/ui";
import "./Card.css";

const Card: Component<CardProps> = (props) => {
  const {
    title,
    description,
    img,
    actions,
    center = false,
    actionsAlign = "center",
  } = props;

  return (
    <div
      class={`card shadow-xl ${props.class || ""}`}
      classList={{
        "gradient-shadow": props.hasGradientShadow,
      }}
    >
      <div
        class="z-0 rounded-2xl bg-base-100 h-full bg-cover"
        style={{
          "background-image": props.bgImg ? `url(${props.bgImg})` : "none",
        }}
      >
        <Show when={img}>
          <figure class="p-5 h-60">
            <img
              src={img!.uri}
              alt={img!.alt}
              style={{ height: "100%", "object-fit": "contain" }}
              loading="lazy"
            />
          </figure>
        </Show>

        <div
          class={`card-body`}
          classList={{
            "text-center items-center": center,
          }}
        >
          <h2 class="card-title">{title}</h2>

          <Show when={typeof description === "string"}>
            <p innerHTML={description as string} />
          </Show>

          <Show when={typeof description === "object"}>
            <div>{description}</div>
          </Show>

          {props.children}

          <Show when={actions}>
            <div
              class="card-actions justify-center mt-5"
              classList={{
                "justify-center": actionsAlign === "center",
                "justify-left": actionsAlign === "left",
                "justify-right": actionsAlign === "right",
              }}
            >
              {actions}
            </div>
          </Show>
        </div>
      </div>
    </div>
  );
};

export default Card;
