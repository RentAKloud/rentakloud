import { Component, createResource, For } from "solid-js";
import SubscriptionsApi from "~/api/subscriptions";
import Card from "~/components/Card/Card";
import { DateTime } from "~/components/DateTime";
import Pagination from "~/components/Pagination";
import { Subscription } from "~/types/subscription";

const Subscriptions: Component = () => {
  const [subscriptions] = createResource(async () => {
    const { result, error } = await SubscriptionsApi.all();
    if (error) throw error;
    return result!.map((s) => new Subscription(s));
  });

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
              <button class="btn btn-outline btn-error ">Cancel</button>
            </div>
          </div>
        )}
      </For>

      <div class="m-auto">
        <Pagination last={5} current={1} setPage={() => {}} />
      </div>
    </div>
  );
};

export default Subscriptions;
