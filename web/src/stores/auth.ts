import { createStore } from "solid-js/store"
import { ls_keys } from "../config/constants";
import { User } from "../types/user";

const initialState = {
  access_token: null,
  user: null,
}

const [authStore, setAuthStore] = createStore<{
  access_token: string | null;
  user: User | null;
}>(initialState)

function login(email: string, password: string) {
  // TODO make a API req here or in queries?
  const access_token = "asdfg"
  setAuthStore({
    access_token,
    user: {
      firstName: "Don",
      lastName: "thrilla",
      email: "dt@yahoo.com"
    }
  })
  localStorage.setItem(ls_keys.ACCESS_TOKEN, access_token)
}

function logout() {
  localStorage.removeItem(ls_keys.ACCESS_TOKEN)
  setAuthStore({
    access_token: null,
    user: null
  })
}

function register(email: string, password: string, firstName: string, lastName: string) {
  // TODO make a API req here or in queries?
  setAuthStore({
    access_token: "asdfg",
    user: {
      firstName,
      lastName,
      email
    }
  })
}

export {
  authStore,
  login,
  logout,
  register
}