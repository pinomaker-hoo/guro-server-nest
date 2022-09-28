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
import { ApiResponse } from 'src/common/response'
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
  @ApiOperation({
    summary: '유저 생성 API',
    description:
      '프론트에서는 a 태그를 이용하여 해당 API에 요청 보내면 로그인 처리 후, 토큰을 담아 localhost:3000으로 리다이렉트',
  })
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
  async kakaoLoginCallback(@Req() req, @Res() response: Response) {
    const token = await this.authService.login(req.user)
    response.cookie('accessToken', token, {
      expires: new Date(Date.now() + 86400e3),
      sameSite: 'lax',
    })
    response.redirect('http://localhost:3000')
  }
}
