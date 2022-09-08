import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-naver'
import { AuthService } from '../application/auth.service'

@Injectable()
export class NaverStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: 'mfvgn8HnVR6pfLot_vbg',
      clientSecret: '6nuPvrSxDN',
      callbackURL: 'http://localhost:8003/auth/naver/callback',
    })
  }
  async validate(accessToken, refreshToken, profile, done) {
    // const profileJson = profile._json
    // const kakao_account = profileJson.kakao_account
    // // const payload: KakaoDto = {
    // //   name: kakao_account.profile.nickname,
    // //   kakaoId: profileJson.id,
    // //   email:
    // //     kakao_account.has_email && !kakao_account.email_needs_agreement
    // //       ? kakao_account.email
    // //       : null,
    // //   provider: 'kakao',
    // // }
    // done(null, payload)
  }
}
