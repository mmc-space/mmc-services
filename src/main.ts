import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import config from '@/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.listen(config.port, '0.0.0.0')

  const url = await app.getUrl()
  console.info(`server listen to: ${url}`)
}

bootstrap()
