import { InputType, Int, Field } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

@InputType()
export class CreateChatInput {
  @Field(() => String, { description: 'Chat name' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
