import { Injectable } from '@nestjs/common'
import { throws } from 'assert'
import { User } from 'src/auth/domain/user.entity'
import { UserRepository } from 'src/auth/infrastructure/auth.repository'
import { Stamp } from 'src/stamp/domain/stamp.entity'
import { StampRepository } from 'src/stamp/infrastructure/stamp.repository'
import { StampUser } from '../domain/stampUser.entity'
import { StampUserRepository } from '../infrastructure/stampUser.repository'

@Injectable()
export class StampUserService {
  constructor(
    private readonly stampUserRepository: StampUserRepository,
    private readonly stampRepository: StampRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async getStampList(userIdx: number) {
    const user: User = await this.userRepository.findOne({
      where: { idx: userIdx },
    })
    const data = await this.stampUserRepository.find({
      where: { user },
    })
    console.log(1, data)
    return data
  }

  async saveStamp(user: User, idx: number): Promise<StampUser> {
    const stamp: Stamp = await this.stampRepository.findOne({ where: { idx } })
    const stampUser: StampUser = this.stampUserRepository.create({
      user: user,
      stamp: stamp,
    })
    console.log(stampUser)
    return await this.stampUserRepository.save(stampUser)
  }
}
