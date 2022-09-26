import { EntityRepository, Repository } from 'typeorm'
import { Stamp } from '../domain/stamp.entity'

@EntityRepository(Stamp)
export class StampRepository extends Repository<Stamp> {}

// import { EntityRepository, Repository } from 'typeorm'
// import { User } from '../domain/user.entity'

// @EntityRepository(User)
// export class UserRepository extends Repository<User> {}
