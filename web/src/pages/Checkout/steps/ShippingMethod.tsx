import { Component, For } from "solid-js";
import { useCheckoutContext } from "../context";

export const ShippingMethod: Component = () => {
  const {
    orderStore,
    updateShippingMethod,
    availableShippingMethods
  } = useCheckoutContext()

  return (
    <>
      <For each={availableShippingMethods()} fallback={
        <p>No shipping methods available</p>
      }>
        {(sm, i) => {
          return (
            <div class="form-control bg-base-100 rounded-lg p-6 hover:bg-base-200 mb-4">
              <label class="label cursor-pointer">
                <span class="label-text">{sm.name}</span>
                <input
                  type="radio"
                  name="shipping-method"
                  class="radio checked:bg-primary"
                  checked={orderStore.shippingMethod?.id === sm.id}
                  onclick={() => updateShippingMethod(sm)}
                />
              </label>
              <p class="text-sm">{sm.description}</p>
            </div>
          )
        }}
      </For>

      <div class="mb-20" />
    </>
  )
}