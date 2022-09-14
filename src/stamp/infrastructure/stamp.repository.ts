import { EntityRepository, Repository } from 'typeorm'
import { Stamp } from '../domain/stmap.entity'

@EntityRepository(Stamp)
export class StampRepository extends Repository<Stamp> {}
