import { Injectable } from '@nestjs/common';
import { CreateChatInput } from './dto/create-chat.input';
import { UpdateChatInput } from './dto/update-chat.input';
import { ChatRepository } from './chat.repository';

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

  findAll() {
    return `This action returns all chats`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chat`;
  }

  update(id: number, updateChatInput: UpdateChatInput) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
