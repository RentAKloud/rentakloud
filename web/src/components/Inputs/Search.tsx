import { Component } from "solid-js";
import { useSearchParams } from "@solidjs/router";
import { SearchProps } from "~/types/ui";
import { Icon } from "../icons";

const Search: Component<SearchProps> = (props) => {
  const [params, setParams] = useSearchParams()

  function onInput(value: string) {
    setParams({ q: value })
  }

  return (
    <div>
      <div class="relative">
        <Icon.Search class="absolute ml-2 h-full" />
        <input
          type="text"
          placeholder="Search"
          class="input input-bordered input-ghost w-full max-w-xs pl-10"
          value={params.q || ''}
          oninput={(e) => (props.onInput || onInput)(e.currentTarget.value)}
        />
      </div>
    </div>
  )
}

export default Search