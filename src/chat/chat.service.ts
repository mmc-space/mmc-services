import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Configuration, OpenAIApi } from 'openai'

@Injectable()
export class ChatService {
  constructor(private configService: ConfigService) {}

  async generateChat(prompt: string) {
    const apiKey = this.configService.get<string>('CHATGPT_KEY')
    const configuration = new Configuration({
      apiKey,
    })
    const openai = new OpenAIApi(configuration)

    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Human: ${prompt}\nAI:`,
      temperature: 0.9,
      max_tokens: 500,
      // top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.6,
      stop: [' Human:', ' AI:'],
    })

    const [{ text }] = response.data.choices
    console.log(prompt, response.data.choices)

    return text
  }
}
