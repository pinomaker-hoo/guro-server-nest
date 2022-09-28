import { Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common'
import { JwtGuard } from 'src/auth/passport/auth.jwt.guard'
import { ApiResponse } from 'src/common/response'
import { StampUserService } from '../application/stamp-user.service'
import { StampUser } from '../domain/stampUser.entity'

@Controller('stamp-user')
export class StampUserController {
  constructor(private readonly stampUserService: StampUserService) {}

  @Get()
  @UseGuards(JwtGuard)
  async getMyStampList(@Req() req) {
    const { user } = req
    const response: StampUser[] = await this.stampUserService.getStampList(user)
    return ApiResponse.of({
      data: response,
      message: 'success find stamp-user-List all by user',
      statusCode: 200,
    })
  }

  @Post('/:id')
  @UseGuards(JwtGuard)
  async saveStamp(@Req() req, @Param('id') stampId: string) {
    const { user } = req
    const response: StampUser = await this.stampUserService.saveStamp(
      user,
      Number(stampId),
    )
    return ApiResponse.of({
      data: response,
      message: 'success save stamp-user',
      statusCode: 200,
    })
  }
}
