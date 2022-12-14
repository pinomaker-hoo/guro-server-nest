import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-kakao'

export class KakaoStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      clientID: '35925e2699a55c7bffbb6e051da01a40',
      callbackURL: 'https://www.pinodev.shop/auth/kakao/callback',
    })
  }

  async validate(accessToken, refreshToken, profile, done) {
    const profileJson = profile._json
    const kakao_account = profileJson.kakao_account
    const payload = {
      name: kakao_account.profile.nickname,
      kakaoId: profileJson.id,
      email:
        kakao_account.has_email && !kakao_account.email_needs_agreement
          ? kakao_account.email
          : 'null',
    }
    done(null, payload)
  }
}
