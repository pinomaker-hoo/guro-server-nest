import { Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common'
import { JwtGuard } from 'src/auth/passport/auth.jwt.guard'
import { StampUserService } from '../application/stampUser.service'

@Controller('stampuser')
export class StampUserController {
  constructor(private readonly stampUserService: StampUserService) {}

  @Get()
  @UseGuards(JwtGuard)
  async getMyStampList(@Req() req) {
    const { idx } = req.user
    return this.stampUserService.getStampList(idx)
  }

  @Post('/:id')
  @UseGuards(JwtGuard)
  async saveStamp(@Req() req, @Param('id') stampId: string) {
    const { user } = req
    this.stampUserService.saveStamp(user, Number(stampId))
  }
}
