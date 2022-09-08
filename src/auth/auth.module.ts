import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthService } from './application/auth.service'
import { UserRepository } from './infrastructure/auth.repository'
import { LocalStrategy } from './passport/auth.local.strategy'
import { AuthController } from './ui/auth.controller'

@Module({
  imports: [PassportModule, TypeOrmModule.forFeature([UserRepository])],
  providers: [AuthService],
  controllers: [AuthController, LocalStrategy],
})
export class AuthModule {}
