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

    const listModels = await openai.listModels()

    const response = await openai.createCompletion({
      model: 'gpt-3.5-turbo',
      prompt: `Human: ${prompt}\nAI:`,
      temperature: 0.9,
      max_tokens: 500,
      // top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.6,
      stop: [' Human:', ' AI:'],
    })

    const [{ text }] = response.data.choices
    console.log(listModels, '=listModels=')

    return text
  }
}
