import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthService } from './application/auth.service'
import { UserRepository } from './infrastructure/auth.repository'
import { NaverStrategy } from './passport/auth.naver.strategy'
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
        secret: 'guroguro',
        signOptions: {
          expiresIn: '3600',
        },
      }),
    }),
  ],
  providers: [AuthService, NaverStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
