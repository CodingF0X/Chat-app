import { Inject, Injectable } from '@nestjs/common';
import { ChatRepository } from '../chat.repository';
import { CreateMessageInput } from './DTO/create-message.input';
import { Message } from './entities/message.entity';
import { PipelineStage, Types } from 'mongoose';
import { InjectionTokens } from 'src/common/constants/injection.token';
import { PubSub } from 'graphql-subscriptions';
import { EventTriggers } from 'src/common/constants/event.triggers';
import { MessageCreatedArgs } from '../args/message.args';
import { ChatsService } from '../chats.service';
import { MessageDocument } from './entities/message.document';
import { UsersService } from 'src/users/users.service';
import { GetMessagesArgs } from '../args/getMessages.args';

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
        _id: new Types.ObjectId(chatId),
        // ...this.chatService.userChatFileter(userId),
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

  async findAll({ chatId, skip, limit }: GetMessagesArgs): Promise<Message[]> {
    const pipeline: PipelineStage[] = [
      // 1) match the chat
      {
        $match: { _id: new Types.ObjectId(chatId) },
      },
      // 2) unwind into one message per doc
      { $unwind: '$messages' },
      { $replaceRoot: { newRoot: '$messages' } },
      // 3) sort / paginate
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit },
      // 4) lookup sender in an array of user docs
      {
        $lookup: {
          from: 'userdocuments',
          localField: 'sender',
          foreignField: '_id',
          as: 'userDocs',
        },
      },
      // 5) drop any message without a matched user
      { $match: { 'userDocs.0': { $exists: true } } },
      // 6) unwind into a single user doc
      { $unwind: '$userDocs' },
      // 7) rename and clean up fields
      {
        $addFields: {
          user: '$userDocs',
          chatId: chatId,
        },
      },
      {
        $unset: ['sender', 'userDocs'],
      },
    ];
  
    const raw: any[] = await this.chatRepository.modelRef.aggregate(pipeline);
  
    // 8) convert raw user document to GraphQL User entity
    const messages: Message[] = raw.map(r => ({
      _id: r._id,
      content: r.content,
      createdAt: r.createdAt,
      chatId: r.chatId,
      user: this.userService.toEntity(r.user),
    }));
  
    return messages;
  }
  
  // async findAll({ chatId, skip, limit }: GetMessagesArgs): Promise<Message[]> {
  //   const messages = await this.chatRepository.modelRef.aggregate([
  //     {
  //       $match: {
  //         _id: new Types.ObjectId(chatId),
  //         // ...this.chatService.userChatFileter(userId)
  //       },
  //     },
  //     {
  //       $unwind: '$messages',
  //     },
  //     { $replaceRoot: { newRoot: '$messages' } }, // to get only message related props since we are not interested in chat related props
  //     { $sort: { createdAt: -1 } },
  //     { $skip: skip },
  //     { $limit: limit },
  //     {
  //       $lookup: {
  //         from: 'userdocuments',
  //         localField: 'sender',
  //         foreignField: '_id',
  //         as: 'user',
  //       },
  //     },

  //     { $unwind: '$user' },
  //     { $unset: 'sender' },
  //     { $set: { chatId } },
  //   ]);
    
  //   for (const message of messages ) {
  //     message.user = this.userService.toEntity(message.user);
  //   }
  //   console.log({messages})
  //   return messages || []; // return messages or empty array if no messages found
  // }

  async countDocs(chatId: string) {
    return await this.chatRepository.modelRef.aggregate([
      {
        $match: { _id: new Types.ObjectId(chatId) },
      },
      { $unwind: '$messages' },
      { $count: 'messages' },
    ]);
  }

  async messageCreated() {
    // //ensures only users in this chat will get this update
    // await this.chatRepository.findOne({
    //   _id: chatId,
    //   // ...this.chatService.userChatFileter(userId),
    // });
    return this.pubSub.asyncIterableIterator(EventTriggers.MESSAGE_CREATED);
  }
}
