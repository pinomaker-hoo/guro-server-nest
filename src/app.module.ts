import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module'
import { typeORMConfig } from './config/typeorm.config'
import { StampModule } from './stamp/stamp.module'
import { FormModule } from './form/form.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot(typeORMConfig),
    StampModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    FormModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
