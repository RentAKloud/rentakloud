import { Component, Show } from "solid-js";
import FormInput from "../../components/FormInput";
import { useCheckoutContext } from "./context";

export const BillingAndShipping: Component = () => {
  const {
    shippingSameAsBilling,
    setShippingSameAsBilling,
    orderStore,
    updateBilling,
    updateShipping,

    formErrors,
  } = useCheckoutContext()

  return (
    <form>
      <div class="flex flex-col md:flex-row md:gap-5">
        <FormInput
          label="First Name"
          value={orderStore.billingAddress.firstName}
          onChange={(val) => updateBilling("firstName", val)}
          error={formErrors().find(e => e.includes("billingAddress.firstName"))}
        />

        <FormInput
          label="Last Name"
          value={orderStore.billingAddress.lastName}
          onChange={(val) => updateBilling("lastName", val)}
        />
      </div>

      <FormInput label="Email" value={orderStore.billingAddress.email} onChange={(val) => updateBilling("email", val)} type="email" />

      <FormInput label="Address 1" value={orderStore.billingAddress.address} onChange={(val) => updateBilling("address", val)} />

      <FormInput label="Address 2 (optional)" value={orderStore.billingAddress.address2} onChange={(val) => updateBilling("address2", val)} />

      <div class="flex flex-col md:flex-row md:gap-5 justify-center">
        <FormInput
          label="City"
          value={orderStore.billingAddress.city}
          onChange={(val) => updateBilling("city", val)}
        />

        <FormInput
          label="State"
          value={orderStore.billingAddress.state}
          onChange={(val) => updateBilling("state", val)}
        />
      </div>

      <div class="flex flex-col md:flex-row md:gap-5 justify-center mb-5">
        <FormInput
          label="Country"
          value={orderStore.billingAddress.country}
          onChange={(val) => updateBilling("country", val)}
        />

        <FormInput
          label="Zip"
          value={orderStore.billingAddress.zip}
          onChange={(val) => updateBilling("zip", val)}
        />
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
        <FormInput label="Address 1" value={orderStore.shippingAddress.address} onChange={(val) => updateShipping("address", val)} />

        <FormInput label="Address 2 (optional)" value={orderStore.shippingAddress.address2} onChange={(val) => updateShipping("address2", val)} />

        <div class="flex gap-5 justify-center">
          <FormInput label="City" value={orderStore.shippingAddress.city} onChange={(val) => updateShipping("city", val)} />

          <FormInput label="State" value={orderStore.shippingAddress.state} onChange={(val) => updateShipping("state", val)} />
        </div>

        <div class="flex gap-5 justify-center mb-10">
          <FormInput label="Country" value={orderStore.shippingAddress.country} onChange={(val) => updateShipping("country", val)} />

          <FormInput label="Zip" value={orderStore.shippingAddress.zip} onChange={(val) => updateShipping("zip", val)} />
        </div>
      </Show>
    </form >
  )
}