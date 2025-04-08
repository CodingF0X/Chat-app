import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateMessageInput {
  @Field(() => String, { description: 'The message content' })
  @IsNotEmpty()
  @IsString()
  content: string;

  @Field(() => String, { description: 'Chat ID' })
  @IsNotEmpty()
  @IsString()
  chatId: string;
}
