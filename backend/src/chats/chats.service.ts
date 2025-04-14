import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateChatInput } from './dto/create-chat.input';
import { UpdateChatInput } from './dto/update-chat.input';
import { ChatRepository } from './chat.repository';
import { Chat } from './entities/chat.entity';
import { JwtPayload } from 'src/auth/jwt-payload.interface';
import { ChatDocument } from './entities/chat.document';
import { PipelineStage, Types } from 'mongoose';
import { PaginationArgs } from './args/pagination.args';

@Injectable()
export class ChatsService {
  constructor(private readonly chatRepository: ChatRepository) {}

  // userChatFileter(userId: string) {
  //   return {
  //     $or: [
  //       { userId }, // to check if the user is the owner of the chat
  //       {
  //         participants: {
  //           // to check if the user is a participant of the chat
  //           $in: [userId],
  //         },
  //       },
  //       { isPrivate: false },
  //     ],
  //   };
  // }

  async create(
    createChatInput: CreateChatInput,
    userId: string,
  ): Promise<Chat> {
    const chat = await this.chatRepository.create({
      ...createChatInput,
      userId,
      messages: [],
    });
    return chat;
  }

  // async findAll(user: JwtPayload): Promise<Chat[]> {
  //   const chats = await this.chatRepository.find({
  //     ...this.userChatFileter(user._id)
  //   });
  //   return chats;
  // }
  async findMany(
    prePipelineStages: PipelineStage[] = [],
    paginationArgs?: PaginationArgs,
  ) {
    const chats = await this.chatRepository.modelRef.aggregate([
      ...prePipelineStages,
      {
        $set: {
          latestMessage: {
            $cond: [
              '$messages', // we wanna check if this prop is actuially defined in this chat doc.
              { $arrayElemAt: ['$messages', -1] }, // if it was true, then we evaluate the next element in this array
              {
                createdAt: new Date(), //otherwise, we set the latestMessage to right now.
              },
            ],
          },
        },
      },
      { $sort: { 'latestMessage.createdAt': -1 } },
      { $skip: paginationArgs?.skip || 0 },
      { $limit: paginationArgs?.limit || 10 },
      { $unset: 'messages' },
      {
        $lookup: {
          from: 'users',
          localField: 'latestMessage.sender',
          foreignField: '_id',
          as: 'latestMessage.user',
        },
      },
    ]);
    chats.forEach((chat) => {
      if (!chat.latestMessage?._id) {
        delete chat.latestMessage;
        return;
      }
      chat.latestMessage.user = chat.latestMessage.user[0];
      delete chat.latestMessage.sender;
      chat.latestMessage.chatId = chat._id;
    });
    return chats;
  }

  async countDocs() {
    return await this.chatRepository.modelRef.countDocuments({});
  }

  async findOne(_id: string) {
    const chats = await this.findMany([
      { $match: { chatId: new Types.ObjectId(_id) } },
    ]);
    if (!chats[0]) {
      throw new NotFoundException(`No chat was found with ID ${_id}`);
    }
    return chats[0];
  }

  async update(updateChatInput: UpdateChatInput) {
    const chat = await this.chatRepository.findOneAndUpdate(
      { _id: updateChatInput._id },
      { $set: updateChatInput },
    );
    return chat;
  }

  async remove(_id: string) {
    const chat = await this.chatRepository.findOneAndDelete({ _id });
    return `Chat ${chat.name} has been deleted`;
  }
}
