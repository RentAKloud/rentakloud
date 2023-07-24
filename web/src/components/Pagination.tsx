import { Component, For, Show } from "solid-js";

const Pagination: Component<{
  last: number;
  current: number;
  setPage: (pageNumber: number) => void;
}> = (props) => {
  return (
    <div class="join">
      <button
        class="join-item btn"
        classList={{ "btn-disabled": props.current === 1 }}
        onclick={() => props.setPage(props.current - 1)}
      >«</button>

      <Show when={props.last <= 5}>
        <For each={Array(props.last)}>
          {(_, index) => {
            return (
              <button
                class="join-item btn"
                classList={{ "btn-active btn-primary": index() + 1 === props.current }}
              >{index() + 1}</button>
            )
          }}
        </For>
      </Show>

      <Show when={props.last > 5}>
        <button
          class="join-item btn"
          classList={{ "btn-active btn-primary": props.current === 1 }}
        >1</button>
        <button
          class="join-item btn"
          classList={{ "btn-active btn-primary": props.current === 2 }}
        >2</button>

        <button class="join-item btn btn-disabled">...</button>

        <button
          class="join-item btn"
          classList={{ "btn-active btn-primary": props.current > 2 && props.current < props.last - 1 }}
        >{props.current > 2 && props.current < props.last - 1 ? props.current : 3}</button>

        <button class="join-item btn btn-disabled">...</button>

        <button
          class="join-item btn"
          classList={{ "btn-active btn-primary": props.current === props.last - 1 }}
        >{props.last - 1}</button>
        <button
          class="join-item btn"
          classList={{ "btn-active btn-primary": props.current === props.last }}
        >{props.last}</button>
      </Show>

      <button
        class="join-item btn"
        classList={{ "btn-disabled": props.current === props.last }}
        onclick={() => props.setPage(props.current + 1)}
      >»</button>
    </div>
  )
}

export default Pagination