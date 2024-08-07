import Icon from "./Icon";

const Search: typeof Icon = (props) => {
  return (
    <Icon class={props.class + " stroke-current"}>
      <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </Icon>
  )
}

export default Search