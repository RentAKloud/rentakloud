import { Component } from "solid-js";
import { authStore } from "../../stores/auth";

const Settings: Component = () => {
  const { user } = authStore

  return (
    <>
      <h2 class="text-4xl font-bold mb-5">Settings</h2>

      <section class="w-96 mb-10">
        <div class="form-control mb-3">
          <label class="label">
            <span class="label-text">Email</span>
          </label>
          <input
            type="email" placeholder="Email" class="input input-bordered input-primary"
            onInput={(e) => { }}
            value={user?.email}
          />
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Password</span>
          </label>
          <input
            type="password" placeholder="Password" class="input input-bordered input-primary"
            onInput={(e) => { }}
          />
        </div>
      </section>

      <section class="w-96">
        <div class="form-control">
          <label class="cursor-pointer label">
            <span class="label-text">Receive Marketing Emails</span>
            <input type="checkbox" class="toggle toggle-primary" checked />
          </label>
        </div>
      </section>
    </>
  )
}

export default Settings