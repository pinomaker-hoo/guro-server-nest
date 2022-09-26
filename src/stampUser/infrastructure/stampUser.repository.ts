import { EntityRepository, Repository } from 'typeorm'
import { StampUser } from '../domain/stampUser.entity'

@EntityRepository(StampUser)
export class StampUserRepository extends Repository<StampUser> {}
