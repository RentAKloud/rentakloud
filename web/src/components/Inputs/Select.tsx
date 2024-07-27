import { Select as KSelect } from "@kobalte/core/select";
import { Component, JSX } from "solid-js";

type Option = {
  label: string;
  value: string;
  disabled?: boolean;
};

type SelectProps = {
  name: string;
  label?: string | undefined;
  placeholder?: string | undefined;
  options: Option[];
  value?: string | number | undefined;
  error?: string;
  required?: boolean | undefined;
  disabled?: boolean | undefined;
  default?: Option;
  // ref?: (element: HTMLSelectElement) => void;
  // onInput?: JSX.EventHandler<HTMLSelectElement, InputEvent>;
  onChange: (value: Option) => void;
  // onBlur?: JSX.EventHandler<HTMLSelectElement, FocusEvent>;
  // onValueChange?: (value: string) => void;
};

const Select: Component<SelectProps> = (props) => {
  return (
    <KSelect
      options={props.options}
      optionValue="value"
      optionTextValue="label"
      optionDisabled="disabled"
      placeholder={props.placeholder}
      onChange={props.onChange}
      itemComponent={(props) => (
        <KSelect.Item
          item={props.item}
          class="p-2 data-[highlighted]:bg-base-300 rounded-md"
        >
          <KSelect.ItemLabel>{props.item.rawValue.label}</KSelect.ItemLabel>
          {/* <KSelect.ItemIndicator>
            <Icon.Check />
          </KSelect.ItemIndicator> */}
        </KSelect.Item>
      )}
    >
      <KSelect.Trigger
        aria-label={props.name}
        class="select select-bordered w-full flex items-center"
      >
        <KSelect.Value<Option>>
          {(state) => state.selectedOption().label}
        </KSelect.Value>
        {/* <KSelect.Icon><Icon.ChevronUpDown /></KSelect.Icon> */}
      </KSelect.Trigger>
      <KSelect.Portal>
        <KSelect.Content class="dropdown bg-base-100 border-[1px] rounded-md w-full">
          <KSelect.Listbox />
        </KSelect.Content>
      </KSelect.Portal>
    </KSelect>
  );
};

export default Select;
