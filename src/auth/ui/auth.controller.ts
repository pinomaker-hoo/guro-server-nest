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

  @Get('check')
  @ApiOperation({
    summary: '서버 체크 API',
    description: '서버가 열려있는 지 확인하는 API',
  })
  @ApiCreatedResponse({ description: 'SERVER ON!' })
  async checkServer() {
    return 'SERVER ON!'
  }

  @Get('/kakao')
  @HttpCode(200)
  @UseGuards(KakaoGuard)
  @ApiOperation({ summary: '유저 생성 API', description: '유저를 생성한다.' })
  @ApiCreatedResponse({ description: '유저를 생성한다.', type: User })
  async kakaoLogin() {
    return HttpStatus.OK
  }

  @Get('/kakao/callback')
  @HttpCode(200)
  @UseGuards(KakaoGuard)
  @ApiOperation({
    summary: '카카오 정보 추출 API',
    description: '서버에서 요청하는 API, 클라는 사용 X',
  })
  @ApiCreatedResponse({
    description: '유저 IDX로 만든 JWT를 쿠키에 담아 메인창으로 Redirect함.',
  })
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
