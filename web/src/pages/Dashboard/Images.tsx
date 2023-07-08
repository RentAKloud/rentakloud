import { Component, For, Show, createResource, createSignal } from "solid-js";
import { DateTime } from "../../components/DateTime";
import Modal from "../../components/Modal";
import { NotificationService } from "../../services/NotificationService";
import DiskImagesApi from "../../api/diskImages";
import { DiskImage } from "../../types/diskImage";
import TrashIcon from "../../components/icons/Trash";
import DesktopIcon from "../../components/icons/Desktop";
import DownloadIcon from "../../components/icons/Download";

const Images: Component = () => {
  const [images, { refetch }] = createResource(DiskImagesApi.all)
  const [selectedProduct, setSelectedProduct] = createSignal<DiskImage>()
  const [isDeleteModalOpen, setIsDeleteModalOpen] = createSignal<boolean>(false)

  async function deleteDiskImage(id: number) {
    try {
      await DiskImagesApi.delete(id)
      setIsDeleteModalOpen(false)
      setSelectedProduct(undefined)
      refetch()
    } catch (err) {
      NotificationService.error("Could not delete. Please try again or contact support.")
    }
  }

  return (
    <>
      <h2 class="text-4xl font-bold mb-2">Images ({images.latest?.length})</h2>
      <p class="mb-10">Base disk images and your backups. You can create VMs based of these images.</p>

      <section>
        <Show when={images.latest?.length === 0}>
          <p>Nothing to see here.</p>
        </Show>

        <Show when={!images.loading && images.latest!.length > 0}>
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
                  <th>Type</th>
                  <th>OS</th>
                  <th>Format</th>
                  <th>Created At</th>
                  <th></th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <For each={images.latest}>
                  {
                    (image) => (
                      <tr>
                        <th>
                          <label>
                            <input type="checkbox" class="checkbox" />
                          </label>
                        </th>
                        <td>
                          <div class="flex items-center space-x-3">
                            <div>
                              <div class="">{image.name}</div>
                            </div>
                          </div>
                        </td>
                        <td>{image.os}</td>
                        <td>{image.osName}</td>
                        <td>{image.format}</td>
                        <td><DateTime value={image.createdAt} /></td>
                        <td class="text-error">
                          <TrashIcon />
                        </td>
                        <td>
                          <span class="tooltip tooltip-info inline" data-tip="Launch a new VM">
                            <DesktopIcon />
                          </span>
                        </td>
                        <td><DownloadIcon /></td>
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
                  <th>Type</th>
                  <th>OS</th>
                  <th>Format</th>
                  <th>Created At</th>
                  <th></th>
                  <th></th>
                  <th></th>
                </tr>
              </tfoot>

            </table>
          </div>
        </Show>
      </section>

      <Modal
        isOpen={isDeleteModalOpen()}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirm Delete"
        description={`Are you sure you want to delete ${selectedProduct()?.name}?`}
        actions={
          <>
            <button class="btn" onclick={() => setIsDeleteModalOpen(false)}>Cancel</button>
            <button class="btn btn-error" onclick={() => deleteDiskImage(selectedProduct()!.id)}>Yes</button>
          </>
        } />
    </>
  )
}

export default Images