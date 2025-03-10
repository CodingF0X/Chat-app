import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserRepository } from './users.repository';
import { User } from './entities/user.schema';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}
  async create(createUserInput: CreateUserInput): Promise<User> {
    const user = await this.userRepository.create(createUserInput);
    return user;
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({});
  }

  async findOne(query: User): Promise<User> {
    const user = await this.userRepository.findOne({ query });
    return user;
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
