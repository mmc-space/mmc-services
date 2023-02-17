import type { Observable } from 'rxjs'
import type {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common'
import { Injectable, Logger } from '@nestjs/common'
import { map } from 'rxjs/operators'

import { isDev } from '@/config'

export interface Response<T> {
  data: T
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  private readonly logger = new Logger('Response')

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        if (isDev) {
          const request = context.switchToHttp().getRequest()
          const logFormat = `${request.method} -> ${request.url}`
          this.logger.debug(logFormat)
        }
        return data
      }),
    )
  }
}
