import { Component, ErrorBoundary } from "solid-js";
import PaymentMethods from "./_PaymentMethods";
import History from "./_History";
import Subscriptions from "./_Subscriptions";

const Billing: Component = () => {
  return (
    <>
      <h2 class="text-4xl font-bold mb-5">Billing</h2>

      <div role="tablist" class="tabs tabs-bordered">
        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          class="tab"
          aria-label="Overview"
          checked
        />
        <div role="tabpanel" class="tab-content p-10">
          <ErrorBoundary fallback={(err) => "Somethong went wrong. " + err}>
            <Subscriptions />
          </ErrorBoundary>
        </div>

        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          class="tab"
          aria-label="History"
        />
        <div role="tabpanel" class="tab-content p-10">
          <History />
        </div>

        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          class="tab"
          aria-label="Payment Methods"
        />
        <div role="tabpanel" class="tab-content p-10">
          <PaymentMethods />
        </div>
      </div>
    </>
  );
};

export default Billing;
