import { Controller, Get } from '@nestjs/common'
import * as pkg from '../package.json'

@Controller()
export class AppController {
  @Get()
  info() {
    const { name, version } = pkg

    return {
      name,
      version,
    }
  }

  @Get('/ping')
  readyz(): 'pong' {
    return 'pong'
  }
}
