import { Component } from "solid-js";
import Icon from "./Icon";

type ChevronProps = {
  class?: string;
};

const ChevronRight: Component<ChevronProps> = (props) => {
  return (
    <Icon class={`${props.class || ""} stroke-current`}>
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M8.25 4.5l7.5 7.5-7.5 7.5"
      />
    </Icon>
  );
};

export default ChevronRight;
