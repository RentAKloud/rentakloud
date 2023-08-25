import { Component, createResource } from "solid-js";
import { useSearchParams } from "@solidjs/router";
import { SubmitHandler, createForm, minLength, required } from "@modular-forms/solid";
import TextInput from "~/components/Inputs/TextInput";
import SelectSearch from "~/components/Inputs/SelectSearch";
import DiskImagesApi from "~/api/diskImages";

type NewInstanceForm = {
  name: string
  config: number
  region: number
  image: number
  network: number
}

const configs = [
  { label: "Nano", value: 1 }, { label: "Micro", value: 2 }, { label: "Small", value: 3 },
  { label: "Medium", value: 4 }, { label: "Large", value: 5 }, { label: "XLarge", value: 6 },
  { label: "2XLarge", value: 7 }
]
const networks = [{ label: "Default", value: 1 }, { label: "VPC-1", value: 2 }]

const InstancesNew: Component = () => {
  const [params, setParams] = useSearchParams()
  const [images, { refetch }] = createResource(() => DiskImagesApi.all())
  const regions = ["US East", "US West", "Canada", "EU West", "EU East", "EU Central", "Asia Central", "Australia"]
  const initialValues = {
    // config: configs[2].value,
    image: params.image ? images.latest?.data.find(x => x.id === +params.image)?.id : undefined
  }

  const [newInstanceForm, { Form, Field, FieldArray }] = createForm<NewInstanceForm>({
    validateOn: 'change',
    initialValues
  })

  const handleSubmit: SubmitHandler<NewInstanceForm> = (values, event) => {
    // Runs on client
    console.log("submitting...")
  };

  return (
    <>
      <h2 class="text-4xl font-bold mb-5">Create a New Instance</h2>

      <section>
        <Form class="w-1/2 flex flex-col gap-5" onSubmit={handleSubmit}>
          <Field name="name" validate={[
            required("Give your instance a rememberable name"),
            minLength(3, "Name must be at least 3 characters long")
          ]}>
            {(field, props) => <TextInput {...props} label="Name" value="" error={field.error} />}
          </Field>

          <Field name="config" type="number" validate={[
            required("Please select a configuration"),
          ]}>
            {(field, props) =>
              <SelectSearch
                {...props}
                label="Config"
                options={configs}
                value={field.value}
                error={field.error}
                onValueChange={(val) => newInstanceForm.internal.fields.config?.value.set(+val)}
                placeholder="Select an instance type" />
            }
          </Field>

          <Field name="region" type="number">
            {(field, props) =>
              <SelectSearch
                {...props}
                label="Region"
                options={regions.map(r => ({ label: r, value: r }))}
                onValueChange={(val) => newInstanceForm.internal.fields.region?.value.set(+val)}
                placeholder="Select a region" />
            }
          </Field>

          <Field name="image" type="number">
            {(field, props) =>
              <SelectSearch
                {...props}
                label="Image"
                value={field.value}
                options={images.latest?.data.map(i => ({ label: i.name, value: i.id })) || []}
                onValueChange={(val) => newInstanceForm.internal.fields.image?.value.set(+val)}
                placeholder="Select an image" />
            }
          </Field>

          <Field name="network" type="number">
            {(field, props) =>
              <SelectSearch
                {...props}
                label="Network"
                options={networks}
                onValueChange={(val) => newInstanceForm.internal.fields.network?.value.set(+val)}
                placeholder="Select a network" />
            }
          </Field>

          <div class="mt-5 flex gap-5 justify-end">
            <button class="btn btn-outline btn-error">Cancel</button>
            <button class="btn btn-outline btn-success" type="submit">Create</button>
          </div>
        </Form>
      </section>
    </>
  )
}

export default InstancesNew