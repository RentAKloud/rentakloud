import { Component, Show } from "solid-js";
import FormInput from "../../components/FormInput";
import { useCheckoutContext } from "./context";

export const BillingAndShipping: Component = () => {
  const { shippingSameAsBilling, setShippingSameAsBilling } = useCheckoutContext()

  return (
    <form>
      <FormInput label="Address 1" value="" />

      <FormInput label="Address 2" value="" />

      <div class="flex gap-5 justify-center">
        <FormInput label="City" value="" />

        <FormInput label="State" value="" />
      </div>

      <div class="flex gap-5 justify-center mb-5">
        <FormInput label="Country" value="" />

        <FormInput label="Zip" value="" />
      </div>

      <div class="form-control mb-5">
        <label class="cursor-pointer label">
          <span class="label-text">Shipping Address Same As Billing?</span>
          <input type="checkbox" class="toggle toggle-primary"
            checked={shippingSameAsBilling()}
            onchange={() => setShippingSameAsBilling(!shippingSameAsBilling())}
          />
        </label>
      </div>

      <Show when={!shippingSameAsBilling()}>
        <FormInput label="Address 1" value="" />

        <FormInput label="Address 2" value="" />

        <div class="flex gap-5 justify-center">
          <FormInput label="City" value="" />

          <FormInput label="State" value="" />
        </div>

        <div class="flex gap-5 justify-center mb-10">
          <FormInput label="Country" value="" />

          <FormInput label="Zip" value="" />
        </div>
      </Show>
    </form >
  )
}