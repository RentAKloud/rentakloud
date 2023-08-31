import { JSXElement } from "solid-js"

export type LayoutProps = {
  children: JSXElement
  title?: string
}

export type Icon = {
  class?: string;
  children?: JSXElement;
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