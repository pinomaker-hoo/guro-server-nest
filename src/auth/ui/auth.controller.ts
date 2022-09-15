import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common'
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { Response } from 'express'
import { AuthService } from '../application/auth.service'
import { User } from '../domain/user.entity'
import { KakaoGuard } from '../passport/auth.kakao.guard'

@Controller('auth')
@ApiTags('유저 API')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  async checkServer() {
    return 'SERVER ON!'
  }

  @Get('/kakao')
  @HttpCode(200)
  @ApiOperation({ summary: '유저 생성 API', description: '유저를 생성한다.' })
  @ApiCreatedResponse({ description: '유저를 생성한다.', type: User })
  @UseGuards(KakaoGuard)
  async kakaoLogin() {
    return HttpStatus.OK
  }

  @Get('/kakao/callback')
  @HttpCode(200)
  @UseGuards(KakaoGuard)
  async kakaoLoginCallback(
    @Req() req,
    @Res({ passthrough: true }) response: Response,
  ) {
    const token = await this.authService.login(req.user)
    response.header('Access-Control-Allow-Origin', '*')
    response.set('Authorization', 'Bearer ' + token)
    response.cookie('accessToken', token, {
      maxAge: 24 * 60 * 60,
      sameSite: 'lax',
    })
    response.redirect('http://localhost:5173')
  }
}
