import { EntityRepository, Repository } from 'typeorm'
import { Event } from '../domain/event.entity'

@EntityRepository(Event)
export class EvnetRepository extends Repository<Event> {}
