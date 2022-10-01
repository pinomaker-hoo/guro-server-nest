import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { User } from 'src/auth/domain/user.entity'
import { StampService } from 'src/stamp/application/stamp.service'
import { Stamp } from 'src/stamp/domain/stamp.entity'
import { StampUser } from '../domain/stampUser.entity'
import { StampUserRepository } from '../infrastructure/stampUser.repository'

@Injectable()
export class StampUserService {
  constructor(
    private readonly stampUserRepository: StampUserRepository,
    private readonly stampService: StampService,
  ) {}

  async saveStamp(user: User, stampIdx: number): Promise<StampUser> {
    try {
      const stamp: Stamp = await this.stampService.getStamp(stampIdx)
      const findStampUser = await this.findStamp(user, stamp)
      if (findStampUser)
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST)
      const stampUser: StampUser = this.stampUserRepository.create({
        user,
        stamp,
      })
      return await this.stampUserRepository.save(stampUser)
    } catch (err) {
      console.log(err)
      throw new HttpException('ERROR', HttpStatus.BAD_REQUEST)
    }
  }

  async findStamp(user: User, stamp: Stamp) {
    return await this.stampUserRepository.findOne({
      where: { user, stamp },
    })
  }

  async getStampList(user: User) {
    try {
      const stampUserList = await this.stampUserRepository.find({
        where: { user },
        relations: ['stamp'],
      })
      let responseData = []
      for (const item of stampUserList) {
        responseData.push(item.stamp.idx)
      }
      return responseData.sort()
    } catch (err) {
      console.log(err)
      throw new HttpException('ERROR', HttpStatus.BAD_REQUEST)
    }
  }
}
