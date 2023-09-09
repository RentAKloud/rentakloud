import { Accordion as KAccordion } from "@kobalte/core";
import { Component, For, JSXElement } from "solid-js";
import ChevronDownIcon from "../icons/ChevronDown";
import './Accordion.css'

const Accordion: Component<{
  items: {
    heading: string
    body: string | JSXElement
  }[]
}> = (props) => {
  return (
    <KAccordion.Root class="accordion" defaultValue={["item-1"]}>
      <For each={props.items}>
        {(item, index) => (
          <KAccordion.Item class="border-2 border-accent px-10 py-6 mb-6" value={`item-${index() + 1}`}>
            <KAccordion.Trigger class="w-full">
              <KAccordion.Header class="flex justify-between items-center mb-4">
                <h3 class="text-2xl font-bold ">{item.heading}</h3>
                <ChevronDownIcon aria-hidden />
              </KAccordion.Header>
            </KAccordion.Trigger>
            <KAccordion.Content class="accordion__item-content">
              <div class="">
                {item.body}
              </div>
            </KAccordion.Content>
          </KAccordion.Item>
        )}
      </For>
    </KAccordion.Root>
  )
}

export default Accordion