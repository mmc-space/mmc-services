import { Controller, Get, Query } from '@nestjs/common'
import { ChatService } from './chat.service'
import { ChatDto } from './chat.dto'

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {
    this.chatService.initChatgpt()
  }

  @Get()
  generateChat(@Query() query: ChatDto) {
    const { prompt, parentMessageId } = query
    return this.chatService.generateChat(prompt, parentMessageId)
  }
}
