import { Component } from "solid-js"
import FormInput from "../../components/Inputs/FormInput"

const SiteAndSSL: Component<{}> = () => {
  return (
    <>
      <div class="tabs">
        <a class="tab tab-lifted tab-active">Site & SSL</a>
      </div>
      <div class="bg-base-100 p-10">
        <p class="mb-5">Add or remove websites. Manage DNS, SSL, Domains, and redirections.</p>

        <form class="flex gap-5 justify-center">
          {/* <div class="flex-1">
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
          </div> */}
        </form>
      </div>
    </>
  )
}

export default SiteAndSSL