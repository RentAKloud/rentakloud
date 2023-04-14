import { Component } from "solid-js"
import FormInput from "../../components/FormInput"

const Overview: Component<{}> = () => {
  return (
    <>
      <div class="tabs">
        <a class="tab tab-lifted tab-active">Overview</a>
      </div>
      <div class="bg-base-100 p-10">
        <form>
          <div class="flex gap-5 justify-center mb-10">
            <div class="flex-1">
              <FormInput label="Product" value="ERPNext" />

              <FormInput label="Name" value="ERPNext-Main" />

              <FormInput label="Billing Cycle" value="Monthly" />

              <FormInput label="Payment Method" value="Credit Card" />

              <FormInput label="Created" value="1/29/2023" />
            </div>

            <div class="flex-1">
              <FormInput label="Version" value="14.0 Community" />

              <FormInput label="Location" value="Central US" />

              <FormInput label="Configuration" value="2 CPU Cores/2 GB RAM/60 GB SSD" />

              <FormInput label="Price" value="$6.99/month" />

              <FormInput label="Due Date" value="1/29/2024" />
            </div>
          </div>

          <button class="btn btn-primary">Renew</button>
        </form>
      </div>
    </>
  )
}

export default Overview