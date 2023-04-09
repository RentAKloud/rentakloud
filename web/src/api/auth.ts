import { API_URL } from "../config/constants";
import { HttpService } from "../services/HttpService";
import { LoginResponse } from "../types/auth";

class AuthApi {
  static async register(email: string, password: string, firstName: string, lastName: string): Promise<string> {
    const resp = await HttpService.post<string>("/auth/register", {
      email,
      password,
      firstName,
      lastName,
    })

    return resp
  }

  static async login(email: string, password: string): Promise<string> {
    const resp = await HttpService.post<LoginResponse>("/auth/login", {
      email,
      password,
    })
console.log("res[", resp)
    return resp.access_token
  }
}

export default AuthApi