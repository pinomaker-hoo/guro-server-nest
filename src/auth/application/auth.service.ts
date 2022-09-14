import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { StampService } from 'src/stamp/application/stamp.service'
import { User } from '../domain/user.entity'
import { KakaoDto } from '../dto/Kakao.dto'
import { UserRepository } from '../infrastructure/auth.repository'

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepositoy: UserRepository,
    private readonly jwtService: JwtService,
    private readonly stampService: StampService,
  ) {}

  /** KakaoDto 받아서 User가 있으면 찾아서, 없으면 생성, 저장 후 반환 */
  async login(req: KakaoDto) {
    const findUser = await this.checkLogined(req.kakaoId)
    if (findUser) return await this.getJwtWithKakaoId(findUser.kakaoId)
    const makeUser = await this.kakaoSave(req)
    const stamp = await this.stampService.newUserMakeStamp(makeUser.idx)
    if (!stamp) new HttpException('Error', HttpStatus.BAD_REQUEST)
    return await this.getJwtWithKakaoId(makeUser.kakaoId)
  }

  /** User가 있는 지 확인 */
  async checkLogined(kakaoId: string) {
    try {
      const user = await this.userRepositoy.findOne({ where: { kakaoId } })
      return user ? user : false
    } catch (err) {
      new HttpException('유저 조회 에러', HttpStatus.BAD_REQUEST)
    }
  }

  /** PostNaverLogin를 받아서 User 생성 */
  async kakaoSave(req: KakaoDto): Promise<User> {
    try {
      const user = this.userRepositoy.create({
        name: req.name,
        email: req.email,
        kakaoId: req.kakaoId,
      })
      return await this.userRepositoy.save(user)
    } catch (err) {
      console.log(err)
      new HttpException('유저 생성 조회', HttpStatus.BAD_REQUEST)
    }
  }

  /** JWT 생성 */
  async getJwtWithKakaoId(kakaoId: string) {
    const payload = { kakaoId }
    return this.jwtService.sign(payload)
  }

  /** JWT를 이용한 User 찾기. */
  async getById(idx: number) {
    const user = await this.userRepositoy.findOne({ where: { idx } })
    if (!user) new HttpException('Not Found', HttpStatus.NOT_FOUND)
    return user
  }
}
