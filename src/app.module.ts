import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module'
import { typeORMConfig } from './config/typeorm.config'
import { StampModule } from './stamp/stamp.module'
import { EventController } from './event/ui/event.controller'
import { EventService } from './event/application/event.service'
import { EventModule } from './event/event.module'

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot(typeORMConfig),
    StampModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EventModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
