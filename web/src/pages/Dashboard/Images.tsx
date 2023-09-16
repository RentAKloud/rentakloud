import { Component, For, Show, createEffect, createResource, createSignal } from "solid-js";
import { Link, useSearchParams } from "@solidjs/router";
import { DateTime } from "~/components/DateTime";
import Modal from "~/components/Modal";
import { NotificationService } from "~/services/NotificationService";
import DiskImagesApi from "~/api/diskImages";
import { DiskImage } from "~/types/diskImage";
import TrashIcon from "~/components/icons/Trash";
import DesktopIcon from "~/components/icons/Desktop";
import DownloadIcon from "~/components/icons/Download";
import Pagination from "~/components/Pagination";
import Search from "~/components/Inputs/Search";

const Images: Component = () => {
  const q = new URLSearchParams([
    ['exclude_tags', 'backup'],
  ])
  const [params, setParams] = useSearchParams()
  const currPage = () => params.page || '1'
  const pageSize = () => params["page-size"] || '10'
  const searchQuery = () => params.q || ''
  q.append('page', currPage())
  q.append('page-size', pageSize())
  q.append('q', searchQuery())

  const [images, { refetch }] = createResource(() => DiskImagesApi.all(q))
  const [selectedProduct, setSelectedProduct] = createSignal<DiskImage>()
  const [isDeleteModalOpen, setIsDeleteModalOpen] = createSignal<boolean>(false)

  const totalPages = () => Math.ceil((images.latest?.total || 0) / +pageSize())

  createEffect(() => {
    q.set('page', currPage())
    q.set('page-size', pageSize())

    // if search query has changed, we also want to reset to first page
    if (q.get('q') !== searchQuery()) {
      q.set('q', searchQuery())
      setCurrPage(1)
      q.set('page', '1')
    }

    refetch()
  })

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
      <h2 class="text-4xl font-bold mb-2">Images ({images.latest?.total})</h2>
      <p class="mb-5">Base disk images. You can create VMs based of these images.</p>

      <section>
        <Show when={images.latest?.total === 0 && searchQuery() === ''}>
          <p>Nothing to see here.</p>
        </Show>

        <Show when={!images.error && images.latest}>
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
                <For each={images.latest!.data}>
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
                          <span class="text-error btn btn-ghost" onclick={() => {
                            setSelectedProduct(image)
                            setIsDeleteModalOpen(true)
                          }}>
                            <TrashIcon />
                          </span>

                          <span class="tooltip tooltip-info inline" data-tip="Launch a new VM">
                            <Link href={`/dashboard/instances/new?image=${image.id}`} class="btn btn-ghost">
                              <DesktopIcon />
                            </Link>
                          </span>

                          <span class="btn btn-ghost">
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
            <Pagination current={+currPage()} last={totalPages()} setPage={setCurrPage} />
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