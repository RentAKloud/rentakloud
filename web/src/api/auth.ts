import { ApiResponse, HttpService } from "~/services/HttpService";
import { LoginResponse, RegisterResponse } from "~/types/auth";
import { User } from "~/types/user";

class AuthApi {
  static async register(
    email: string, password: string, firstName: string, lastName: string
  ): ApiResponse<RegisterResponse> {
    return await HttpService.post("/auth/register", {
      email,
      password,
      firstName,
      lastName,
    })
  }

  static async login(email: string, password: string): ApiResponse<LoginResponse> {
    return await HttpService.post("/auth/login", {
      email,
      password,
    })
  }

  static async getCurrentUser(): Promise<User> {
    const resp = await HttpService.get<User>("/auth/me")
    return resp.result!
  }

  static async confirmEmail(token: string) {
    return HttpService.post("/auth/confirm-email", { token })
  }

  static async requestConfirmationEmail() {
    return HttpService.post("/auth/request-confirmation-email", {})
  }

  static async requestPasswordReset(email: string) {
    return HttpService.post("/auth/request-password-reset", { email })
  }

  static async passwordReset(password: string, token: string) {
    return HttpService.post("/auth/reset-password", { password, token })
  }
}

export default AuthApi