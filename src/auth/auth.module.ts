import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'
import { StampService } from 'src/stamp/application/stamp.service'
import { StampRepository } from 'src/stamp/infrastructure/stamp.repository'
import { StampModule } from 'src/stamp/stamp.module'
import { AuthService } from './application/auth.service'
import { UserRepository } from './infrastructure/auth.repository'
import { JwtStrategy } from './passport/auth.jwt.strategy'
import { KakaoStrategy } from './passport/auth.kakao.strategy'
import { AuthController } from './ui/auth.controller'

@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([UserRepository, StampRepository]),
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: 'guroguro',
        signOptions: {
          expiresIn: '3600',
        },
      }),
    }),
  ],
  providers: [AuthService, KakaoStrategy, StampService],
  controllers: [AuthController],
})
export class AuthModule {}
