import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common'
import { JwtGuard } from 'src/auth/passport/auth.jwt.guard'
import { StampService } from '../application/stamp.service'

@Controller('stamp')
export class StampController {
  constructor(private readonly stampService: StampService) {}

  @Get()
  @UseGuards(JwtGuard)
  async getStampList(@Body() post, @Req() req) {
    return await this.stampService.getStampList(req.user.idx)
  }

  @Get('/:idx')
  @UseGuards(JwtGuard)
  async addStamp(@Param('idx') idx, @Req() req) {
    return await this.stampService.updateStamp(req.user.idx, Number(idx))
  }
}
