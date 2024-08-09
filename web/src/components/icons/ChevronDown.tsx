import ChevronRight from "./ChevronRight";
import Icon from "./Icon";

const ChevronDown: typeof Icon = (props) => {
  return <ChevronRight class={`${props.class || ""} rotate-90`} />;
};

export default ChevronDown;
