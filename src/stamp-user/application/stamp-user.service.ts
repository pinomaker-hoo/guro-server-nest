import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { User } from 'src/auth/domain/user.entity'
import { StampService } from 'src/stamp/application/stamp.service'
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
      const stampUser: StampUser = this.stampUserRepository.create({
        user,
        stamp: await this.stampService.getStamp(stampIdx),
      })
      return await this.stampUserRepository.save(stampUser)
    } catch (err) {
      console.log(err)
      throw new HttpException('ERROR', HttpStatus.BAD_REQUEST)
    }
  }

  async getStampList(user: User): Promise<StampUser[]> {
    try {
      return await this.stampUserRepository.find({
        where: { user },
        relations: ['stamp'],
      })
    } catch (err) {
      console.log(err)
      throw new HttpException('ERROR', HttpStatus.BAD_REQUEST)
    }
  }
}
