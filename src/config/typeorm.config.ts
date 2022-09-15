import { ConfigService } from '@nestjs/config'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'

// export const typeORMConfig: TypeOrmModuleOptions = {
//   type: 'mysql', //Database 설정
//   host: '210.90.136.10',
//   port: Number(process.env.DB_PORT),
//   username: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   entities: ['dist/**/*.entity.js'],
//   synchronize: true,
// }
export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'mysql', //Database 설정
  host: '210.90.136.10',
  port: 3306,
  username: 'pino',
  password: 'qwer1595',
  database: 'guro',
  entities: ['dist/**/*.entity.js'],
  synchronize: true,
}
