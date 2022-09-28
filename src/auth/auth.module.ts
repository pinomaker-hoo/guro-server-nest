import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthService } from './application/auth.service'
import { UserRepository } from './infrastructure/auth.repository'
import { JwtStrategy } from './passport/auth.jwt.strategy'
import { KakaoStrategy } from './passport/auth.kakao.strategy'
import { AuthController } from './ui/auth.controller'

@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([UserRepository]),
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get('JWT_EXPIRESIN'),
        },
      }),
    }),
  ],
  providers: [AuthService, KakaoStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
