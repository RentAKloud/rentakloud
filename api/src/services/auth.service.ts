import { Injectable } from '@nestjs/common';
import { compareSync, hashSync, genSaltSync } from "bcrypt";
import { UsersService } from './users.service';
import { JwtPayload, RegisterReq } from 'src/types/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class AuthService {
  constructor(
    private users: UsersService,
    private jwtService: JwtService,
    private ee: EventEmitter2,
  ) { }

  async validateUser(email: string, password: string) {
    const user = await this.users.user({ email }, true)
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

  async register(data: RegisterReq) {
    const saltRounds = 14
    const salt = genSaltSync(saltRounds)
    data.password = hashSync(data.password, salt)

    const user = await this.users.createUser(data)
    const payload: JwtPayload = { email: user.email, sub: user.id }
    const jwt = this.jwtService.sign(payload)

    this.ee.emit('user.created', user, jwt)

    return {
      access_token: jwt
    }
  }
}
