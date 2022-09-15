import { Injectable } from '@nestjs/common'
import { FormRepository } from '../infrastructure/form.repository'

@Injectable()
export class FormService {
  constructor(private readonly formRepository: FormRepository) {}
}
