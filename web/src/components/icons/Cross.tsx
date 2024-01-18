import Icon from "./Icon"

const CrossIcon: typeof Icon = (props) => {
  return (
    <Icon class={props.class}>
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
    </Icon>
  )
}

export default CrossIcon
