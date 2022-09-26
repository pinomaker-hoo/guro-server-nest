import { EntityRepository, Repository } from 'typeorm'
import { Stamp } from '../domain/stamp.entity'

@EntityRepository(Stamp)
export class StampRepository extends Repository<Stamp> {}
