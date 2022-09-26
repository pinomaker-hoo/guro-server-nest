import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { StampUserService } from './application/stampUser.service'
import { StampUserRepository } from './infrastructure/stampUser.repository'
import { StampUserController } from './ui/stampUser.controller'

@Module({
  imports: [TypeOrmModule.forFeature([StampUserRepository])],
  providers: [StampUserService],
  controllers: [StampUserController],
})
export class StampUserModule {}
