import { ArgsType, Field } from '@nestjs/graphql';
import { PaginationArgs } from './pagination.args';
import { IsString } from 'class-validator';

@ArgsType()
export class GetMessagesArgs extends PaginationArgs {
  @Field(() => String, { description: 'Chat ID' })
  @IsString()
  chatId: string;
}
