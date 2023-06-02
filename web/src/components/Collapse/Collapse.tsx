import { Collapsible } from "@kobalte/core"
import { Component, JSXElement, createSignal } from "solid-js"

const Collapse: Component<{ title: string, innerContent: JSXElement }> = ({ title, innerContent }) => {
  const [isOpen, setIsOpen] = createSignal<boolean>(false)

  return (
    <Collapsible.Root
      class="collapse collapse-arrow bg-base-100 rounded-box"
      onOpenChange={(isOpen) => setIsOpen(isOpen)}
      classList={{ "collapse-open": isOpen() }}>
      <Collapsible.Trigger class="collapse-title text-left">
        {title}
      </Collapsible.Trigger>
      <Collapsible.Content class="collapse-content">
        {innerContent}
      </Collapsible.Content>
    </Collapsible.Root>
  )
}

export default Collapse