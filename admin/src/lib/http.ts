import { auth } from "$lib/stores"
import { PUBLIC_API_URL as API_URL } from "$env/static/public"

export class Http {
  static async get<T>(endpoint: string, queryParams?: URLSearchParams): Promise<T> {
    if (queryParams) {
      endpoint += `?${queryParams}`
    }
    return wrapper(endpoint)
  }

  static async post<T>(endpoint: string, body: any): Promise<T> {
    const options = {
      method: "POST",
      body: JSON.stringify(body)
    }
    return wrapper(endpoint, options)
  }

  static async put<T>(endpoint: string, body: any): Promise<T> {
    const options = {
      method: "PUT",
      body: JSON.stringify(body)
    }
    return wrapper(endpoint, options)
  }

  static async patch<T>(endpoint: string, body: any): Promise<T> {
    const options = {
      method: "PATCH",
      body: JSON.stringify(body)
    }
    return wrapper(endpoint, options)
  }

  static async delete<T>(endpoint: string): Promise<T> {
    const options = {
      method: "DELETE"
    }
    return wrapper(endpoint, options)
  }
}

let jwtToken: string | undefined | null = ''
auth.subscribe(a => {
  jwtToken = a.token
})

async function wrapper(endpoint: string, options?: RequestInit) {
  const _options = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwtToken}`
    },
    ...options
  }

  const resp = await fetch(API_URL + endpoint, _options)

  let toReturn
  if (resp.headers.get("Content-Type")?.includes("application/json")) {
    toReturn = await resp.json()
  } else {
    toReturn = await resp.text()
  }

  if (resp.status >= 400) {
    throw new Error(toReturn.message || toReturn)
  }

  return toReturn
}