import { createStore } from "solid-js/store"
import AuthApi from "../api/auth";
import { ls_keys } from "../config/constants";
import { User } from "../types/user";

const initialState = {
  access_token: localStorage.getItem(ls_keys.ACCESS_TOKEN),
  user: null,
  errors: null,
}

const [authStore, setAuthStore] = createStore<{
  access_token: string | null;
  user: User | null;
  errors: any;
}>(initialState)

async function login(email: string, password: string) {
  try {
    const resp = await AuthApi.login(email, password)
    setAuthStore({ access_token: resp })
    localStorage.setItem(ls_keys.ACCESS_TOKEN, resp)
  } catch (err) {
    setAuthStore({
      errors: err
    })
  }
}

function logout() {
  localStorage.removeItem(ls_keys.ACCESS_TOKEN)
  setAuthStore({
    access_token: null,
    user: null
  })
}

async function register(email: string, password: string, firstName: string, lastName: string) {
  try {
    const resp = await AuthApi.register(email, password, firstName, lastName)
    setAuthStore({ access_token: resp })
  } catch (err) {
    setAuthStore({
      errors: err
    })
  }
}

async function getUserProfile() {
  try {
    const resp = await AuthApi.getCurrentUser()
    setAuthStore({ user: resp })
  } catch (err) {
    console.log(err)
  }
}

export {
  authStore,
  login,
  logout,
  register,
  getUserProfile,
}