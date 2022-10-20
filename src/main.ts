import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import * as cookieParser from 'cookie-parser'
import * as Sentry from '@sentry/node'
import { AppModule } from './app.module'

async function bootstrap() {
  try {
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

    Sentry.init({
      dsn: process.env.SENTRY_DSN,
    })
    console.log(process.env.NODE_SERVER_PORT)
    await app.listen(8080)
  } catch (err) {
    console.log(err)
  }
}

bootstrap()
