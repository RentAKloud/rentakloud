import { API_URL } from "../config/constants"
import { authStore } from "../stores/auth"
import { NotificationService } from "./NotificationService"

export class HttpService {
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

  static async delete<T>(endpoint: string): Promise<T> {
    const options = {
      method: "DELETE"
    }
    return wrapper(endpoint, options)
  }
}

// In case of multiple failures of same kind, we don't spam error messages
let lastFailure: string | null = null

async function wrapper(endpoint: string, options?: RequestInit) {
  const jwtToken = authStore.access_token
  const _options = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwtToken}`
    },
    ...options
  }

  try {
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

    lastFailure = null
    return toReturn
  } catch (err: any) {
    if (lastFailure) {
      NotificationService.error("Could not reach RentaKloud network.")
    }
    lastFailure = err.message
  }
}