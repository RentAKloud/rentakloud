import { useParams } from "@solidjs/router";
import { Component, createSignal } from "solid-js";
import ProductsApi from "~/api/products";
import Modal from "~/components/Modal";
import { NotificationService } from "~/services/NotificationService";
import { useInstanceContext } from "./context";
import { InstanceAddonKey } from "~/types/instance";

const InstanceSettings: Component = () => {
  const { id } = useParams()
  const { instance } = useInstanceContext()

  const [isDeleteModalOpen, setIsDeleteModalOpen] = createSignal<boolean>(false)
  async function deleteActiveProduct(id: string) {
    try {
      await ProductsApi.deleteInstance(id)
      setIsDeleteModalOpen(false)
    } catch (err) {
      NotificationService.error("Could not delete. Please try again or contact support.")
    }
  }

  async function updateAddon(id: InstanceAddonKey, quantity: number) {
    const addons = instance.latest?.addons || []
    const i = addons?.findIndex(a => a.id === id)
    if (i >= 0) {
      addons[i].quantity = quantity
    } else[
      addons.push({ id, quantity })
    ]
    ProductsApi.updateInstance(instance.latest?.id!, { addons })
  }

  return (
    <>
      <h2 class="text-4xl font-bold mb-5">Settings</h2>

      <section class="w-96 mb-10">
        <div class="form-control mb-3">
          <label class="label">
            <span class="label-text">Title</span>
          </label>
          <input
            type="text" placeholder="eg. My Office Workspace" class="input input-bordered input-primary"
            value={instance.latest?.title}
            oninput={(e) => {
              ProductsApi.updateInstance(instance.latest?.id!, { title: e.currentTarget.value })
            }}
          />
        </div>
      </section>

      <section class="mb-10">
        <h3 class="text-3xl font-bold mb-2">Add-ons</h3>
        <p class="mb-6">
          Additional resources for your growing needs. Configure your instance as you like.
          Charges for extra resources will be adjusted in your next invoice.
        </p>

        <div class="w-96">
          <div class="flex gap-10 items-center mb-4">
            <div>
              <h4 class="font-bold">CPU</h4>
            </div>

            <div class="form-control flex-1">
              <input type="range" min="0" max="4"
                value={instance.latest?.addons.find(i => i.id === "cpu")?.quantity || 0}
                class="range range-accent" step="1"
                onchange={(e) => updateAddon("cpu", +e.currentTarget.value)}
              />
              <div class="w-full flex justify-between text-xs px-2">
                <span>0</span>
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
              </div>
            </div>
          </div>

          <div class="flex gap-10 items-center mb-4">
            <div>
              <h4 class="font-bold">RAM</h4>
            </div>

            <div class="form-control flex-1">
              <input type="range" min="0" max="4"
                value={instance.latest?.addons.find(i => i.id === "ram")?.quantity || 0}
                class="range range-info" step="1"
                onchange={(e) => updateAddon("ram", +e.currentTarget.value)}
              />
              <div class="w-full flex justify-between text-xs px-2">
                <span>0 GB</span>
                <span>1 GB</span>
                <span>2 GB</span>
                <span>3 GB</span>
                <span>4 GB</span>
              </div>
            </div>
          </div>

          <div class="flex gap-10 items-center mb-4">
            <div>
              <h4 class="font-bold">SSD</h4>
            </div>

            <div class="form-control flex-1">
              <input type="range" min="0" max="4"
                value={instance.latest?.addons.find(i => i.id === "ssd")?.quantity || 0}
                class="range range-secondary" step="1"
                oninput={(e) => updateAddon("ssd", +e.currentTarget.value)}
              />
              <div class="w-full flex justify-between text-xs px-2">
                <span>0 GB</span>
                <span>32 GB</span>
                <span>64 GB</span>
                <span>128 GB</span>
                <span>256 GB</span>
              </div>
            </div>
          </div>

          <div class="flex gap-10 items-center">
            <div>
              <h4 class="font-bold">HDD</h4>
            </div>

            <div class="form-control flex-1">
              <input type="range" min="0" max="4"
                value={instance.latest?.addons.find(i => i.id === "hdd")?.quantity || 0}
                class="range range-secondary" step="1"
                oninput={(e) => updateAddon("hdd", +e.currentTarget.value)}
              />
              <div class="w-full flex justify-between text-xs px-2">
                <span>0 GB</span>
                <span>128 GB</span>
                <span>256 GB</span>
                <span>512 GB</span>
                <span>1 TB</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h3 class="text-3xl font-bold mb-5">Management</h3>

        <div class="flex gap-10 items-center">
          <div>
            <h4 class="font-bold">Delete?</h4>
            <p>This will permanently delete this VM instance, cancel its associated subscription, and all associated data will be lost.</p>
          </div>

          <button class="btn btn-error" onclick={() => setIsDeleteModalOpen(true)}>Delete</button>
        </div>
      </section>

      <Modal
        isOpen={isDeleteModalOpen()}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirm Delete"
        description={`Are you sure you want to delete this?`}
        actions={
          <>
            <button class="btn" onclick={() => setIsDeleteModalOpen(false)}>Cancel</button>
            <button class="btn btn-error" onclick={() => deleteActiveProduct(id)}>Yes</button>
          </>
        } />
    </>
  )
}

export default InstanceSettings