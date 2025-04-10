// src/messages/dto/message-created.input.ts
import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@ArgsType()
export class MessageCreatedArgs {
  @Field(() => String, { description: 'The Id of the chat' })
  @IsString()
  @IsNotEmpty()
  chatId: string;
}