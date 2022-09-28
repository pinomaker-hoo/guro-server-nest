import { EntityRepository, Repository } from 'typeorm'
import { Form } from '../domain/form.entity'

@EntityRepository(Form)
export class FormRepository extends Repository<Form> {}
