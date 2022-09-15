import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { UserRepository } from 'src/auth/infrastructure/auth.repository'
import { Stamp } from '../domain/stmap.entity'
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
      return await this.stampRepository.findOne({ user: user })
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

  /** userIdx와 stampIdx를 이용한 Stamp 수정 */
  async updateStamp(userIdx: number, stampIdx: number) {
    try {
      const stamp: Stamp = await this.getStampList(userIdx)

      switch (stampIdx) {
        case 1:
          return (
            stamp.stampOne === false &&
            (await this.stampRepository.update(stamp.idx, { stampOne: true }))
          )
        case 2:
          return (
            stamp.stampTwo === false &&
            (await this.stampRepository.update(stamp.idx, {
              stampTwo: true,
            }))
          )
        case 3:
          return (
            stamp.stampThree === false &&
            (await this.stampRepository.update(stamp.idx, { stampThree: true }))
          )
        case 4:
          return (
            stamp.stampFour === false &&
            (await this.stampRepository.update(stamp.idx, { stampFour: true }))
          )
        case 5:
          return (
            stamp.stampFive === false &&
            (await this.stampRepository.update(stamp.idx, { stampFive: true }))
          )
        case 6:
          return (
            stamp.stampSix === false &&
            (await this.stampRepository.update(stamp.idx, { stampSix: true }))
          )
      }
    } catch (err) {
      throw new HttpException('BAD REQUEST', HttpStatus.BAD_REQUEST)
    }
  }
}
