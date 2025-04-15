import { Controller, Get, Query } from '@nestjs/common';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get('count')
  async messagesCount(@Query('chatId') chatId: string) {
    return await this.messagesService.countDocs(chatId);
  }
}
