import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import config from './config'
import { AppController } from './app.controller'
import { ChatModule } from './chat/chat.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.development.env', '.production.env'],
      load: [() => config],
      isGlobal: true,
    }),
    ChatModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
