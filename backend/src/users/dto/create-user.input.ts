import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsEmail()
  @IsNotEmpty()
  @Field(() => String, { description: 'Email of user' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: 'Password of user' })
  password: string;
}
