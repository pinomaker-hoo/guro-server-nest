import { Injectable } from '@nestjs/common'
import { User } from 'src/auth/domain/user.entity'
import { StampUser } from '../domain/stampUser.entity'
import { StampUserRepository } from '../infrastructure/stampUser.repository'

@Injectable()
export class StampUserService {
  constructor(private readonly stampUserRepository: StampUserRepository) {}

  async getStampList(userIdx: number): Promise<StampUser[]> {
    return await this.stampUserRepository.find({ where: { user: userIdx } })
  }

  async saveStamp(user: User, idx: number) {}
}
