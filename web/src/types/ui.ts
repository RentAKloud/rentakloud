import { JSXElement } from "solid-js"

export type LayoutProps = {
  children: JSXElement
  title?: string
}

export type Icon = {
  class?: string;
  children?: JSXElement;
}

export type HeroWithBgProps = {
  title?: string,
  subtitle?: string,
  children?: JSXElement,
  bgUrl?: string,
  actions?: JSXElement,
  header?: JSXElement,
  contain?: boolean,
  align?: "center" | "left",
  notFullScreen?: boolean
  class?: string
  bgFixed?: boolean
}

export type Card = {
  title: string,
  description?: string | JSXElement,
  children?: JSXElement,
  img?: { uri: string, alt: string },
  actions?: JSXElement,
  center?: boolean,
  class?: string
}

export type SearchProps = {
  onInput?: (value: string) => void
}