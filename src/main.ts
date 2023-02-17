import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from './app.module'
import { config, isDev } from '@/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  if (!isDev) app.setGlobalPrefix('api')

  app.useGlobalPipes(new ValidationPipe())

  await app.listen(config.port, '0.0.0.0')

  const url = await app.getUrl()
  console.info(`server listen to: ${url}`)
}

bootstrap()
