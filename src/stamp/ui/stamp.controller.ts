import { Controller } from '@nestjs/common'
import { StampService } from '../application/stamp.service'

@Controller('stamp')
export class StampController {
  constructor(private readonly stampService: StampService) {}
}
