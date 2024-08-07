import { Combobox, createFilter } from "@kobalte/core";
import {
  Component,
  JSX,
  Show,
  createEffect,
  createSignal,
  onMount,
  splitProps,
} from "solid-js";
import { Icon } from "../icons";

type Option = {
  label: string;
  value: string;
};

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
  onValueChange?: (value: string) => void;
};

const SelectSearch: Component<SelectSearchProps> = (props) => {
  const [rootProps, selectProps, others] = splitProps(
    props,
    ["name", "placeholder", "required", "disabled"],
    ["placeholder", "ref", "onInput", "onChange", "onBlur"],
  );
  const filter = createFilter({ sensitivity: "base" });
  const [options, setOptions] = createSignal<Option[]>(props.options);
  createEffect(() => {
    setOptions(props.options);
  });

  function onInputChange(value: string) {
    setOptions(
      props.options.filter((option) => filter.contains(option.label, value)),
    );
  }

  function onOpenChange(
    isOpen: boolean,
    triggerMode?: Combobox.ComboboxTriggerMode,
  ) {
    // Show all options on ArrowDown/ArrowUp and button click.
    if (isOpen && triggerMode === "manual") {
      setOptions(props.options);
    }
  }
  onMount(() => {
    if (!props.value) {
      others.onValueChange?.(others.default?.value || "");
    }
  });

  const [value, setValue] = createSignal<Option>();
  createEffect(() => {
    setValue(props.options.find((option) => props.value === option.value));
  });

  return (
    <div class="form-control flex-1">
      <Combobox.Root<Option>
        {...rootProps}
        defaultValue={others.default}
        value={value()}
        options={options()}
        optionLabel="label"
        optionTextValue="label"
        optionValue="value"
        onInputChange={onInputChange}
        onOpenChange={onOpenChange}
        onChange={(val) => {
          setValue(val);
          props.onValueChange?.(val.value);
        }}
        placeholder={props.placeholder}
        validationState={props.error ? "invalid" : "valid"}
        itemComponent={(props) => (
          <Combobox.Item
            item={props.item}
            class="p-2 flex gap-3 data-[highlighted]:bg-base-300"
          >
            {/* <Combobox.ItemIndicator class="">
              <Icon.Check />
            </Combobox.ItemIndicator> */}
            <Combobox.ItemLabel class="">
              {props.item.rawValue.label}
            </Combobox.ItemLabel>
          </Combobox.Item>
        )}
      >
        <Show when={props.label}>
          <div class="label">
            <Combobox.Label class="label-text">{props.label}</Combobox.Label>
          </div>
        </Show>

        <Combobox.Control class="relative" aria-label={props.label}>
          <Combobox.Input
            class="input input-bordered w-full"
            classList={{
              "input-error": !!props.error,
            }}
          />
          <Combobox.HiddenSelect {...selectProps} />
          <Combobox.Trigger class="absolute top-3 right-5">
            <Combobox.Icon class="combobox__icon">
              <Icon.ChevronUpDown />
            </Combobox.Icon>
          </Combobox.Trigger>
        </Combobox.Control>
        <Combobox.Portal>
          <Combobox.Content
            class="dropdown bg-base-100 border-[1px] rounded-md w-full px-3"
            style={{ "border-color": "hsl(var(--bc) / 0.2)" }}
          >
            <Combobox.Listbox class="max-h-96 overflow-y-scroll" />
          </Combobox.Content>
        </Combobox.Portal>

        <Combobox.ErrorMessage class="label-text-alt text-error">
          <label class="label">{props.error}</label>
        </Combobox.ErrorMessage>
      </Combobox.Root>
    </div>
  );
};

export default SelectSearch;
