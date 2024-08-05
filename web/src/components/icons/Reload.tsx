import { Component } from "solid-js";
import { Icon as IconProps } from "~/types/ui";
import Icon from "./Icon";

const Reload: Component<IconProps> = (props) => {
  return (
    <Icon class="inline-block stroke-current">
      <polyline points="23 4 23 10 17 10"></polyline>
      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
    </Icon>
  );
};

export default Reload;
