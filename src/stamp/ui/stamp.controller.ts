import { Body, Controller, Get, Param, Req, UseGuards } from '@nestjs/common'
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger'
import { JwtGuard } from 'src/auth/passport/auth.jwt.guard'
import { StampService } from '../application/stamp.service'
import { Stamp } from '../domain/stmap.entity'

@Controller('stamp')
@ApiTags('도장 API')
export class StampController {
  constructor(private readonly stampService: StampService) {}

  @Get()
  @UseGuards(JwtGuard)
  @ApiOperation({
    summary: '유저 도장판 조회 API',
    description: '유저의 idx를 JWT로 추출하여 사용',
  })
  @ApiCreatedResponse({ description: '유저의 도장판을 리턴한다.', type: Stamp })
  async getStampList(@Body() post, @Req() req) {
    return await this.stampService.getStampList(req.user.idx)
  }

  @Get('/:idx')
  @UseGuards(JwtGuard)
  @ApiOperation({
    summary: '도장 찍기 API',
    description:
      'Url Param으로 어떤 도장인지, JWT(Cookie)로 어떤 유저인지 추출하여 업데이트',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'URL Params로 어떤 도장을 찍는 지 보냄.',
  })
  @ApiCreatedResponse({ description: '성공 여부 반환' })
  async addStamp(@Param('idx') idx, @Req() req) {
    return await this.stampService.updateStamp(req.user.idx, Number(idx))
  }
}
