import { Prop, Schema } from '@nestjs/mongoose';
import { AbstractSchema } from 'src/common/database/abstract.schema';

@Schema({ versionKey: false })
export class UserSchema extends AbstractSchema {
  @Prop()
  email: string;

  @Prop()
  password: string;
}
