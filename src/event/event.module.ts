import { Module } from '@nestjs/common'
import { EventService } from './application/event.service'
import { EventController } from './ui/event.controller'

@Module({
  imports: [],
  providers: [EventService],
  controllers: [EventController],
})
export class EventModule {}
