import { Injectable } from '@nestjs/common'
import { StampUserRepository } from '../infrastructure/stampUser.repository'

@Injectable()
export class StampUserService {
  constructor(private readonly stampUserRepository: StampUserRepository) {}
}
