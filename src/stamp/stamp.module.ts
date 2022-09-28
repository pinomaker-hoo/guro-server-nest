import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { StampService } from './application/stamp.service'
import { StampRepository } from './infrastructure/stamp.repository'
import { StampController } from './ui/stamp.controller'

@Module({
  imports: [TypeOrmModule.forFeature([StampRepository])],
  providers: [StampService],
  controllers: [StampController],
  exports: [StampService],
})
export class StampModule {}
