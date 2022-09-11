import { EntityRepository, Repository } from 'typeorm'
import { Stamp } from '../domain/Stmap.entity'

@EntityRepository(Stamp)
export class StampRepository extends Repository<Stamp> {}
