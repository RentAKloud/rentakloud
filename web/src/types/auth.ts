export type LoginForm = {
  email: string
  password: string
}

export type LoginResponse = {
  access_token: string;
}

export type RegisterResponse = LoginResponse