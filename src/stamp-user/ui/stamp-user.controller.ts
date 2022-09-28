import { Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common'
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { JwtGuard } from 'src/auth/passport/auth.jwt.guard'
import { ApiResponse } from 'src/common/response'
import { StampUserService } from '../application/stamp-user.service'
import { StampUser } from '../domain/stampUser.entity'

@Controller('stamp-user')
@ApiTags('스탬프 API')
export class StampUserController {
  constructor(private readonly stampUserService: StampUserService) {}

  @Get()
  @UseGuards(JwtGuard)
  @ApiOperation({
    summary: '유저 스탬프 조회',
    description: 'JWT를 이용하여 유저 정보 조회 후, 유저가 보유한 도장 조회',
  })
  @ApiCreatedResponse({ description: '유저의 도장', type: StampUser })
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
  @ApiOperation({
    summary: '유저 스탬프 생성',
    description:
      'idx는 가게의 idx 1:중국성, 2: 장어, 3: 한라산도새기, 4:고기가 맛있는 집, 5:떡볶이',
  })
  @ApiCreatedResponse({ description: '생성된 도장', type: StampUser })
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
