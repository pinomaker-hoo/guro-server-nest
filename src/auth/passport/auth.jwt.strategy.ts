import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-jwt'
import { AuthService } from '../application/auth.service'
import { Payload } from '../dto/Req.payload.dto'

@Injectable()
export class NaverStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: 'vW2cEuaxm94WBYA9lAcY',
      clientSecret: 'Op_nPVRVZv',
      callbackURL: 'http://localhost:3001/auth/naver/callback',
    })
  }
  async validate(accessToken, refreshToken, profile, done) {
    console.log(profile)
    const payload = {
      user: {
        number: profile.number,
        name: profile.emails[0].value,
        naverId: profile.id,
      },
      accessToken: accessToken,
    }
    done(null, payload)
  }
}
