import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { UserRepository } from 'src/auth/infrastructure/auth.repository'
import { StampRepository } from '../infrastructure/stamp.repository'

@Injectable()
export class StampService {
  constructor(
    private readonly stampRepository: StampRepository,
    private readonly userRepository: UserRepository,
  ) {}

  /** userIdx를 이용한 Stamp List 조회 */
  async getStampList(userIdx: number) {
    try {
      const user = await this.findUserByUserIdx(userIdx)
      return await this.stampRepository.find({ user: user })
    } catch (err) {
      new HttpException('Error', HttpStatus.BAD_REQUEST)
    }
  }

  /** 회원가입 시 기본 도장 생성 */
  async newUserMakeStamp(userIdx: number) {
    try {
      const user = await this.findUserByUserIdx(userIdx)
      const stamp = this.stampRepository.create({
        stampOne: false,
        stampTwo: false,
        stampThree: false,
        stampFour: false,
        stampFive: false,
        stampSix: false,
        user: user,
      })
      return await this.stampRepository.save(stamp)
    } catch (err) {
      new HttpException('Error', HttpStatus.BAD_REQUEST)
    }
  }

  /** userIdx를 이용한 User 조회 */
  async findUserByUserIdx(userIdx: number) {
    try {
      return await this.userRepository.findOne({ idx: userIdx })
    } catch (err) {
      new HttpException('Error', HttpStatus.BAD_REQUEST)
    }
  }

  /** userIdx와 stampIdx를 이용한 Stamp 조회 */
  async updateStamp(userIdx: number, stampIdx: number) {
    const stamp = await this.getStampList(userIdx)
    console.log(stamp)
    switch (stampIdx) {
      case 1:
        break

      case 2:
        break

      case 3:
        break

      case 4:
        break
      case 5:
        break

      case 6:
        break

      default:
        break
    }
  }
}
