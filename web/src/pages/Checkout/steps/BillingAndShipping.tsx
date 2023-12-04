import { Component, Show, createResource } from "solid-js";
import TextInput from "~/components/Inputs/TextInput";
import { useCheckoutContext } from "../context";
import SelectSearch from "~/components/Inputs/SelectSearch";
import { HttpService } from "~/services/HttpService";


type CountryCode = { name: string, code: string }
type StateCode = CountryCode

export const BillingAndShipping: Component = () => {
  const {
    shippingSameAsBilling,
    setShippingSameAsBilling,
    orderStore,
    updateBilling,
    updateShipping,

    formErrors,
  } = useCheckoutContext()

  const [countryOptions] = createResource(async () => {
    const { result, error } = await HttpService.get<CountryCode[]>('/countries')
    if (error) throw error
    return result!.map(c => ({ label: c.name, value: c.code }))
  })
  const [stateOptionsBilling] = createResource(() => orderStore.billingAddress.country, async () => {
    const { result, error } = await HttpService.get<StateCode[]>(`/states?country=${orderStore.billingAddress.country}`)
    if (error) throw error
    if (!result) return null
    return result!.map(c => ({ label: c.name, value: c.code }))
  })
  const [stateOptionsShipping] = createResource(() => orderStore.shippingAddress.country, async () => {
    const { result, error } = await HttpService.get<StateCode[]>(`/states?country=${orderStore.shippingAddress.country}`)
    if (error) throw error
    if (!result) return null
    return result!.map(c => ({ label: c.name, value: c.code }))
  })

  return (
    <form>
      <div class="flex flex-col md:flex-row md:gap-5">
        <TextInput
          label="First Name"
          value={orderStore.billingAddress.firstName}
          // defaultVal={user?.firstName}
          onChange={(e) => updateBilling("firstName", e.currentTarget.value)}
          error={formErrors().find(e => e.includes("billingAddress.firstName"))}
          required
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
        <SelectSearch
          name="country"
          label="Country"
          options={countryOptions.latest || []}
          default={countryOptions.latest?.at(0)}
          value={orderStore.billingAddress.country}
          onChange={() => { }}
          onValueChange={(e) => { updateBilling("country", e); updateBilling("state", ""); }}
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
            onValueChange={(e) => updateBilling("state", e)}
          />
        </Show>
      </div>

      <div class="flex flex-col md:flex-row md:gap-5 justify-center">
        <TextInput
          label="City"
          value={orderStore.billingAddress.city}
          onChange={(e) => updateBilling("city", e.currentTarget.value)}
        />

        <TextInput
          label="Zip/Postal Code"
          value={orderStore.billingAddress.zip}
          onChange={(e) => updateBilling("zip", e.currentTarget.value)}
        />
      </div>

      <TextInput
        label="Phone"
        type="tel"
        value={orderStore.billingAddress.phone}
        onChange={(e) => updateBilling("phone", e.currentTarget.value)}
      />

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
      </Show>
    </form >
  )
}