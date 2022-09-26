import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserRepository } from 'src/auth/infrastructure/auth.repository'
import { StampService } from 'src/stamp/application/stamp.service'
import { StampRepository } from 'src/stamp/infrastructure/stamp.repository'
import { StampModule } from 'src/stamp/stamp.module'
import { StampUserService } from './application/stampUser.service'
import { StampUserRepository } from './infrastructure/stampUser.repository'
import { StampUserController } from './ui/stampUser.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      StampUserRepository,
      UserRepository,
      StampRepository,
    ]),
  ],
  providers: [StampUserService, UserRepository, StampRepository],
  controllers: [StampUserController],
})
export class StampUserModule {}
