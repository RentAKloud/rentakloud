import { Component, Show } from "solid-js";
import TextInput from "~/components/Inputs/TextInput";
import { useCheckoutContext } from "../context";
import SelectSearch from "~/components/Inputs/SelectSearch";
import { createForm, email, required } from "@modular-forms/solid";
import { Address, Step } from "~/types/order";


type BillingAndShippingForm = {
  billingAddress: Address
  shippingAddress: Address
  shippingSameAsBilling: boolean
}

export const BillingAndShipping: Component<Step> = (props) => {
  const {
    shippingSameAsBilling,
    setShippingSameAsBilling,
    orderStore,
    countryOptions,
    stateOptionsBilling,
    stateOptionsShipping,
    updateBilling,
    updateShipping,

    formErrors,
    setStep
  } = useCheckoutContext()

  const [addressForm, { Form, Field }] = createForm<BillingAndShippingForm>({
    initialValues: {
      billingAddress: orderStore.billingAddress
    }
  })

  const BillingAddressFields = () => (
    <>
      <div class="flex flex-col md:flex-row md:gap-5">
        <Field name="billingAddress.firstName" validate={[required("First name is required")]}>
          {(field, props) => (
            <TextInput
              {...props}
              label="First Name"
              value={field.value}
              onChange={(e) => updateBilling("firstName", e.currentTarget.value)}
              error={formErrors().find(e => e.includes("billingAddress.firstName"))}
              required
            />
          )}
        </Field>

        <Field name="billingAddress.lastName" validate={[required("Last name is required")]}>
          {(field, props) => (
            <TextInput
              {...props}
              label="Last Name"
              value={field.value}
              error={field.error}
              onChange={(e) => updateBilling("lastName", e.currentTarget.value)}
            />
          )}
        </Field>
      </div>

      <Field name="billingAddress.email" validate={[required("Email is required"), email("Email is not valid")]}>
        {(field, props) => (
          <TextInput
            {...props}
            label="Email"
            value={field.value}
            error={field.error}
            onChange={(e) => updateBilling("email", e.currentTarget.value)}
            type="email"
          />
        )}
      </Field>

      <Field name="billingAddress.address" validate={[required("Address is required")]}>
        {(field, props) => (
          <TextInput
            {...props}
            label="Address 1"
            value={field.value}
            error={field.error}
            onChange={(e) => updateBilling("address", e.currentTarget.value)}
          />
        )}
      </Field>

      <TextInput label="Address 2 (optional)" value={orderStore.billingAddress.address2} onChange={(e) => updateBilling("address2", e.currentTarget.value)} />

      <div class="flex flex-col md:flex-row md:gap-5 justify-center">
        <SelectSearch
          name="country"
          label="Country"
          options={countryOptions.latest || []}
          default={countryOptions.latest?.at(0)}
          value={orderStore.billingAddress.country}
          onChange={() => { }}
          onValueChange={(e) => {updateBilling("country", e); updateBilling("state", ""); }}
        />

        <Show when={stateOptionsBilling.latest} fallback={
          <TextInput
            label="State"
            value={orderStore.billingAddress.state}
            onChange={(e) => updateBilling("state", e.currentTarget.value)}
          />
        }>
          <SelectSearch
            name="state"
            label="State/Province"
            options={stateOptionsBilling.latest || []}
            default={stateOptionsBilling.latest?.at(0)}
            value={orderStore.billingAddress.state}
            onChange={() => { }}
            onValueChange={(value) => updateBilling("state", value)}
          />
        </Show>
      </div>

      <div class="flex flex-col md:flex-row md:gap-5 justify-center">
        <Field name="billingAddress.city" validate={[required("City is required")]}>
          {(field, props) => (
            <TextInput
              {...props}
              label="City"
              value={field.value}
              error={field.error}
              onChange={(e) => updateBilling("city", e.currentTarget.value)}
            />
          )}
        </Field>

        <Field name="billingAddress.zip" validate={[required("Zip/Postal is required")]}>
          {(field, props) => (
            <TextInput
              {...props}
              label="Zip/Postal Code"
              value={field.value}
              error={field.error}
              onChange={(e) => updateBilling("zip", e.currentTarget.value)}
            />
          )}
        </Field>
      </div>

      <Field name="billingAddress.phone" validate={[required("Contact number is required")]}>
        {(field, props) => (
          <TextInput
            {...props}
            label="Phone"
            value={field.value}
            error={field.error}
            type="tel"
            onChange={(e) => updateBilling("phone", e.currentTarget.value)}
          />
        )}
      </Field>
    </>
  )

  const ShippingAddressFields = () => (
    <>
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
        <SelectSearch
          name="country"
          label="Country"
          options={countryOptions.latest || []}
          default={countryOptions.latest?.at(0)}
          value={orderStore.shippingAddress.country}
          onChange={(e) => updateShipping("country", e.currentTarget.value)}
          onValueChange={(e) => { updateShipping("country", e); updateShipping("state", ""); }}
        />

        <Show when={stateOptionsShipping.latest} fallback={
          <TextInput
            label="State"
            value={orderStore.shippingAddress.state}
            onChange={(e) => updateShipping("state", e.currentTarget.value)}
          />
        }>
          <SelectSearch
            name="state"
            label="State/Province"
            options={stateOptionsShipping.latest || []}
            default={stateOptionsShipping.latest?.at(0)}
            value={orderStore.shippingAddress.state}
            onChange={() => { }}
            onValueChange={(e) => updateShipping("state", e)}
          />
        </Show>
      </div>

      <div class="flex flex-col md:flex-row md:gap-5 justify-center mb-10">
        <TextInput
          label="City"
          value={orderStore.shippingAddress.city}
          onChange={(e) => updateShipping("city", e.currentTarget.value)}
        />

        <TextInput
          label="Zip/Postal Code" value={orderStore.shippingAddress.zip}
          onChange={(e) => updateShipping("zip", e.currentTarget.value)}
          required
        />
      </div>
    </>
  )

  return (
    <Form onSubmit={() => setStep(props.next || 'shipping')}>
      <BillingAddressFields />

      <div class="mb-5" />

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
        <ShippingAddressFields />
      </Show>

      <button
        class="btn btn-primary"
        type="submit"
        disabled={addressForm.invalid}>Next</button>
    </Form>
  )
}