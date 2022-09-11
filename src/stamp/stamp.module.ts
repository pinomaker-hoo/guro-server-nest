import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserRepository } from 'src/auth/infrastructure/auth.repository'
import { StampService } from './application/stamp.service'
import { StampRepository } from './infrastructure/stamp.repository'
import { StampController } from './ui/stamp.controller'

@Module({
  imports: [TypeOrmModule.forFeature([StampRepository, UserRepository])],
  providers: [StampService],
  controllers: [StampController],
})
export class StampModule {}
