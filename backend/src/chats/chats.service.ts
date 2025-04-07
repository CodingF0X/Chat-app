import { Injectable } from '@nestjs/common';
import { CreateChatInput } from './dto/create-chat.input';
import { UpdateChatInput } from './dto/update-chat.input';
import { ChatRepository } from './chat.repository';
import { Chat } from './entities/chat.entity';

@Injectable()
export class ChatsService {
  constructor(private readonly chatRepository: ChatRepository) {}

  async create(createChatInput: CreateChatInput, userId: string) {
    const chat = await this.chatRepository.create({
      ...createChatInput,
      userId,
      participants: createChatInput.participants || [],
    });
    return chat;
  }

  async findAll(): Promise<Chat[]> {
    const chats = await this.chatRepository.find({});
    return chats;
  }

  async findOne(_id: string) {
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
