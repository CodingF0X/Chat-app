import { forwardRef, Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesResolver } from './messages.resolver';
import { ChatsModule } from '../chats.module';
import { PubSubModule } from 'src/common/pubsub/pubsub.module';
import { UsersModule } from 'src/users/users.module';
import { MessagesController } from './messages.controller';

@Module({
  imports: [forwardRef(() => ChatsModule), PubSubModule, UsersModule],
  providers: [MessagesResolver, MessagesService],
  controllers: [MessagesController],
})
export class MessagesModule {}
