// src/messages/dto/message-created.input.ts
import { ArgsType, Field } from '@nestjs/graphql';
import { IsArray, IsNotEmpty } from 'class-validator';

@ArgsType()
export class MessageCreatedArgs {
  @Field(() => [String], { description: 'The Id of the chat' })
  @IsArray()
  @IsNotEmpty({each:true})
  chatIds: string[];
}