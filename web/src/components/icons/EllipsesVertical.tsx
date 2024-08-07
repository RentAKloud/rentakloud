import Icon from "./Icon"

const EllipsesVertical: typeof Icon = (props) => {
  return (
    <Icon class={(props.class || "") + " stroke-current"}>
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
    </Icon>
  )
}

export default EllipsesVertical