import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { User } from 'src/auth/domain/user.entity'
import { Form } from '../domain/form.entity'
import { FormRepository } from '../infrastructure/form.repository'

@Injectable()
export class FormService {
  constructor(private readonly formRepository: FormRepository) {}

  async saveForm(user: User, image: string, number: string) {
    try {
      const form: Form = this.formRepository.create({ user, image, number })
      return await this.formRepository.save(form)
    } catch (err) {
      console.log(err)
      throw new HttpException('ERROR', HttpStatus.BAD_REQUEST)
    }
  }
}
