import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';
import { AbstractEntity } from 'src/common/database/abstract.entity';

@ObjectType()
@Schema()
export class Message extends AbstractEntity {
  @Field(() => String, { description: 'The message content' })
  @Prop({ required: true })
  content: string;

  @Field(() => String, { description: 'The sender of the message' })
  @Prop({ required: true })
  sender: string;

  @Field(() => String, { description: 'Created date of the message' })
  @Prop({ required: true })
  createdAt: Date;
}
