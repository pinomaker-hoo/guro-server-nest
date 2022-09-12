import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common'
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { Response } from 'express'
import { AuthService } from '../application/auth.service'
import { User } from '../domain/user.entity'
import { NaverGuard } from '../passport/auth.naver.guard'

@Controller('auth')
@ApiTags('유저 API')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/naver')
  @HttpCode(200)
  @ApiOperation({ summary: '유저 생성 API', description: '유저를 생성한다.' })
  @ApiCreatedResponse({ description: '유저를 생성한다.', type: User })
  @UseGuards(NaverGuard)
  async naverLogin() {
    return HttpStatus.OK
  }

  @Get('/naver/callback')
  @HttpCode(200)
  @UseGuards(NaverGuard)
  async naverLoginCallback(
    @Req() req,
    @Res({ passthrough: true }) response: Response,
  ) {
    const token = await this.authService.login(req.user)
    response.set('Authorization', 'Bearer ' + token)
    response.cookie('accessToken', token, {
      httpOnly: false,
      maxAge: 24 * 60 * 60,
    })
    response.redirect('http://127.0.0.1:5173')
  }
}
