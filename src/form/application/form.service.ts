import { Injectable } from '@nestjs/common'
import { User } from 'src/auth/domain/user.entity'
import { FormRepository } from '../infrastructure/form.repository'

@Injectable()
export class FormService {
  constructor(private readonly formRepository: FormRepository) {}

  async saveForm(user: User, image: string, number: string) {
    try {
      const form = this.formRepository.create({ user, image, number })
      console.log(form)
      return await this.formRepository.save(form)
    } catch (err) {
      console.log(err)
    }
  }
}
