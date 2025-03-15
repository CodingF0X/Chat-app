import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.schema';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { JwtPayload } from 'src/auth/jwt-payload.interface';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Query(() => [User], { name: 'users' })
  @UseGuards(GqlAuthGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  @UseGuards(GqlAuthGuard)
  findOne(@Args('query', { type: () => String }) _id: string) {
    return this.usersService.findOne(_id);
  }

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput, 
  @CurrentUser() user: JwtPayload
) {
    return this.usersService.update(user._id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('_id', { type: () => String })  @CurrentUser() user: JwtPayload) {
    return this.usersService.remove(user._id);
  }
}
