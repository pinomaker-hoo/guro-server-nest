import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common'
import { throws } from 'assert'
import { AuthService } from '../application/auth.service'
import { User } from '../domain/user.entity'
import ReqWithUser from '../dto/passport.req.dto'
import { CreateUserDto } from '../dto/user.create.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async save(req: CreateUserDto): Promise<User> {
    return this.authService.save(req)
  }

  @UseGuards()
  @Post('/login')
  async login(@Req() req: ReqWithUser, @Res() res) {
    const { user } = req
    return res.json(user)
  }
}
