import { Component } from "solid-js";
import { Icon as IconProps } from "~/types/ui";
import Icon from "./Icon";

const MenuIcon: Component<IconProps> = (props) => {
  return (
    <Icon class="inline-block stroke-current">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
    </Icon>
  )
}

export default MenuIcon