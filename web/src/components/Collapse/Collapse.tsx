import { Collapsible } from "@kobalte/core";
import { Component, JSXElement, createSignal } from "solid-js";

type CollapseProps = {
  title: string;
  children: JSXElement;
  containerClass?: string;
  contentClass?: string;
};

const Collapse: Component<CollapseProps> = (props) => {
  const [isOpen, setIsOpen] = createSignal<boolean>(false);

  return (
    <Collapsible.Root
      class={`collapse collapse-arrow bg-base-100 rounded-box ${props.containerClass || ""}`}
      onOpenChange={(isOpen) => setIsOpen(isOpen)}
      classList={{ "collapse-open": isOpen() }}
    >
      <Collapsible.Trigger class="collapse-title text-left">
        {props.title}
      </Collapsible.Trigger>
      <Collapsible.Content
        class={`collapse-content ${props.contentClass || ""}`}
      >
        {props.children}
      </Collapsible.Content>
    </Collapsible.Root>
  );
};

export default Collapse;
