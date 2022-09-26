import { Controller, Get } from '@nestjs/common'
import { StampService } from '../application/stamp.service'

@Controller('stamp')
export class StampController {
  constructor(private readonly stampService: StampService) {}
  @Get()
  async saveStampKind() {
    return this.stampService.saveStampKind()
  }
}
