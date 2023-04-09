import { Injectable } from '@nestjs/common';
import { compareSync, hashSync, genSaltSync } from "bcrypt";
import { UsersService } from './users.service';
import { JwtPayload, RegisterReq } from 'src/types/auth';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private users: UsersService,
    private jwtService: JwtService,
  ) { }

  async validateUser(email: string, password: string) {
    const user = await this.users.user({ email })
    if (user && compareSync(password, user.password)) {
      const { password, ...result } = user
      return result
    }

    return null
  }

  async login(user: User) {
    const payload: JwtPayload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  register(data: RegisterReq) {
    const saltRounds = 14
    const salt = genSaltSync(saltRounds)
    data.password = hashSync(data.password, salt)

    return this.users.createUser(data)
  }
}
