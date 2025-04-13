import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';
import { AbstractEntity } from 'src/common/database/abstract.entity';
import { User } from 'src/users/entities/user.schema';

@ObjectType()
export class Message extends AbstractEntity {
  @Field(() => String, { description: 'The message content' })
  content: string;

  @Field(() => User, { description: 'The sender of the message' })
  user: User;

  @Field(() => String, { description: 'The chat ID' })
  chatId: string;

  @Field(() => String, { description: 'Created date of the message' })
  createdAt: Date;
}
