import { Component } from "solid-js";
import { useSearchParams } from "@solidjs/router";
import SearchIcon from "../icons/Search";
import { SearchProps } from "../../types/ui";

const Search: Component<SearchProps> = (props) => {
  const [params, setParams] = useSearchParams()

  function onInput(value: string) {
    setParams({ q: value })
  }

  return (
    <div class="relative">
      <SearchIcon class="absolute ml-2 h-full" />
      <input
        type="text"
        placeholder="Search"
        class="input input-bordered input-ghost w-full max-w-xs pl-10"
        value={params.q || ''}
        oninput={(e) => (props.onInput || onInput)(e.currentTarget.value)}
      />
    </div>
  )
}

export default Search