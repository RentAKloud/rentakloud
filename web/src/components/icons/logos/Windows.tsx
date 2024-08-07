import Icon from "../Icon"

const Windows: typeof Icon = (props) => {
  return (
    <Icon class={(props.class || "") + " text-gray-800 dark:text-white"}>
      <path fill="currentColor" fill-rule="evenodd" d="M3.005 12 3 6.408l6.8-.923v6.517H3.005ZM11 5.32 19.997 4v8H11V5.32ZM20.067 13l-.069 8-9.065-1.275L11 13h9.067ZM9.8 19.58l-6.795-.931V13H9.8v6.58Z" clip-rule="evenodd" />
    </Icon>
  )
}

export default Windows