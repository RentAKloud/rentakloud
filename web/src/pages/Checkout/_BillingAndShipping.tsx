import { Component, Show } from "solid-js";
import TextInput from "../../components/Inputs/TextInput";
import { useCheckoutContext } from "./context";
// import { authStore } from "../../stores/auth";

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
        <TextInput
          label="First Name"
          value={orderStore.billingAddress.firstName}
          // defaultVal={user?.firstName}
          onChange={(e) => updateBilling("firstName", e.currentTarget.value)}
          error={formErrors().find(e => e.includes("billingAddress.firstName"))}
        />

        <TextInput
          label="Last Name"
          value={orderStore.billingAddress.lastName}
          // defaultVal={user?.lastName}
          onChange={(e) => updateBilling("lastName", e.currentTarget.value)}
        />
      </div>

      <TextInput
        label="Email"
        value={orderStore.billingAddress.email}
        // defaultVal={user?.email}
        onChange={(e) => updateBilling("email", e.currentTarget.value)}
        type="email"
      />

      <TextInput
        label="Address 1"
        value={orderStore.billingAddress.address}
        // defaultVal={""}
        onChange={(e) => updateBilling("address", e.currentTarget.value)}
      />

      <TextInput label="Address 2 (optional)" value={orderStore.billingAddress.address2} onChange={(e) => updateBilling("address2", e.currentTarget.value)} />

      <div class="flex flex-col md:flex-row md:gap-5 justify-center">
        <TextInput
          label="City"
          value={orderStore.billingAddress.city}
          onChange={(e) => updateBilling("city", e.currentTarget.value)}
        />

        <TextInput
          label="State"
          value={orderStore.billingAddress.state}
          onChange={(e) => updateBilling("state", e.currentTarget.value)}
        />
      </div>

      <div class="flex flex-col md:flex-row md:gap-5 justify-center mb-5">
        <TextInput
          label="Country"
          value={orderStore.billingAddress.country}
          onChange={(e) => updateBilling("country", e.currentTarget.value)}
        />

        <TextInput
          label="Zip"
          value={orderStore.billingAddress.zip}
          onChange={(e) => updateBilling("zip", e.currentTarget.value)}
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
        <div class="flex flex-col md:flex-row md:gap-5">
          <TextInput
            label="First Name"
            value={orderStore.shippingAddress.firstName}
            onChange={(e) => updateShipping("firstName", e.currentTarget.value)}
            error={formErrors().find(e => e.includes("shippingAddress.firstName"))}
          />

          <TextInput
            label="Last Name"
            value={orderStore.shippingAddress.lastName}
            onChange={(e) => updateShipping("lastName", e.currentTarget.value)}
          />
        </div>

        <TextInput label="Address 1" value={orderStore.shippingAddress.address} onChange={(e) => updateShipping("address", e.currentTarget.value)} />

        <TextInput label="Address 2 (optional)" value={orderStore.shippingAddress.address2} onChange={(e) => updateShipping("address2", e.currentTarget.value)} />

        <div class="flex gap-5 justify-center">
          <TextInput label="City" value={orderStore.shippingAddress.city} onChange={(e) => updateShipping("city", e.currentTarget.value)} />

          <TextInput label="State" value={orderStore.shippingAddress.state} onChange={(e) => updateShipping("state", e.currentTarget.value)} />
        </div>

        <div class="flex gap-5 justify-center mb-10">
          <TextInput label="Country" value={orderStore.shippingAddress.country} onChange={(e) => updateShipping("country", e.currentTarget.value)} />

          <TextInput label="Zip" value={orderStore.shippingAddress.zip} onChange={(e) => updateShipping("zip", e.currentTarget.value)} />
        </div>
      </Show>
    </form >
  )
}