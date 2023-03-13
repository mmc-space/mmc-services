import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { importDynamic } from '@/utils/import'

@Injectable()
export class ChatService {
  constructor(private configService: ConfigService) {}

  async generateChat(type: number, prompt: string, parentMessageId?: string) {
    const { ChatGPTAPI, ChatGPTUnofficialProxyAPI } = await importDynamic(
      'chatgpt',
    )

    const apiKey = this.configService.get<string>('CHATGPT_KEY')
    const openai = new (type === 1 ? ChatGPTAPI : ChatGPTUnofficialProxyAPI)({
      apiKey,
    })

    const response = await openai.sendMessage(prompt, {
      parentMessageId,
    })

    return response
  }
}
