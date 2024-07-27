import { Component, For } from "solid-js";
import { authStore } from "../../stores/auth";
import { Icon } from "~/components/icons";

const Settings: Component = () => {
  const { user } = authStore;

  return (
    <>
      <h2 class="text-4xl font-bold mb-5">Settings</h2>

      <section class="w-96 mb-10">
        <div class="form-control mb-3">
          <label class="label">
            <span class="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="Email"
            class="input input-bordered input-primary"
            onInput={(e) => {}}
            value={user?.email}
            disabled
          />
        </div>

        <div class="form-control mb-3">
          <label class="label">
            <span class="label-text">First Name</span>
          </label>
          <input
            type="text"
            placeholder="First Name"
            class="input input-bordered input-primary"
            onInput={(e) => {}}
            value={user?.firstName}
          />
        </div>

        <div class="form-control mb-3">
          <label class="label">
            <span class="label-text">Last Name</span>
          </label>
          <input
            type="text"
            placeholder="Last Name"
            class="input input-bordered input-primary"
            onInput={(e) => {}}
            value={user?.lastName}
          />
        </div>

        <div class="form-control mb-3">
          <label class="label">
            <span class="label-text">Company Name</span>
          </label>
          <input
            type="email"
            placeholder="RentAKloud Inc."
            class="input input-bordered input-primary"
            onInput={(e) => {}}
            value={user?.profile?.companyName || ""}
          />
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Password</span>
          </label>
          <input
            type="password"
            placeholder="Password"
            class="input input-bordered input-primary"
            onInput={(e) => {}}
          />
        </div>
      </section>

      <section class="w-96 mb-10">
        <div class="form-control">
          <label class="cursor-pointer label">
            <span class="label-text">Receive Marketing Emails</span>
            <input type="checkbox" class="toggle toggle-primary" checked />
          </label>
        </div>
      </section>

      <section class="w-96">
        <h2 class="text-3xl font-bold mb-4">Addresses</h2>
        <For each={user?.profile?.addresses}>
          {(addr) => {
            return (
              <div class="flex justify-between items-center mb-4">
                <div>
                  <div>
                    {addr.firstName} {addr.lastName}
                  </div>
                  <div>{addr.address}</div>
                  <div>{addr.address2}</div>
                  <div>
                    {addr.city}, {addr.state}, {addr.zip}, {addr.country}
                  </div>
                </div>
                <div>
                  <button class="btn btn-error btn-outline">
                    <Icon.Trash />
                  </button>
                </div>
              </div>
            );
          }}
        </For>
      </section>
    </>
  );
};

export default Settings;
