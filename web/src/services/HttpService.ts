import { API_URL } from "../config/constants"
import { authStore } from "../stores/auth"

export class HttpService {
  static async get<T>(endpoint: string): Promise<T> {
    const jwtToken = authStore.access_token
    const resp = await fetch(API_URL + endpoint, {
      headers: {
        "Authorization": `Bearer ${jwtToken}`
      }
    })

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

  static async post<T>(endpoint: string, body: any): Promise<T> {
    const resp = await fetch(API_URL + endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })

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
}