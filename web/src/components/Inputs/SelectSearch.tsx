import { Combobox, createFilter } from "@kobalte/core"
import { Component, JSX, Show, createEffect, createSignal, splitProps } from "solid-js"
import CheckIcon from "../icons/Check";
import ChevronUpDownIcon from "../icons/ChevronUpDown";

type Option = {
  label: string;
  value: string | number
}

type SelectSearchProps = {
  name: string;
  label?: string | undefined;
  placeholder?: string | undefined;
  options: Option[];
  value?: string | number | undefined;
  error?: string;
  required?: boolean | undefined;
  disabled?: boolean | undefined;
  default?: Option;
  ref?: (element: HTMLSelectElement) => void;
  onInput?: JSX.EventHandler<HTMLSelectElement, InputEvent>;
  onChange: JSX.EventHandler<HTMLSelectElement, Event>;
  onBlur?: JSX.EventHandler<HTMLSelectElement, FocusEvent>;
  onValueChange?: (value: string|number) => void;
}

const SelectSearch: Component<SelectSearchProps> = (props) => {
  const [rootProps, selectProps] = splitProps(
    props,
    ['name', 'placeholder', 'required', 'disabled'],
    ['placeholder', 'ref', 'onInput', 'onChange', 'onBlur']
  )
  const filter = createFilter({ sensitivity: "base" })
  const [options, setOptions] = createSignal<Option[]>(props.options)
  createEffect(() => {
    setOptions(props.options)
  })

  function onInputChange(value: string) {
    setOptions(props.options.filter(option => filter.contains(option.label, value)))
  }

  function onOpenChange(isOpen: boolean, triggerMode?: Combobox.ComboboxTriggerMode) {
    // Show all options on ArrowDown/ArrowUp and button click.
    if (isOpen && triggerMode === "manual") {
      setOptions(props.options)
    }
  }

  const [getValue, setValue] = createSignal<Option>();
  createEffect(() => {
    setValue(props.options.find((option) => props.value === option.value));
  });

  return (
    <div class="form-control">
      <Combobox.Root<Option>
        {...rootProps}
        defaultValue={props.default}
        value={getValue()}
        options={options()}
        optionLabel="label"
        optionTextValue="label"
        optionValue="value"
        onInputChange={onInputChange}
        onOpenChange={onOpenChange}
        onChange={(val) => {
          setValue(val)
          props.onValueChange?.(val.value)
        }}
        placeholder={props.placeholder}
        validationState={props.error ? "invalid" : "valid"}
        itemComponent={props => (
          <Combobox.Item item={props.item} class="p-1 flex gap-3 data-[highlighted]:bg-base-300">
            <Combobox.ItemIndicator class="">
              <CheckIcon />
            </Combobox.ItemIndicator>
            <Combobox.ItemLabel class="">{props.item.rawValue.label}</Combobox.ItemLabel>
          </Combobox.Item>
        )}
      >
        <Show when={props.label}>
          <Combobox.Label class="label">{props.label}</Combobox.Label>
        </Show>

        <Combobox.Control class="relative" aria-label={props.label}>
          <Combobox.Input class="input input-bordered w-full" classList={{
            "input-error": !!props.error
          }} />
          <Combobox.HiddenSelect {...selectProps} />
          <Combobox.Trigger class="absolute top-3 right-5">
            <Combobox.Icon class="combobox__icon">
              <ChevronUpDownIcon />
            </Combobox.Icon>
          </Combobox.Trigger>
        </Combobox.Control>
        <Combobox.Portal>
          <Combobox.Content class="dropdown bg-base-100 border-[1px] rounded-md w-full px-3" style={{ "border-color": "hsl(var(--bc) / 0.2)" }}>
            <Combobox.Listbox class="" />
          </Combobox.Content>
        </Combobox.Portal>

        <Combobox.ErrorMessage class="label-text-alt text-error">
          <label class="label">{props.error}</label>
        </Combobox.ErrorMessage>
      </Combobox.Root>
    </div>
  )
}

export default SelectSearch