import { API_URL } from "../config/constants"
import { authStore } from "../stores/auth"
import { NotificationService } from "./NotificationService"

export type ApiResponse<T> = Promise<{
  result: T | null
  error: {
    statusCode: string
    message: string
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

// In case of multiple failures of same kind, we don't spam error messages
// TODO not HttpService's job to display error notifications
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

    lastFailure = null
    return { result: toReturn, error: null }
  } catch (err: any) {
    if (lastFailure) {
      NotificationService.error("Could not reach RentaKloud network.")
    }
    lastFailure = err.message

    return { result: null, error: { statusCode: "500", message: "Could not reach RentAKloud network" } }
  }
}