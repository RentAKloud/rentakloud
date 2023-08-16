import Icon from "./Icon"

const CheckIcon: typeof Icon = (props) => {
  return (
    <Icon class={props.class}>
      <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </Icon>

  )
}

export default CheckIcon