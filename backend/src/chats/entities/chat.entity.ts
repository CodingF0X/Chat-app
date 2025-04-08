import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractEntity } from 'src/common/database/abstract.entity';
import { Message } from '../messages/entities/message.entity';

@ObjectType()
@Schema()
export class Chat extends AbstractEntity {
  @Field(() => String, { description: 'Id of user created the chat' })
  @Prop({ required: true })
  userId: string;

  @Field(() => String, { description: 'Privacy option' })
  @Prop()
  isPrivate: boolean;

  @Field(() => [String], { description: 'Array of chat participants' })
  @Prop([String])
  participants: string[];

  @Field(() => String, { description: 'Chat name' })
  @Prop({ nullable: true })
  name: string;

  @Field(() => [Message], { description: 'Chat messages' })
  @Prop([Message])
  messages: Message[];
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
