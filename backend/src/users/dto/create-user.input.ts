import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: 'Email of user' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: 'Password of user' })
  password: string;
}
