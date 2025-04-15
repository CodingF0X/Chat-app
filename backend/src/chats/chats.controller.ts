import { Controller, Get, UseGuards } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('chats')
export class ChatsController {
    constructor(private readonly chatService: ChatsService){}

    @Get('count')
    @UseGuards(JwtAuthGuard)
    async count() {
        const coundChats = await this.chatService.countDocs()
        console.log({numbeOfChats: coundChats})
        return coundChats;

    }
}
