import { JSXElement } from "solid-js";

export type LayoutProps = {
  children: JSXElement;
  title?: string;
};

export type Icon = {
  class?: string;
  children?: JSXElement;
  viewBox?: string;
};

export type HeroWithBgProps = {
  title?: string | JSXElement;
  subtitle?: string;
  children?: JSXElement;
  bgUrl?: string;
  actions?: JSXElement;
  header?: JSXElement;
  contain?: boolean;
  align?: "center" | "left";
  notFullScreen?: boolean;
  class?: string;
  bgFixed?: boolean;
};

export type CardProps = {
  title: string | JSXElement;
  description?: string | JSXElement;
  children?: JSXElement;
  img?: { uri: string; alt: string };
  bgImg?: string;
  actions?: JSXElement;
  center?: boolean;
  class?: string;
  bgClass?: string;
  actionsAlign?: "center" | "left" | "right";
  hasGradientShadow?: boolean;
};

export type SearchProps = {
  onInput?: (value: string) => void;
};

export type SelectOption = {
  label: string;
  value: string;
};
