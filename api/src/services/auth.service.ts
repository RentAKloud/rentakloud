import { Injectable } from '@nestjs/common';
import { compareSync, hashSync, genSaltSync } from "bcrypt";
import { UsersService } from './users.service';
import { RegisterReq } from 'src/types/auth';

@Injectable()
export class AuthService {
  constructor(private users: UsersService) { }

  async validateUser(email: string, password: string) {
    const user = await this.users.user({ email })
    if (user && compareSync(password, user.password)) {
      const { password, ...result } = user
      return result
    }

    return null
  }

  register(data: RegisterReq) {
    const saltRounds = 14
    const salt = genSaltSync(saltRounds)
    data.password = hashSync(data.password, salt)

    return this.users.createUser(data)
  }
}
