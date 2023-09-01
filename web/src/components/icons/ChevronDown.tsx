import { Component } from "solid-js";
import ChevronRightIcon from "./ChevronRight";

const ChevronDownIcon: Component<{class?: string}> = (props) => {
  return (
    <ChevronRightIcon down={true} class={props.class} />
  )
}

export default ChevronDownIcon