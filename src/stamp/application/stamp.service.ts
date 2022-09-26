import { Injectable } from '@nestjs/common'
import { StampKind } from '../dto/stamp.kind.dto'
import { StampRepository } from '../infrastructure/stamp.repository'

@Injectable()
export class StampService {
  constructor(private readonly stampRepository: StampRepository) {}
  async saveStampKind() {
    await this.stampRepository.save({ stampKind: StampKind.CHINA })
    await this.stampRepository.save({ stampKind: StampKind.FISH })
    await this.stampRepository.save({ stampKind: StampKind.HANRASAN })
    await this.stampRepository.save({ stampKind: StampKind.HAPPYMEAT })
    await this.stampRepository.save({ stampKind: StampKind.RICECAKE })
  }
}
