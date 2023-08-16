import { Component, createResource } from "solid-js";
import FormInput from "../../components/Inputs/FormInput";
import SelectSearch from "../../components/Inputs/SelectSearch";
import DiskImagesApi from "../../api/diskImages";
import { useSearchParams } from "@solidjs/router";

const InstancesNew: Component = () => {
  const [params, setParams] = useSearchParams()
  const [images, { refetch }] = createResource(() => DiskImagesApi.all())
  const configs = ["Nano", "Micro", "Small", "Medium", "Large", "XLarge", "2XLarge"]
  const regions = ["US East", "US West", "Canada", "EU West", "EU East", "EU Central", "Asia Central", "Australia"]

  return (
    <>
      <h2 class="text-4xl font-bold mb-5">Create a New Instance</h2>

      <section>
        <FormInput label="Name" value="" />

        <div class="mb-3">
          <label>Config</label>
          <SelectSearch options={configs} placeholder="Select an instance type" />
        </div>

        <div class="mb-3">
          <label>Region</label>
          <SelectSearch options={regions} placeholder="Select a region" />
        </div>

        <div class="mb-3">
          <label>Image</label>
          <SelectSearch
            default={params.image ? images.latest?.find(x => x.id === +params.image)?.name : ""}
            options={images.latest?.map(i => i.name) || []}
            placeholder="Select an image" />
        </div>

        <div class="mb-3">
          <label>Network</label>
          <SelectSearch options={["Default", "VPC-1"]} placeholder="Select a network" />
        </div>

        <div class="mt-10 flex gap-5 justify-end">
          <button class="btn btn-outline btn-error">Cancel</button>
          <button class="btn btn-outline btn-success">Create</button>
        </div>
      </section>
    </>
  )
}

export default InstancesNew