import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module'
import { typeORMConfig } from './config/typeorm.config'
import { FormModule } from './form/form.module'
import { StampModule } from './stamp/stamp.module'
import { StampUserModule } from './stampUser/stampUser.module'

@Module({
  imports: [
    AuthModule,
    FormModule,
    TypeOrmModule.forRoot(typeORMConfig),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    StampModule,
    StampUserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
