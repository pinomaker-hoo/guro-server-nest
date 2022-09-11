import { Injectable } from '@nestjs/common'
import { UserRepository } from 'src/auth/infrastructure/auth.repository'
import { StampRepository } from '../infrastructure/stamp.repository'

@Injectable()
export class StampService {
  constructor(
    private readonly stampRepository: StampRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async getStampList(userIdx: number) {
    const user = await this.findByUserIdx(userIdx)
    return await this.stampRepository.find({ user: user })
  }

  async saveStamp() {}

  async newUserMakeStamp(userIdx: number) {
    const user = await this.findByUserIdx(userIdx)
    console.log(user)
    const stamp = this.stampRepository.create({
      user: user,
      stampOne: false,
      stampTwo: false,
      stampThree: false,
      stampFour: false,
      stampFive: false,
      stampSix: false,
    })
    return await this.stampRepository.save(stamp)
  }

  async findByUserIdx(userIdx: number) {
    return await this.userRepository.findOne({ idx: userIdx })
  }
}
