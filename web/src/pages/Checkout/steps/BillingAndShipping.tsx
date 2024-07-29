import { Component, Show } from "solid-js";
import TextInput from "~/components/Inputs/TextInput";
import { useCheckoutContext } from "../context";
import SelectSearch from "~/components/Inputs/SelectSearch";
import Select from "~/components/Inputs/Select";
import { createForm, email, required, setValues } from "@modular-forms/solid";
import { Address, Step } from "~/types/order";
import { authStore } from "~/stores/auth";

type BillingAndShippingForm = {
  billingAddress: Address;
  shippingAddress: Address;
  shippingSameAsBilling: boolean;
};

export const BillingAndShipping: Component<Step> = (props) => {
  const { user } = authStore;
  const {
    hasPhysical,
    shippingSameAsBilling,
    setShippingSameAsBilling,
    orderStore,
    countryOptions,
    stateOptionsBilling,
    stateOptionsShipping,
    updateBilling,
    updateShipping,
    setAddress,

    formErrors,
    setStep,
  } = useCheckoutContext();

  const [addressForm, { Form, Field }] = createForm<BillingAndShippingForm>({
    initialValues: {
      billingAddress: orderStore.billingAddress,
    },
  });

  function autoFill(addressId: number) {
    const addr = user?.profile?.addresses.find((a) => a.id === addressId);
    if (addr) {
      setValues(addressForm, { billingAddress: addr, shippingAddress: addr });
      setAddress("billingAddress", addr);
      setAddress("shippingAddress", addr);
    }
  }

  const BillingAddressFields = () => (
    <>
      <Show
        when={user?.profile?.addresses && user.profile.addresses.length > 0}
      >
        <Select
          placeholder="Select an address"
          name="address"
          options={user!.profile!.addresses.map((a) => ({
            label: `${a.firstName} ${a.lastName} - ${a.address} ${a.address2} ${a.zip} ${a.country}`,
            value: a.id.toString(),
          }))}
          onChange={(addrId) => {
            autoFill(+addrId.value);
          }}
        />

        <div class="divider" />
      </Show>
      <div class="flex flex-col lg:flex-row md:gap-5">
        <Field
          name="billingAddress.firstName"
          validate={[required("First name is required")]}
        >
          {(field, props) => (
            <TextInput
              {...props}
              label="First Name"
              value={field.value}
              onChange={(e) =>
                updateBilling("firstName", e.currentTarget.value)
              }
              error={formErrors().find((e) =>
                e.includes("billingAddress.firstName"),
              )}
              required
            />
          )}
        </Field>

        <Field
          name="billingAddress.lastName"
          validate={[required("Last name is required")]}
        >
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

      <Field
        name="billingAddress.email"
        validate={[required("Email is required"), email("Email is not valid")]}
      >
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

      <Field
        name="billingAddress.address"
        validate={[required("Address is required")]}
      >
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

      <TextInput
        label="Address 2 (optional)"
        value={orderStore.billingAddress.address2}
        onChange={(e) => updateBilling("address2", e.currentTarget.value)}
      />

      <div class="flex flex-col lg:flex-row md:gap-5 justify-center">
        <SelectSearch
          name="country"
          label="Country"
          options={countryOptions.latest || []}
          default={countryOptions.latest?.at(0)}
          value={orderStore.billingAddress.country}
          onChange={() => {}}
          onValueChange={(e) => {
            updateBilling("country", e);
            updateBilling("state", "");
          }}
        />

        <Show
          when={stateOptionsBilling.latest}
          fallback={
            <TextInput
              label="State"
              value={orderStore.billingAddress.state}
              onChange={(e) => updateBilling("state", e.currentTarget.value)}
            />
          }
        >
          <SelectSearch
            name="state"
            label="State/Province"
            options={stateOptionsBilling.latest || []}
            default={stateOptionsBilling.latest?.at(0)}
            value={orderStore.billingAddress.state}
            onChange={() => {}}
            onValueChange={(value) => updateBilling("state", value)}
          />
        </Show>
      </div>

      <div class="flex flex-col md:flex-row md:gap-5 justify-center">
        <Field
          name="billingAddress.city"
          validate={[required("City is required")]}
        >
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

        <Field
          name="billingAddress.zip"
          validate={[required("Zip/Postal is required")]}
        >
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

      <Field
        name="billingAddress.phone"
        validate={[required("Contact number is required")]}
      >
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
  );

  const ShippingAddressFields = () => (
    <>
      <div class="flex flex-col md:flex-row md:gap-5">
        <Field
          name="shippingAddress.firstName"
          validate={[required("First name is required")]}
        >
          {(field, props) => (
            <TextInput
              {...props}
              label="First Name"
              value={field.value}
              onChange={(e) =>
                updateShipping("firstName", e.currentTarget.value)
              }
              error={formErrors().find((e) =>
                e.includes("shippingAddress.firstName"),
              )}
              required
            />
          )}
        </Field>

        <Field
          name="shippingAddress.lastName"
          validate={[required("Last name is required")]}
        >
          {(field, props) => (
            <TextInput
              {...props}
              label="Last Name"
              value={field.value}
              onChange={(e) =>
                updateShipping("lastName", e.currentTarget.value)
              }
              required
            />
          )}
        </Field>
      </div>

      <Field
        name="shippingAddress.address"
        validate={[required("Address is required")]}
      >
        {(field, props) => (
          <TextInput
            {...props}
            label="Address 1"
            value={field.value}
            onChange={(e) => updateShipping("address", e.currentTarget.value)}
            required
          />
        )}
      </Field>

      <TextInput
        label="Address 2 (optional)"
        value={orderStore.shippingAddress.address2}
        onChange={(e) => updateShipping("address2", e.currentTarget.value)}
      />

      <div class="flex gap-5 justify-center">
        <SelectSearch
          name="country"
          label="Country"
          options={countryOptions.latest || []}
          default={countryOptions.latest?.at(0)}
          value={orderStore.shippingAddress.country}
          onChange={(e) => updateShipping("country", e.currentTarget.value)}
          onValueChange={(e) => {
            updateShipping("country", e);
            updateShipping("state", "");
          }}
        />

        <Show
          when={stateOptionsShipping.latest}
          fallback={
            <TextInput
              label="State"
              value={orderStore.shippingAddress.state}
              onChange={(e) => updateShipping("state", e.currentTarget.value)}
            />
          }
        >
          <SelectSearch
            name="state"
            label="State/Province"
            options={stateOptionsShipping.latest || []}
            default={stateOptionsShipping.latest?.at(0)}
            value={orderStore.shippingAddress.state}
            onChange={() => {}}
            onValueChange={(e) => updateShipping("state", e)}
          />
        </Show>
      </div>

      <div class="flex flex-col md:flex-row md:gap-5 justify-center mb-10">
        <Field
          name="shippingAddress.city"
          validate={[required("City is required")]}
        >
          {(field, props) => (
            <TextInput
              {...props}
              label="City"
              value={field.value}
              onChange={(e) => updateShipping("city", e.currentTarget.value)}
              required
            />
          )}
        </Field>

        <Field
          name="shippingAddress.zip"
          validate={[required("Zip/Postal Code is required")]}
        >
          {(field, props) => (
            <TextInput
              {...props}
              label="Zip/Postal Code"
              value={field.value}
              onChange={(e) => updateShipping("zip", e.currentTarget.value)}
              required
            />
          )}
        </Field>
      </div>
    </>
  );

  return (
    <Form onSubmit={() => setStep(props.next || "shipping")}>
      <BillingAddressFields />

      <div class="mb-5" />

      <Show when={hasPhysical()}>
        <div class="form-control mb-5">
          <label class="cursor-pointer label">
            <span class="label-text">Shipping Address Same As Billing?</span>
            <input
              type="checkbox"
              class="toggle toggle-primary"
              checked={shippingSameAsBilling()}
              onchange={() =>
                setShippingSameAsBilling(!shippingSameAsBilling())
              }
            />
          </label>
        </div>
      </Show>

      <Show when={!shippingSameAsBilling()}>
        <ShippingAddressFields />
      </Show>

      <button
        class="btn btn-primary"
        type="submit"
        disabled={addressForm.invalid}
      >
        Next
      </button>
    </Form>
  );
};
