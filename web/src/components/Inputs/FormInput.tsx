import { Component, createSignal } from "solid-js";

type FormInputType = {
  label: string;
  value: string;
  defaultVal?: string;
  placeholder?: string;
  type?: string;
  onChange?: (newVal: any) => void;
  min?: number;
  error?: string;
}

const FormInput: Component<FormInputType> = ({
  label,
  value,
  placeholder,
  onChange,
  min,
  error,
  defaultVal,
  type = 'text',
}) => {
    const [dirty, setDirty] = createSignal(false)
    let val = value
    if (!val && !dirty() && defaultVal !== undefined) {
      val = defaultVal
      onChange && onChange(val)
    }

    return (
      <div class="form-control flex-1">
        <label class="label">
          <span class="label-text">{label}</span>
        </label>

        <input
          type={type} placeholder={placeholder}
          value={val}
          onchange={(e) => {
            dirty() || setDirty(true)
            onChange && onChange(e.currentTarget.value)
          }}
          class="input input-bordered"
          classList={{
            "input-error": !!error
          }}
          min={min}
        />

        <label class="label">
          <span class="label-text-alt text-error">{error}</span>
          {/* <span class="label-text-alt">Bottom Right label</span> */}
        </label>
      </div>
    )
  }

export default FormInput