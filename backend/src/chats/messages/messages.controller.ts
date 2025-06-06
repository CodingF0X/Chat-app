import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get('count')
  @UseGuards(JwtAuthGuard)
  async messagesCount(@Query('chatId') chatId: string) {
    return await this.messagesService.countDocs(chatId);
  }
}
