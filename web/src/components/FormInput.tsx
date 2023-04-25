import { Component } from "solid-js";

const FormInput: Component<{
  label: string;
  value: string;
  placeholder?: string;
  type?: string;
  onChange?: (newVal: any) => void;
  min?: number;
  error?: string;
}> = ({
  label,
  value,
  placeholder,
  onChange,
  min,
  type = 'text',
  error,
}) => {
    return (
      <div class="form-control flex-1">
        <label class="label">
          <span class="label-text">{label}</span>
        </label>

        <input
          type={type} placeholder={placeholder}
          value={value}
          onchange={(e) => onChange && onChange(e.currentTarget.value)}
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