import { Inject, Injectable } from '@nestjs/common';
import { ChatRepository } from '../chat.repository';
import { CreateMessageInput } from './DTO/create-message.input';
import { Message } from './entities/message.entity';
import { Types } from 'mongoose';
import { InjectionTokens } from 'src/common/constants/injection.token';
import { PubSub } from 'graphql-subscriptions';
import { EventTriggers } from 'src/common/constants/event.triggers';
import { MessageCreatedArgs } from '../args/message.args';
import { ChatsService } from '../chats.service';

@Injectable()
export class MessagesService {
  constructor(
    private readonly chatRepository: ChatRepository,
    private readonly chatService: ChatsService,
    @Inject(InjectionTokens.PUB_SUB) private readonly pubSub: PubSub,
  ) {}

  async create(userId: string, { chatId, content }: CreateMessageInput) {
    const message: Message = {
      content,
      sender: userId,
      chatId,
      _id: new Types.ObjectId(),
      createdAt: new Date(),
    };

    await this.chatRepository.findOneAndUpdate(
      {
        _id: chatId,
        ...this.chatService.userChatFileter(userId),
      },
      { $push: { messages: message } }, // if all good then add the message to the array of msgs
    );

    await this.pubSub.publish(EventTriggers.MESSAGE_CREATED, {
      Message_Created: message,
    });
    return message;
  }

  async findAll(chatId: string, userId: string) {
    const chat = await this.chatRepository.findOne({
      _id: chatId,
      ...this.chatService.userChatFileter(userId),
    });

    return chat?.messages || []; // return messages or empty array if no messages found
  }

  async messageCreated({ chatId }: MessageCreatedArgs, userId: string) {
    //ensures only users in this chat will get this update
    await this.chatRepository.findOne({
      _id: chatId,
      ...this.chatService.userChatFileter(userId),
    });
    return this.pubSub.asyncIterableIterator(EventTriggers.MESSAGE_CREATED);
  }
}
