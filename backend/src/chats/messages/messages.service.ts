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
import { MessageDocument } from './entities/message.document';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class MessagesService {
  constructor(
    private readonly chatRepository: ChatRepository,
    private readonly chatService: ChatsService,
    private readonly userService: UsersService,
    @Inject(InjectionTokens.PUB_SUB) private readonly pubSub: PubSub,
  ) {}

  async create(userId: string, { chatId, content }: CreateMessageInput) {
    const messageDocument: MessageDocument = {
      content,
      sender: new Types.ObjectId(userId),
      _id: new Types.ObjectId(),
      createdAt: new Date(),
    };

    await this.chatRepository.findOneAndUpdate(
      {
        _id: chatId,
        ...this.chatService.userChatFileter(userId),
      },
      { $push: { messages: messageDocument } }, // if all good then add the message to the array of msgs
    );

    const message: Message = {
      ...messageDocument,
      chatId,
      user: await this.userService.findOne(userId),
    };
    await this.pubSub.publish(EventTriggers.MESSAGE_CREATED, {
      Message_Created: message,
    });
    return message;
  }

  async findAll(chatId: string, userId: string): Promise<Message[]> {
    const chat = await this.chatRepository.modelRef.aggregate([
      {
        $match: {
          _id: new Types.ObjectId(chatId),
        },
      },
      {
        $unwind: '$messages',
      },
      { $replaceRoot: { newRoot: '$messages' } }, // to get only message related props since we are not interested in chat related props

      {
        $lookup: {
          from: 'users',
          localField: 'sender',
          foreignField: '_id',
          as: 'user',
        },
      },

      { $unwind: 'user' },
      { $unset: 'sender' },
      { $set: { chatId } },
    ]);

    return chat || []; // return messages or empty array if no messages found
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
