import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { AbstractEntity } from 'src/common/database/abstract.entity';

@Schema()
export class MessageDocument extends AbstractEntity {
  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  sender: Types.ObjectId;

  @Prop({ required: true })
  createdAt: Date;
}
