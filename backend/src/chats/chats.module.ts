import { forwardRef, Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsResolver } from './chats.resolver';
import { ChatRepository } from './chat.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { MessagesModule } from './messages/messages.module';
import { ChatDocument, ChatSchema } from './entities/chat.document';
import { ChatsController } from './chats.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ChatDocument.name,
        schema: ChatSchema,
      },
    ]),
    forwardRef(() => MessagesModule),
  ],
  providers: [ChatsResolver, ChatsService, ChatRepository],
  exports: [ChatRepository, ChatsService],
  controllers: [ChatsController],
})
export class ChatsModule {}
