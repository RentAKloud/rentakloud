import { createStore } from "solid-js/store"
import AuthApi from "~/api/auth";
import { ls_keys } from "~/config/constants";
import { ApiResponseError } from "~/services/HttpService";
import { User } from "~/types/user";

const initialState = {
  access_token: localStorage.getItem(ls_keys.ACCESS_TOKEN),
  user: null,
}

const [authStore, setAuthStore] = createStore<{
  access_token: string | null;
  user: User | null;
}>(initialState)

async function login(email: string, password: string): Promise<ApiResponseError> {
  const resp = await AuthApi.login(email, password)
  if (resp.result) {
    setAuthStore({ access_token: resp.result.access_token })
    localStorage.setItem(ls_keys.ACCESS_TOKEN, resp.result.access_token)
    return null
  }

  return resp.error
}

function logout() {
  localStorage.removeItem(ls_keys.ACCESS_TOKEN)
  setAuthStore({
    access_token: null,
    user: null
  })
}

async function register(email: string, password: string, firstName: string, lastName: string) {
  const { result, error } = await AuthApi.register(email, password, firstName, lastName)
  if (error) {
    return error
  }

  if (result?.access_token) {
    setAuthStore({ access_token: result.access_token })
    localStorage.setItem(ls_keys.ACCESS_TOKEN, result.access_token)
  }
}

async function getUserProfile() {
  try {
    const resp = await AuthApi.getCurrentUser()
    setAuthStore({ user: new User(resp) })
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