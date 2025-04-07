import { IsOptional, IsString } from 'class-validator';
import { CreateChatInput } from './create-chat.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateChatInput extends PartialType(CreateChatInput) {
   @IsString()
  @Field(() => String, { description: 'Id of Chat' })
  _id: string;

  @Field(() => String, { description: 'Chat Name' })
  @IsOptional()
  @IsString()
  name: string;
}
