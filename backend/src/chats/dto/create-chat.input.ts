import { InputType, Int, Field } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

@InputType()
export class CreateChatInput {
  @Field(() => Boolean, { description: 'Example field (placeholder)' })
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  isPrivate: boolean;

  @Field(() => [String], {
    nullable: true,
    description: 'Array of chat participants',
  })
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @IsOptional()
  participants: string[];

  @Field(() => String, { nullable: true, description: 'Chat name' })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  name: string;
}
