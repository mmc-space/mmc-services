import { IsNotEmpty, IsString } from 'class-validator'

export class ChatDto {
  @IsNotEmpty()
  @IsString()
  prompt: string

  parentMessageId?: string

  type?: number
}
