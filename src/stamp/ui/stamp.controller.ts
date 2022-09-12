import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  UseGuards,
} from '@nestjs/common'
import { JwtGuard } from 'src/auth/passport/auth.jwt.guard'
import { StampService } from '../application/stamp.service'

@Controller('stamp')
export class StampController {
  constructor(private readonly stampService: StampService) {}

  @Get()
  @UseGuards(JwtGuard)
  async getStampList(
    @Body(new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
    idx: number,
  ) {
    return await this.stampService.getStampList(idx)
  }

  @Patch('/:id')
  @UseGuards(JwtGuard)
  async addStamp(
    @Body(new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
    idx: number,
  ) {}

  @Get('/test')
  async test() {
    return await this.stampService.newUserMakeStamp(9)
  }
}
