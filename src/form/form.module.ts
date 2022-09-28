import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { FormService } from './application/form.service'
import { FormRepository } from './infrastructure/form.repository'
import { FormController } from './ui/form.controller'

@Module({
  imports: [TypeOrmModule.forFeature([FormRepository])],
  providers: [FormService],
  controllers: [FormController],
})
export class FormModule {}
