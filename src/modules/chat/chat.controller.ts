import { Controller, Get, Query } from '@nestjs/common'
import { ChatService } from './chat.service'
import { ChatDto } from './chat.dto'

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  generateChat(@Query() query: ChatDto) {
    return this.chatService.generateChat(query.prompt)
  }
}
