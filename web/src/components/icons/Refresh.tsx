import { Component } from "solid-js";
import { Icon as IconProps } from "~/types/ui";
import Icon from "./Icon";

const Refresh: Component<IconProps> = (props) => {
  return (
    <Icon class="inline-block stroke-current">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
      />
    </Icon>
  );
};

export default Refresh;
