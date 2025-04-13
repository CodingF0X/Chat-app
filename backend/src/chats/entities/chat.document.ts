import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractEntity } from 'src/common/database/abstract.entity';
import { MessageDocument } from '../messages/entities/message.document';

@Schema()
export class ChatDocument extends AbstractEntity {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  name: string;

  @Prop([MessageDocument])
  messages: MessageDocument[];
}

export const ChatSchema = SchemaFactory.createForClass(ChatDocument);
