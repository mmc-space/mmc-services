import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import Authenticator from 'openai-token'
import { importDynamic } from '@/utils/import'

@Injectable()
export class ChatService {
  public chatgpt: any
  constructor(private configService: ConfigService) {}

  async initChatgpt() {
    const email = this.configService.get<string>('CHATGPT_EMAIL')
    const password = this.configService.get<string>('CHATGPT_PASSWORD')
    const auth = new Authenticator(email, password)
    await auth.begin()
    const accessToken = await auth.getAccessToken()
    const { ChatGPTUnofficialProxyAPI } = await importDynamic('chatgpt')

    const chatgpt = new ChatGPTUnofficialProxyAPI({ accessToken })

    this.chatgpt = chatgpt
  }

  async generateChat(prompt: string, parentMessageId?: string) {
    if (this.chatgpt) throw new Error('chatgpt is undefined')
    const response = await this.chatgpt.sendMessage(prompt, { parentMessageId })

    return response
  }
}
