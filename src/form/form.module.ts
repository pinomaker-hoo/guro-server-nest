import { Module } from '@nestjs/common'
import { FormService } from './application/form.service'
import { FormController } from './ui/form.controller'

@Module({
  providers: [FormService],
  controllers: [FormController],
})
export class FormModule {}
