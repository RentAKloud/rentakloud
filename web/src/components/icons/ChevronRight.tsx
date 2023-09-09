import { Component } from "solid-js";

type ChevronProps = {
  class?: string
  left?: boolean
  down?: boolean
}

const ChevronRightIcon: Component<ChevronProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
      class={`w-6 h-6 ${props.class || ''}`} classList={{
        "rotate-180": props.left,
        "rotate-90": props.down
      }}
    >
      <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
  )
}

export default ChevronRightIcon