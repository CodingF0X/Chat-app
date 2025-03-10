import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { UserRepository } from './users.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './entities/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserSchema.name,
        schema: UserSchema,
      },
    ]),
  ],
  providers: [UsersResolver, UsersService, UserRepository],
})
export class UsersModule {}
