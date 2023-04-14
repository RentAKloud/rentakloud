import { Component } from "solid-js";

const FormInput: Component<{
  label: string;
  value: string;
  placeholder?: string;
  type?: string;
  onChange?: (newVal: any) => void;
  min?: number;
}> = ({
  label,
  value,
  placeholder,
  onChange,
  type = 'text',
  min,
}) => {
    return (
      <div class="form-control">
        <label class="label">
          <span class="label-text">{label}</span>
        </label>
        <label class="input-group input-group-vertical">
          {/* <span>{label}</span> */}
          <input
            type={type} placeholder={placeholder}
            value={value}
            onchange={(e) => onChange && onChange(e.currentTarget.value)}
            class="input input-bordered"
            min={min}
          />
        </label>
      </div>
    )
  }

export default FormInput