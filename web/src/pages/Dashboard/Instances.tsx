import { Component, For, Show, createResource, createSignal } from "solid-js";
import ProductsApi from "../../api/products";
import Card from "../../components/Card/Card";
import { DateTime } from "../../components/DateTime";
import Modal from "../../components/Modal";
import { ActiveProduct } from "../../types/product";
import { NotificationService } from "../../services/NotificationService";
import { Link } from "@solidjs/router";
import ListIcon from "../../components/icons/List";
import GridIcon from "../../components/icons/Grid";
import CLIIcon from "../../components/icons/CLI";

const Instances: Component = () => {
  const [activeProducts, { refetch }] = createResource(ProductsApi.allMy)
  const [selectedProduct, setSelectedProduct] = createSignal<ActiveProduct>()
  const [isDeleteModalOpen, setIsDeleteModalOpen] = createSignal<boolean>(false)
  const [activeView, setActiveView] = createSignal<"grid" | "list">("grid")

  async function deleteActiveProduct(id: string) {
    try {
      await ProductsApi.deleteActiveProduct(id)
      setIsDeleteModalOpen(false)
      setSelectedProduct(undefined)
      refetch()
    } catch (err) {
      NotificationService.error("Could not delete. Please try again or contact support.")
    }
  }

  return (
    <>
      <h2 class="text-4xl font-bold mb-2">Instances ({activeProducts.latest?.length})</h2>
      <p class="mb-10">Your active subscriptions.</p>

      <section>
        <Show when={activeProducts.latest?.length === 0}>
          <p>Nothing to see here.</p>
        </Show>

        <Show when={!activeProducts.loading && activeProducts.latest!.length > 0}>

          {/* View mode */}
          <div class="text-right">
            <ul class="menu menu-horizontal bg-base-100 rounded-box mb-6">
              <li>
                <a class="tooltip" classList={{ active: activeView() === "grid" }} data-tip="Grid view" onclick={() => setActiveView("grid")}>
                  <GridIcon />
                </a>
              </li>
              <li>
                <a class="tooltip" classList={{ active: activeView() === "list" }} data-tip="List view" onclick={() => setActiveView("list")}>
                  <ListIcon />
                </a>
              </li>
            </ul>
          </div>

          <Show when={activeView() === "grid"}>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
              <For each={activeProducts.latest}>
                {
                  (activeProduct) => (
                    <Card
                      title={activeProduct.product.name}
                      description={
                        <div class="flex flex-col gap-3">
                          <span classList={{
                            "text-error": activeProduct.status === "Inactive",
                            "text-success": activeProduct.status === "Active"
                          }}>{activeProduct.status}</span>
                          <p>Instance ID: {activeProduct.id}</p>
                          {/* <p>{activeProduct.product.shortDescription}</p> */}
                          <span>Started At: <DateTime value={activeProduct.createdAt} /></span>
                        </div>
                      }
                      actions={<div class="flex gap-5 items-center justify-start">
                        <Link href={`/products/${activeProduct.id}`}>Details</Link>
                        <button class="btn" onclick={() => {
                          setSelectedProduct(activeProduct)
                          setIsDeleteModalOpen(true)
                        }}>Delete</button>
                        <a href="http://204.27.57.219:4200/" target="_blank" class="btn"><CLIIcon /> SSH</a>
                      </div>} />
                  )
                }
              </For>
            </div>
          </Show>

          <Show when={activeView() === "list"}>
            <div class="overflow-x-auto">
              <table class="table">
                {/* <!-- head --> */}
                <thead>
                  <tr>
                    <th>
                      <label>
                        <input type="checkbox" class="checkbox" />
                      </label>
                    </th>
                    <th>Name</th>
                    <th>ID</th>
                    <th>Status</th>
                    <th>Subscription Started</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <For each={activeProducts.latest}>
                    {
                      (activeProduct) => (
                        <tr>
                          <th>
                            <label>
                              <input type="checkbox" class="checkbox" />
                            </label>
                          </th>
                          <td>
                            <div class="flex items-center space-x-3">
                              <div class="avatar">
                                <div class="mask mask-squircle w-12 h-12">
                                  <img src={activeProduct.product.images[0]?.src} alt={activeProduct.product.images[0]?.alt} />
                                </div>
                              </div>
                              <div>
                                <div class="font-bold">{activeProduct.product.name}</div>
                                <div class="text-sm opacity-50">us-east-1</div>
                              </div>
                            </div>
                          </td>
                          <td>
                            {activeProduct.id}
                            <br />
                            <span class="badge badge-ghost badge-sm">{"204.27.57.219"}</span>
                          </td>
                          <td classList={{
                            "text-error": activeProduct.status === "Inactive",
                            "text-success": activeProduct.status === "Active"
                          }}>{activeProduct.status}</td>
                          <td><DateTime value={activeProduct.createdAt} /></td>
                          <td><a href="http://204.27.57.219:4200/" target="_blank" class="btn btn-ghost"><CLIIcon /></a></td>
                          <th>
                            <Link href={`/products/${activeProduct.id}`} class="btn btn-ghost btn-xs">details</Link>
                          </th>
                        </tr>
                      )
                    }
                  </For>
                </tbody>
                {/* <!-- foot --> */}
                <tfoot>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>ID</th>
                    <th>Status</th>
                    <th>Subscription Started</th>
                    <th></th>
                    <th></th>
                  </tr>
                </tfoot>

              </table>
            </div>
          </Show>
        </Show>
      </section>

      <Modal
        isOpen={isDeleteModalOpen()}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirm Delete"
        description={`Are you sure you want to delete ${selectedProduct()?.product.name}?`}
        actions={
          <>
            <button class="btn" onclick={() => setIsDeleteModalOpen(false)}>Cancel</button>
            <button class="btn btn-error" onclick={() => deleteActiveProduct(selectedProduct()!.id)}>Yes</button>
          </>
        } />
    </>
  )
}

export default Instances