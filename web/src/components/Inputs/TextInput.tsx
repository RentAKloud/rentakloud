import { Component, JSX, Show } from "solid-js";

type FormInputType = {
  name?: string;

  label: string;
  value: string;
  placeholder?: string;
  type?: string;
  min?: number;
  error?: string;

  ref?: (element: HTMLInputElement) => void;
  onInput?: JSX.EventHandler<HTMLInputElement, InputEvent>;
  onChange?: JSX.EventHandler<HTMLInputElement, Event>;
  onBlur?: JSX.EventHandler<HTMLInputElement, FocusEvent>;
}

const TextInput: Component<FormInputType> = (props) => {
  const {
    label,
    placeholder,
  } = props

  return (
    <div class="form-control flex-1">
      <Show when={label}>
        <label class="label">
          <span class="label-text">{label}</span>
        </label>
      </Show>

      <input
        {...props}
        placeholder={placeholder}
        value={props.value}
        class="input input-bordered"
        classList={{
          "input-error": !!props.error
        }}
        min={props.min}
        aria-invalid={!!props.error}
        aria-errormessage={`${props.name}-error`}
      />

      <Show when={props.error}>
        <label class="label">
          <span class="label-text-alt text-error">{props.error}</span>
          {/* <span class="label-text-alt">Bottom Right label</span> */}
        </label>
      </Show>
    </div>
  )
}

export default TextInput