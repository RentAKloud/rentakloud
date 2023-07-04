export class RegisterReq {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export class LoginReq {
  email: string;
  password: string;
}

export type JwtPayload = {
  email: string;
  sub: number | string;
}