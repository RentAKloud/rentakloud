import { Component } from "solid-js";
import SearchIcon from "../icons/Search";

const Search: Component = () => {
  return (
    <div class="relative">
      <SearchIcon class="absolute ml-2 h-full" />
      <input type="text" placeholder="Search" class="input input-bordered input-ghost w-full max-w-xs pl-10" />
    </div>
  )
}

export default Search