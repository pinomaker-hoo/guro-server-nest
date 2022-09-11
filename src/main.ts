import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { setupSwagger } from './util/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  app.useGlobalPipes(new ValidationPipe())
  setupSwagger(app)
  await app.listen(3001)
}
bootstrap()
