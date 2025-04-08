import { Injectable } from '@nestjs/common';
import { ChatRepository } from '../chat.repository';
import { CreateMessageInput } from './DTO/create-message.input';
import { Message } from './entities/message.entity';
import { Types } from 'mongoose';

@Injectable()
export class MessagesService {
  constructor(private readonly chatRepository: ChatRepository) {}


  async create(userId: string, { chatId, content }: CreateMessageInput) {
    const message: Message = {
      content,
      sender: userId,
      _id: new Types.ObjectId(),
      createdAt: new Date(),
    };

      await this.chatRepository.findOneAndUpdate(
      {
        _id: chatId,
        $or: [
          { userId }, // to check if the user is the owner of the chat
          {
             // to check if the user is a participant of the chat
            participants: { 
              $in: [userId],
            },
          },
        ],
      },
      { $push: { messages: message } }, // if all good then add the message to the array of msgs
    );
    return message;
  }
}
