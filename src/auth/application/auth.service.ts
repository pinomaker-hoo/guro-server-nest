import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { User } from '../domain/user.entity'
import { Payload } from '../dto/Req.payload.dto'
import { UserRepository } from '../infrastructure/auth.repository'

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepositoy: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async naverSave(req: Payload): Promise<User> {
    const user = this.userRepositoy.create({
      name: req.name,
      nummber: '123',
      naverId: req.naverId,
    })
    return await this.userRepositoy.save(user)
  }

  /**
   * Payload를 받아서 User가 있으면 찾아서, 없으면 생성, 저장 후 반환
   * @param req
   * @returns {User}
   */
  async login(req: Payload) {
    const findUser = await this.checkLogined(req.naverId)
    if (findUser) return findUser
    const makeUser = await this.naverSave(req)
    return await this.getJwtWithNaverId(makeUser.naverId)
  }

  async getJwtWithNaverId(naverId: string) {
    const payload = { naverId }
    const token = this.jwtService.sign(payload)
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=3600`
  }

  async checkLogined(naverId: string) {
    const user = await this.userRepositoy.findOne({ where: { naverId } })
    return user ? user : false
  }
}
