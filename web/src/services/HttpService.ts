import { API_URL } from "~/config/constants"
import { authStore } from "~/stores/auth"

export type ApiResponse<T> = Promise<{
  result: T | null
  error: {
    statusCode: string
    message: string
    error?: string
  } | null
}>

export class HttpService {
  static async get<T>(endpoint: string, queryParams?: URLSearchParams): ApiResponse<T> {
    if (queryParams) {
      endpoint += `?${queryParams}`
    }
    return wrapper(endpoint)
  }

  static async post<T>(endpoint: string, body: any): ApiResponse<T> {
    const options = {
      method: "POST",
      body: JSON.stringify(body)
    }
    return wrapper(endpoint, options)
  }

  static async put<T>(endpoint: string, body: any): ApiResponse<T> {
    const options = {
      method: "PUT",
      body: JSON.stringify(body)
    }
    return wrapper(endpoint, options)
  }

  static async patch<T>(endpoint: string, body: any): ApiResponse<T> {
    const options = {
      method: "PATCH",
      body: JSON.stringify(body)
    }
    return wrapper(endpoint, options)
  }

  static async delete<T>(endpoint: string): ApiResponse<T> {
    const options = {
      method: "DELETE"
    }
    return wrapper(endpoint, options)
  }
}

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

    if (toReturn.statusCode) {
      return { result: null, error: toReturn }
    }

    return { result: toReturn, error: null }
  } catch (err: any) {
    return { result: null, error: { statusCode: "500", message: "Could not reach RentAKloud network" } }
  }
}