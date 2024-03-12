import { Component, For } from "solid-js"

type CardSkeletonProps = {
  class?: string
  rowClass?: string
  rows?: number
}

const CardSkeleton: Component<CardSkeletonProps> = (props) => {
  const rowClass = () => props.rowClass || "h-4"
  const rows = () => props.rows || 2
  return (
    <div class={`flex flex-col gap-4 ${props.class || 'w-52'}`}>
      <div class="skeleton h-32 w-full"></div>
      <div class={`skeleton ${rowClass()} w-28`}></div>
      <For each={new Array(rows())}>
        {
          () =>
            <div class={`skeleton ${rowClass()} w-full`}></div>
        }
      </For>
    </div>
  )
}

export default CardSkeleton