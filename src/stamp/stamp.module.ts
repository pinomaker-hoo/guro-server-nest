import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthService } from 'src/auth/application/auth.service'
import { UserRepository } from 'src/auth/infrastructure/auth.repository'
import { JwtStrategy } from 'src/auth/passport/auth.jwt.strategy'
import { StampService } from './application/stamp.service'
import { StampRepository } from './infrastructure/stamp.repository'
import { StampController } from './ui/stamp.controller'

@Module({
  imports: [TypeOrmModule.forFeature([StampRepository, UserRepository])],
  providers: [
    StampService,
    JwtStrategy,
    AuthService,
    ConfigService,
    JwtService,
  ],
  controllers: [StampController],
})
export class StampModule {}
