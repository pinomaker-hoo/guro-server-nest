import { Controller } from '@nestjs/common'
import { StampUserService } from '../application/stampUser.service'

@Controller('stampuser')
export class StampUserController {
  constructor(private readonly stampUserService: StampUserService) {}
}
