import { Component, For, Show, createResource, createSignal } from "solid-js";
import { Link, useSearchParams } from "@solidjs/router";
import { DateTime } from "../../components/DateTime";
import Modal from "../../components/Modal";
import { NotificationService } from "../../services/NotificationService";
import DiskImagesApi from "../../api/diskImages";
import { DiskImage } from "../../types/diskImage";
import TrashIcon from "../../components/icons/Trash";
import DesktopIcon from "../../components/icons/Desktop";
import DownloadIcon from "../../components/icons/Download";
import Pagination from "../../components/Pagination";
import Search from "../../components/Inputs/Search";

const Backups: Component = () => {
  const q = new URLSearchParams([
    ['tags', 'backup']
  ])
  const [params, setParams] = useSearchParams()
  const currPage = () => params.page || '1'
  q.append('page', currPage())

  const [images, { refetch }] = createResource(() => DiskImagesApi.all(q))
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

  function setCurrPage(page: number) {
    setParams({ page })
  }

  return (
    <>
      <h2 class="text-4xl font-bold mb-2">Backups ({images.latest?.length})</h2>
      <p class="mb-5">Your backups. You can download them or create VMs based of these images.</p>

      <section>
        <Show when={images.latest?.length === 0}>
          <p>Nothing to see here.</p>
        </Show>

        <Show when={!images.loading && images.latest!.length > 0}>
          <div class="mb-10">
            <Search />
          </div>

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
                        <td class="flex items-center gap-5">
                          <span class="text-error">
                            <TrashIcon />
                          </span>

                          <span class="tooltip tooltip-info" data-tip="Launch a new VM">
                            <Link href={`/dashboard/instances/new?image=${image.id}`} class="btn btn-ghost">
                              <DesktopIcon />
                            </Link>
                          </span>

                          <span class="tooltip tooltip-info" data-tip="Download">
                            <DownloadIcon />
                          </span>
                        </td>
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
                </tr>
              </tfoot>

            </table>
          </div>

          <div class="mt-10 flex justify-center">
            <Pagination current={+currPage()} last={6} setPage={setCurrPage} />
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

export default Backups