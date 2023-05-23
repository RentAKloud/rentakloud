import { Component } from "solid-js";

const ChevronRightIcon: Component<{
  left?: boolean;
}> = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" classList={{ "rotate-180": props.left }}>
      <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
  )
}

export default ChevronRightIcon