import { Component, createResource, createSignal, For } from "solid-js";
import PaymentsApi from "~/api/payments";
import { Icon } from "~/components/icons";
import Modal from "~/components/Modal";
import { paymentMethods } from "~/config/data";
import { NotificationService } from "~/services/NotificationService";

const PaymentMethods: Component = () => {
  const [methods, { refetch }] = createResource(async () => {
    const { result, error } = await PaymentsApi.paymentMethods();
    if (error) throw error;
    return result!.data;
  });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = createSignal<string | null>(
    null,
  );
  async function deletePaymentMethod(id: string) {
    try {
      const { error } = await PaymentsApi.deletePaymentMethod(id);
      setIsDeleteModalOpen(null);
      if (!error) {
        refetch();
        NotificationService.success("Deleted successfully");
      }
    } catch (err) {
      NotificationService.error(
        "Could not delete. Please try again or contact support.",
      );
    }
  }

  return (
    <div class="flex flex-col gap-6">
      <div>
        <h2 class="text-3xl font-bold">
          {methods.latest?.length} methods added
        </h2>
      </div>

      <For each={methods.latest || []}>
        {(method) => (
          <div class="flex justify-between items-center p-5 hover:bg-neutral/50 transition">
            <div class="flex flex-col">
              <div class="flex gap-6 mb-4">
                <img
                  src={paymentMethods[method.card.brand]}
                  class="w-10 inline"
                />
                <span>**** **** **** {method.card.last4}</span>
              </div>
              <div>
                Expires At {method.card.exp_month} / {method.card.exp_year}
              </div>
            </div>

            <div>
              <button
                class="btn btn-error btn-outline"
                onclick={() => setIsDeleteModalOpen(method.id)}
              >
                <Icon.Trash />
              </button>
            </div>
          </div>
        )}
      </For>

      <Modal
        isOpen={isDeleteModalOpen() !== null}
        onClose={() => setIsDeleteModalOpen(null)}
        title="Confirm Delete"
        description={`Are you sure you want to delete this?`}
        actions={
          <>
            <button class="btn" onclick={() => setIsDeleteModalOpen(null)}>
              Cancel
            </button>
            <button
              class="btn btn-error"
              onclick={() => deletePaymentMethod(isDeleteModalOpen()!)}
            >
              Yes
            </button>
          </>
        }
      />
    </div>
  );
};

export default PaymentMethods;
