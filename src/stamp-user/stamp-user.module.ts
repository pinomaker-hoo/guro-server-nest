import { Module } from '@nestjs/common'
import { StampUserController } from './ui/stamp-user.controller'
import { StampUserService } from './application/stamp-user.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { StampUserRepository } from './infrastructure/stampUser.repository'
import { StampService } from 'src/stamp/application/stamp.service'
import { StampRepository } from 'src/stamp/infrastructure/stamp.repository'
import { StampModule } from 'src/stamp/stamp.module'

@Module({
  imports: [TypeOrmModule.forFeature([StampUserRepository]), StampModule],
  controllers: [StampUserController],
  providers: [StampUserService],
})
export class StampUserModule {}
