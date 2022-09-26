import { Injectable } from '@nestjs/common'
import { StampRepository } from '../infrastructure/stamp.repository'

@Injectable()
export class StampService {
  constructor(private readonly stampRepository: StampRepository) {}
}
