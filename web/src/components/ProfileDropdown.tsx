import { Link } from "@solidjs/router"
import { Component } from "solid-js"
import { authStore, logout } from "~/stores/auth"
import { Icon } from "./icons"

const ProfileDropdown: Component = () => {
  const { user } = authStore

  return (
    <>
      <label tabindex="0" class="btn btn-ghost btn-circle avatar">
        {/* <div class="w-10 rounded-full">
          <img src="https://spectrum.ieee.org/media-library/ceo-of-comma-ai-george-geohot-hotz-speaks-onstage-during-techcrunch-disrupt-sf-2016-at-pier-48-on-september-13-2016-in-san-fr.jpg?id=25582060&width=980" />
        </div> */}
        <Icon.UserCircle class="w-8" />
      </label>

      <ul tabindex="0" class="dropdown-content menu menu-compact mt-3 p-2 z-10 shadow bg-base-100 rounded-box w-52">
        <li class="p-4">Logged in as {user?.fullName()}.</li>
        <li>
          <Link href="/dashboard" end class="justify-between">
            Dashboard
          </Link>
        </li>
        {/* <li>
          <Link href="/dashboard/profile" class="justify-between">
            Profile
            <span class="badge">New</span>
          </Link>
        </li> */}
        <li><Link href="/dashboard/settings">Settings</Link></li>
        <li><a onClick={logout}>Logout</a></li>
      </ul>
    </>
  )
}

export default ProfileDropdown