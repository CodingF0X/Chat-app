import { Field, ObjectType } from '@nestjs/graphql';
import { AbstractEntity } from 'src/common/database/abstract.entity';

@ObjectType()
export class User extends AbstractEntity {
  @Field(() => String, { description: 'Email of user' })
  email: string;

  @Field(()=> String, {description: 'Image URL'})
  imageURL: string;
}

