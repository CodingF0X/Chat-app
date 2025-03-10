import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { UserRepository } from './users.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, User } from './entities/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserModel,
      },
    ]),
  ],
  providers: [UsersResolver, UsersService, UserRepository],
})
export class UsersModule {}
