import { IsEmail, IsStrongPassword, Min } from "class-validator";

export class RegisterReq {
  @IsEmail()
  email: string;

  @IsStrongPassword()
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