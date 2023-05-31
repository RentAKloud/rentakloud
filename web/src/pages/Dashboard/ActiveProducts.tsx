import { Component, For, createResource, createSignal } from "solid-js";
import ProductsApi from "../../api/products";
import Card from "../../components/Card/Card";
import { DateTime } from "../../components/DateTime";
import Modal from "../../components/Modal";
import { ActiveProduct } from "../../types/product";
import { NotificationService } from "../../services/NotificationService";

const ActiveProducts: Component = () => {
  const [activeProducts, { refetch }] = createResource(ProductsApi.allMy)
  const [selectedProduct, setSelectedProduct] = createSignal<ActiveProduct>()
  const [isDeleteModalOpen, setIsDeleteModalOpen] = createSignal<boolean>(false)

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
      <h2 class="text-4xl font-bold mb-2">Active Products ({activeProducts.latest?.length})</h2>
      <p class="mb-10">Your active subscriptions.</p>

      <section class="grid grid-cols-1 md:grid-cols-3 gap-5">
        <For each={activeProducts.latest} fallback="Nothing to see here.">
          {
            (activeProduct) => (
              <Card
                title={activeProduct.product.name}
                description={
                  <div class="flex flex-col gap-5">
                    <p>Instance ID: {activeProduct.id}</p>
                    {/* <p>{activeProduct.product.shortDescription}</p> */}
                    <span>Started At: <DateTime value={activeProduct.createdAt} /></span>
                  </div>
                }
                actions={<div class="flex gap-5 items-center justify-start">
                  <span class="text-success" classList={{ "text-error": activeProduct.status === "Inactive" }}>{activeProduct.status}</span>
                  <button class="btn" onclick={() => {
                    setSelectedProduct(activeProduct)
                    setIsDeleteModalOpen(true)
                  }}>Delete</button>
                  <a href="http://204.27.57.219:4200/" target="_blank" class="btn">SSH</a>
                </div>} />
            )
          }
        </For>
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

export default ActiveProducts