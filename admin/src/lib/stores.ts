import { writable } from "svelte/store";


type User = {
  email: string
  firstName: string
  lastName: string
  type: UserType
}

export enum UserType {
  Admin = 'Admin',
  User = 'User',
  Staff = 'Staff'
}

type AuthState = {
  user?: User
  token?: string | null
  isLoggedIn: () => boolean
}

export const auth = writable<AuthState>({
  user: undefined,
  token: localStorage.getItem('access_token'),
  isLoggedIn() {
    return !!this.token
  }
})