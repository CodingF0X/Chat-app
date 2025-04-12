import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ChatsService } from './chats.service';
import { Chat } from './entities/chat.entity';
import { CreateChatInput } from './dto/create-chat.input';
import { UpdateChatInput } from './dto/update-chat.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { JwtPayload } from 'src/auth/jwt-payload.interface';

@Resolver(() => Chat)
export class ChatsResolver {
  constructor(private readonly chatsService: ChatsService) {}

  @Mutation(() => Chat, { name: 'Create_New_Chat' })
  @UseGuards(GqlAuthGuard)
  createChat(
    @Args('createChatInput') createChatInput: CreateChatInput,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.chatsService.create(createChatInput, user._id);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Chat], { name: 'Find_Chats' })
  findAll(@CurrentUser() user: JwtPayload) {
    return this.chatsService.findAll(user);
  }

  @Query(() => Chat, { name: 'Find_Single_Chat' })
  findOne(@Args('_id', { type: () => String }) _id: string) {
    return this.chatsService.findOne(_id);
  }

  @Mutation(() => Chat, { name: 'Update_Single_Chat' })
  updateChat(@Args('updateChatInput') updateChatInput: UpdateChatInput) {
    return this.chatsService.update(updateChatInput);
  }

  @Mutation(() => String, { name: 'Delete_Chat' })
  removeChat(@Args('_id', { type: () => String }) _id: string) {
    return this.chatsService.remove(_id);
  }
}
