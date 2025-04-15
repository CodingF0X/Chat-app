import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { MessagesService } from './messages.service';
import { Message } from './entities/message.entity';
import { Inject, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { CreateMessageInput } from './DTO/create-message.input';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { JwtPayload } from 'src/auth/jwt-payload.interface';
import { InjectionTokens } from 'src/common/constants/injection.token';
import { PubSub } from 'graphql-subscriptions';
import { MessageCreatedArgs } from '../args/message.args';
import { GetMessagesArgs } from '../args/getMessages.args';

@Resolver(() => Message)
export class MessagesResolver {
  constructor(
    private readonly messagesService: MessagesService,
    @Inject(InjectionTokens.PUB_SUB) private readonly pubSub: PubSub,
  ) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Message, { name: 'Create_New_Message' })
  async createMessage(
    @Args('createMessageInput') createMessageInput: CreateMessageInput,
    @CurrentUser() user: JwtPayload,
  ): Promise<Message> {
    return this.messagesService.create(user._id, createMessageInput);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Message], { name: 'Get_All_Messages' })
  async findAll(
    @Args() chatId: GetMessagesArgs,
    @CurrentUser() _user: JwtPayload,
  ): Promise<Message[]> {
    return this.messagesService.findAll(chatId);
  }

  @Subscription(() => Message, {
    name: 'Message_Created', // ensure this name is consitent everywhere this subscription used
    filter(payload, variables: MessageCreatedArgs , context) {
      const userId = context.req.user._id;
      const message: Message = payload.Message_Created;
      return (
        variables.chatIds.includes(message.chatId) &&
        userId !== message.user._id.toHexString() // here to ensure not to publish the event to the sender himself
      );
    },
  })
  messageCreated(
    @Args() _messageCreated: MessageCreatedArgs,
    @CurrentUser() _user: JwtPayload,
  ) {
    return this.messagesService.messageCreated();
  }
}
