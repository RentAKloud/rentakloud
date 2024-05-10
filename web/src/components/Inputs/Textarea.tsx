import { Component, JSX, Show } from "solid-js";

type TextareaType = {
  name?: string;

  label?: string;
  value?: string | number;
  placeholder?: string;
  error?: string;

  ref?: (element: HTMLTextAreaElement) => void;
  onInput?: JSX.EventHandler<HTMLTextAreaElement, InputEvent>;
  onChange?: JSX.EventHandler<HTMLTextAreaElement, Event>;
  onBlur?: JSX.EventHandler<HTMLTextAreaElement, FocusEvent>;

  inputClass?: string
  required?: boolean
  disabled?: boolean
}

const Textarea: Component<TextareaType> = (props) => {
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

      <textarea
        {...props}
        placeholder={placeholder}
        value={props.value}
        class={`textarea textarea-bordered ${props.inputClass || ''} placeholder:text-slate-500`}
        classList={{
          "textarea-error": !!props.error
        }}
        aria-invalid={!!props.error}
        aria-errormessage={`${props.name}-error`}
        rows={5}
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

export default Textarea