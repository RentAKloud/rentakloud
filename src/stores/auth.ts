import { createStore } from "solid-js/store"
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
  setAuthStore({
    access_token: "asdfg",
    user: {
      firstName: "Don",
      lastName: "thrilla",
      email: "dt@yahoo.com"
    }
  })
}

function logout() {
  setAuthStore({
    access_token: null,
    user: null
  })
}

export {
  authStore,
  login,
  logout
}