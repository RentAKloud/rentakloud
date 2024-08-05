import { Component } from "solid-js";
import { Icon as IconProps } from "~/types/ui";
import Icon from "./Icon";

const Power: Component<IconProps> = (props) => {
  return (
    <Icon class="inline-block stroke-current">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9"
      />
    </Icon>
  );
};

export default Power;
