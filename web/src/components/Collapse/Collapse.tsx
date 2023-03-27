import { Component, JSXElement } from "solid-js"

const Collapse: Component<{ title: string, innerContent: JSXElement }> = ({ title, innerContent }) => {
  return (
    <div tabindex="0" class="collapse collapse-arrow bg-base-100 rounded-box">
      <div class="collapse-title">
        {title}
      </div>
      <div class="collapse-content">
        {innerContent}
      </div>
    </div>
  )
}

export default Collapse