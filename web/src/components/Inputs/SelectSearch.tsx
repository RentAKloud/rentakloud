import { Combobox, createFilter } from "@kobalte/core"
import { Component, createEffect, createSignal } from "solid-js"
import CheckIcon from "../icons/Check";
import ChevronUpDownIcon from "../icons/ChevronUpDown";

const SelectSearch: Component<{
  options: string[]
  onOpenChange?: (isOpen: boolean, triggerMode?: Combobox.ComboboxTriggerMode) => void
  onInputChange?: (value: string) => void
  placeholder?: string
  default?: string
}> = (props) => {
  const filter = createFilter({ sensitivity: "base" })
  const [options, setOptions] = createSignal(props.options)

  function onInputChange(value: string) {
    setOptions(props.options.filter(option => filter.contains(option, value)))
  }

  function onOpenChange(isOpen: boolean, triggerMode?: Combobox.ComboboxTriggerMode) {
    // Show all options on ArrowDown/ArrowUp and button click.
    if (isOpen && triggerMode === "manual") {
      setOptions(props.options)
    }
  }

  createEffect(() => {
    setOptions(props.options)
  })

  return (
    <Combobox.Root
      value={props.default} // TODO
      options={options()}
      onInputChange={props.onInputChange || onInputChange}
      onOpenChange={props.onOpenChange || onOpenChange}
      placeholder={props.placeholder}
      itemComponent={props => (
        <Combobox.Item item={props.item} class="hover:bg-base-300 p-1 flex gap-3">
          <Combobox.ItemIndicator class="">
            <CheckIcon />
          </Combobox.ItemIndicator>
          <Combobox.ItemLabel class="">{props.item.rawValue}</Combobox.ItemLabel>
        </Combobox.Item>
      )}
    >
      <Combobox.Control class="relative" aria-label="Fruit">
        <Combobox.Input class="input input-bordered w-full" />
        <Combobox.Trigger class="absolute top-3 right-5">
          <Combobox.Icon class="combobox__icon">
            <ChevronUpDownIcon />
          </Combobox.Icon>
        </Combobox.Trigger>
      </Combobox.Control>
      <Combobox.Portal>
        <Combobox.Content class="dropdown bg-base-100 border-[1px] rounded-md w-full px-3" style={{ "border-color": "hsl(var(--bc) / 0.2)" }}>
          <Combobox.Listbox class="combobox__listbox" />
        </Combobox.Content>
      </Combobox.Portal>
    </Combobox.Root>
  )
}

export default SelectSearch