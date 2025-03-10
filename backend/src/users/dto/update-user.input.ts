import { IsString } from 'class-validator';
import { CreateUserInput } from './create-user.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @IsString()
  @Field(() => String, { description: 'Id of user' })
  _id: string;

  @IsString()
  @Field(() => String, { description: 'Email of user' })
  email: string;

  @IsString()
  @Field(() => String, { description: 'Password of user' })
  password: string;
}
