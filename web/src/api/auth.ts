import { HttpService } from "../services/HttpService";
import { LoginResponse } from "../types/auth";
import { User } from "../types/user";

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
    return resp.access_token
  }

  static async getCurrentUser(): Promise<User> {
    const resp = await HttpService.get<User>("/auth/me")
    return resp
  }
}

export default AuthApi