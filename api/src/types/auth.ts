export type RegisterReq = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export type LoginReq = {
  email: string;
  password: string;
}

export type JwtPayload = {
  email: string;
  sub: number | string;
}