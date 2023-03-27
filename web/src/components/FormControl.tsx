import { Component } from "solid-js";

const FormInput: Component<{
  label: string;
  value: string;
  placeholder?: string;
  type?: string;
}> = ({
  label,
  value,
  placeholder,
  type = 'text'
}) => {
    return (
      <div class="form-control">
        <label class="label">
          <span class="label-text">{label}</span>
        </label>
        <label class="input-group input-group-vertical">
          {/* <span>{label}</span> */}
          <input type={type} placeholder={placeholder} value={value} class="input input-bordered" />
        </label>
      </div>
    )
  }

export default FormInput