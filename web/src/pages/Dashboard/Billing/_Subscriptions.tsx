import { Component, createResource, createSignal, For } from "solid-js";
import SubscriptionsApi from "~/api/subscriptions";
import Card from "~/components/Card/Card";
import { DateTime } from "~/components/DateTime";
import Modal from "~/components/Modal";
import Pagination from "~/components/Pagination";
import { NotificationService } from "~/services/NotificationService";
import { Subscription } from "~/types/subscription";

const Subscriptions: Component = () => {
  const [subscriptions, { refetch }] = createResource(async () => {
    const { result, error } = await SubscriptionsApi.all();
    if (error) throw error;
    return result!.map((s) => new Subscription(s));
  });

  const [isCancelModalOpen, setIsCancelModalOpen] = createSignal<string | null>(
    null,
  );
  async function cancelSubscription(id: string) {
    try {
      const { error } = await SubscriptionsApi.cancelSubscription(id);
      setIsCancelModalOpen(null);
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
    <div class="flex flex-col gap-4">
      <div class="flex gap-10 mb-6">
        <Card title="This Month" hasGradientShadow>
          <h2 class="text-4xl font-bold">$1,399.00</h2>
        </Card>
        <Card title="Next Month" hasGradientShadow>
          <h2 class="text-4xl font-bold">$999.00</h2>
        </Card>
      </div>

      <div>
        <h3 class="font-bold">Manage Subscriptions</h3>
      </div>

      <For each={subscriptions.latest}>
        {(sub) => (
          <div class="flex p-6 hover:bg-neutral/50 gap-6 justify-between">
            <div class="flex flex-col">
              <h3 class="font-bold">{sub.title()}</h3>
              <span>{sub.id}</span>
            </div>
            <div class="flex flex-col">
              <h3 class="text-sm">Renews On</h3>
              <DateTime value={sub.currentPeriodEnd} />
            </div>
            <div>Renewal Price</div>
            <div>
              <button
                class="btn btn-outline btn-error"
                onclick={() => setIsCancelModalOpen(sub.id)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </For>

      <div class="m-auto">
        <Pagination last={5} current={1} setPage={() => {}} />
      </div>

      <Modal
        isOpen={isCancelModalOpen() !== null}
        onClose={() => setIsCancelModalOpen(null)}
        title="Confirm Cancellation"
        description={`Are you sure you want to cancel this?`}
        actions={
          <>
            <button class="btn" onclick={() => setIsCancelModalOpen(null)}>
              Cancel
            </button>
            <button
              class="btn btn-error"
              onclick={() => cancelSubscription(isCancelModalOpen()!)}
            >
              Yes
            </button>
          </>
        }
      />
    </div>
  );
};

export default Subscriptions;
