import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { importDynamic } from '@/utils/import'

@Injectable()
export class ChatService {
  public chatgpt: any
  constructor(private configService: ConfigService) {}

  async initChatgpt() {
    const apiKey = this.configService.get<string>('CHATGPT_KEY')
    const { ChatGPTAPI } = await importDynamic('chatgpt')

    const chatgpt = new ChatGPTAPI({ apiKey })

    this.chatgpt = chatgpt
  }

  async generateChat(prompt: string, parentMessageId?: string) {
    const response = await this.chatgpt.sendMessage(prompt, { parentMessageId })

    return response
  }
}
