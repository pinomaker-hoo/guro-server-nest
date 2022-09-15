import { Controller } from '@nestjs/common'
import { FormService } from '../application/form.service'

@Controller('form')
export class FormController {
  constructor(private readonly formService: FormService) {}
}
