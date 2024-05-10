import { Component } from "solid-js";
import { Icon as _Icon } from "~/types/ui";

const Icon: Component<_Icon> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
      // stroke="currentColor"
      class={props.class}
      classList={{
        "w-6 h-6": !props.class?.includes("w-")
      }}
    >
      {props.children}
    </svg>
  )
}

export default Icon