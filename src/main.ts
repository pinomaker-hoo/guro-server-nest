import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import * as cookieParser from 'cookie-parser'
import * as Sentry from '@sentry/node'
import { AppModule } from './app.module'
import { setupSwagger } from './util/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  })
  app.useGlobalPipes(new ValidationPipe())
  app.use(cookieParser())
  setupSwagger(app)
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
  })
  await app.listen(process.env.NODE_SERVER_PORT || 443)
}

bootstrap()
