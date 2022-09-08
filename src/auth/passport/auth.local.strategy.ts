import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { AuthService } from '../application/auth.service'
import { User } from '../domain/user.entity'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'name',
      passwordField: 'pw',
    })
  }
  async validate(email: string, pw: string): Promise<User> {
    return await this.authService.login(email, pw)
  }
}
