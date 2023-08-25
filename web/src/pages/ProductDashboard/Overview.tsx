import { Component } from "solid-js"
import TextInput from "../../components/Inputs/TextInput"

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
              <TextInput label="Product" value="ERPNext" />

              <TextInput label="Name" value="ERPNext-Main" />

              <TextInput label="Billing Cycle" value="Monthly" />

              <TextInput label="Payment Method" value="Credit Card" />

              <TextInput label="Created" value="1/29/2023" />
            </div>

            <div class="flex-1">
              <TextInput label="Version" value="14.0 Community" />

              <TextInput label="Location" value="Central US" />

              <TextInput label="Configuration" value="2 CPU Cores/2 GB RAM/60 GB SSD" />

              <TextInput label="Price" value="$6.99/month" />

              <TextInput label="Due Date" value="1/29/2024" />
            </div>
          </div>

          <button class="btn btn-primary">Renew</button>
        </form>
      </div>
    </>
  )
}

export default Overview