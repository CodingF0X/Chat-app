import { Injectable } from '@nestjs/common';
import { CreateChatInput } from './dto/create-chat.input';
import { UpdateChatInput } from './dto/update-chat.input';
import { ChatRepository } from './chat.repository';
import { Chat } from './entities/chat.entity';
import { JwtPayload } from 'src/auth/jwt-payload.interface';
import { ChatDocument } from './entities/chat.document';

@Injectable()
export class ChatsService {
  constructor(private readonly chatRepository: ChatRepository) {}

  userChatFileter(userId: string) {
    return {
      $or: [
        { userId }, // to check if the user is the owner of the chat
        {
          participants: {
            // to check if the user is a participant of the chat
            $in: [userId],
          },
        },
        { isPrivate: false },
      ],
    };
  }

  async create(createChatInput: CreateChatInput, userId: string): Promise<Chat> {
    const chat = await this.chatRepository.create({
      ...createChatInput,
      userId,
      messages: [],
    });
    return chat;
  }

  async findAll(user: JwtPayload): Promise<Chat[]> {
    const chats = await this.chatRepository.find({
      ...this.userChatFileter(user._id)
    });
    return chats;
  }

  async findOne(_id: string): Promise<Chat> {
    const chat = await this.chatRepository.findOne({ _id });
    return chat;
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
