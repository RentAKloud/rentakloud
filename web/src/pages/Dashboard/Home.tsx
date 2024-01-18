import { Component, createSignal, onMount } from "solid-js"
import Card from "../../components/Card/Card"
import { authStore } from "../../stores/auth"
import StatsApi from "~/api/stats"

const Home: Component<{}> = () => {
  const { user } = authStore
  const [stats, setStats] = createSignal<any>()
  onMount(async () => {
    const { result, error } = await StatsApi.dashboard()

    if (result) {
      setStats(result)
    }
  })

  return (
    <>
      <section class="mb-10">
        <h2 class="text-4xl font-bold mb-2">Welcome {user?.fullName()}</h2>
        <p>This is your dashboard. You can access all your products and configuration from here.</p>
      </section>

      <div class="stats shadow mb-10">
        <div class="stat">
          <div class="stat-figure text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
          </div>
          <div class="stat-title">Active Products</div>
          <div class="stat-value text-primary">{stats()?.instances}</div>
          <div class="stat-desc">1 expiring soon</div>
        </div>

        <div class="stat">
          <div class="stat-figure text-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
          </div>
          <div class="stat-title">Total Orders</div>
          <div class="stat-value text-secondary">{stats()?.orders}</div>
          <div class="stat-desc">{stats()?.ordersInLastMonth} in last month</div>
        </div>

        <div class="stat">
          {/* <div class="stat-figure text-secondary">
            <div class="avatar online">
              <div class="w-16 rounded-full">
                <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
          </div> */}
          <div class="stat-value">0</div>
          <div class="stat-title">Pending Payments</div>
          {/* <div class="stat-desc text-secondary">31 tasks remaining</div> */}
        </div>
      </div>


      {/* <div class="stats stats-vertical shadow">
        <div class="stat">
          <div class="stat-title">Downloads</div>
          <div class="stat-value">31K</div>
          <div class="stat-desc">Jan 1st - Feb 1st</div>
        </div>

        <div class="stat">
          <div class="stat-title">New Users</div>
          <div class="stat-value">4,200</div>
          <div class="stat-desc">↗︎ 400 (22%)</div>
        </div>

        <div class="stat">
          <div class="stat-title">New Registers</div>
          <div class="stat-value">1,200</div>
          <div class="stat-desc">↘︎ 90 (14%)</div>
        </div>
      </div> */}

      {/* <section>
        <div class="stats bg-primary text-primary-content">

          <div class="stat">
            <div class="stat-title">Account balance</div>
            <div class="stat-value">$89,400</div>
            <div class="stat-actions">
              <button class="btn btn-sm btn-success">Add funds</button>
            </div>
          </div>

          <div class="stat">
            <div class="stat-title">Current balance</div>
            <div class="stat-value">$89,400</div>
            <div class="stat-actions">
              <button class="btn btn-sm">Withdrawal</button>
              <button class="btn btn-sm">deposit</button>
            </div>
          </div>

        </div>
      </section> */}
    </>
  )
}

export default Home