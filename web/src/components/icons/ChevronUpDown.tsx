import Icon from "./Icon";

const ChevronUpDownIcon: typeof Icon = (props) => {
  return (
    <Icon class={props.class}>
      <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
    </Icon>
  )
}

export default ChevronUpDownIcon