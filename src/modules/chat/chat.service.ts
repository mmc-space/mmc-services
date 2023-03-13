import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ChatGPTAPI } from 'chatgpt'

@Injectable()
export class ChatService {
  constructor(private configService: ConfigService) {}

  async generateChat(prompt: string, parentMessageId?: string) {
    // const { ChatGPTAPI } = await importDynamic('chatgpt')

    const apiKey = this.configService.get<string>('CHATGPT_KEY')
    const openai = new ChatGPTAPI({
      apiKey,
    })

    const response = await openai.sendMessage(prompt, {
      parentMessageId,
    })

    return response
  }
}
