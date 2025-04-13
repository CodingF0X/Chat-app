import { ObjectType, Field } from '@nestjs/graphql';
import { AbstractEntity } from 'src/common/database/abstract.entity';
import { Message } from '../messages/entities/message.entity';

@ObjectType()
export class Chat extends AbstractEntity {
  @Field(() => String, { description: 'Chat name' })
  name: string;

  @Field(() => Message, { description: 'Latest chat message', nullable: true })
  latestMessage?: Message;
}
/* 
This is all about separation of concerns and optimizing GraphQL output for frontend needs.

1. Frontend display optimization
The goal on the frontend is to show a chat list with:

Chat name
The last message's content
The sender of the last message
-----------------------------------------------------------------------
2. Avoid over-fetching in GraphQL
Before:

@Field(() => [Message])
@Prop([Message])
messages: Message[];

This would send all messages for every chat when querying chats at startup. That’s:
-Unnecessary for the chat list
-Bad for performance, especially if messages grow over time

After: 

@Field(() => Message)
latestMessage?: Message;

Now GraphQL only gives what’s needed: the last message.
-----------------------------------------------------------------------
3- Entity vs Document
The ChatDocument is now focused on DB structure.

The Chat GraphQL object is focused on presentation needs.

That lets you:
Keep full data in Mongo.
Build GraphQL-friendly views selectively.
Extend each separately.


*/
