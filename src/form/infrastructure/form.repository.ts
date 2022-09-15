import { EntityRepository, Repository } from 'typeorm'
import { Form } from '../domainn/form.entity'

@EntityRepository(Form)
export class FormRepository extends Repository<Form> {}
