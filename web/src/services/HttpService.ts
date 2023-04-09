import { API_URL } from "../config/constants"

export class HttpService {
  static async get<T>(endpoint: string): Promise<T | string> {
    const resp = await fetch(API_URL + endpoint)

    if (resp.headers.get("Content-Type")?.includes("application/json")) {
      return await resp.json()
    }

    return await resp.text()
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