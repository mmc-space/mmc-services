import { Controller, Get, Query } from '@nestjs/common'
import { ChatService } from './chat.service'
import { ChatDto } from './chat.dto'

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  generateChat(@Query() query: ChatDto) {
    const { prompt, parentMessageId, type = 1 } = query
    return this.chatService.generateChat(type, prompt, parentMessageId)
  }
}
