import { NestFactory } from '@nestjs/core'
import { Logger, ValidationPipe } from '@nestjs/common'
import helmet from 'helmet'

import * as pkg from '../package.json'
import { AppModule } from './app.module'
import { ResponseInterceptor } from '@/common/interceptors/response.interceptors'
import { AllExceptionsFilter } from '@/common/exceptions/base.exception.filter'
import { config } from '@/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.setGlobalPrefix('api')

  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalInterceptors(new ResponseInterceptor())
  app.useGlobalFilters(new AllExceptionsFilter())

  app.use(helmet())

  await app.listen(config.port, '0.0.0.0')

  const logger = new Logger(pkg.name)
  const url = await app.getUrl()
  logger.log(`server listen to: ${url}`)
}

bootstrap()
