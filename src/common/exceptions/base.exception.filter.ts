import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common'
import type { Request, Response } from 'express'
import { Catch, HttpException, HttpStatus, Logger } from '@nestjs/common'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger('AllExceptionsFilter')

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    const status
      = exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR

    const logFormat = `${request.method} -> ${request.url}`
    this.logger.error(JSON.stringify(logFormat))

    // 非 HTTP 标准异常的处理。
    response.status(status).send({
      code: status,
      path: request.url,
      message: `Service Error: ${exception}`,
    })
  }
}
