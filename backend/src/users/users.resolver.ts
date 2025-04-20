import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.schema';
import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { JwtPayload } from 'src/auth/jwt-payload.interface';
import { Types } from 'mongoose';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User, { name: 'Create_New_User' })
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.usersService.create(createUserInput);
  }

  @Query(() => [User], { name: 'Get_All_Users' })
  @UseGuards(GqlAuthGuard)
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'User' })
  @UseGuards(GqlAuthGuard)
  findOne(@Args('query', { type: () => String }) _id: string): Promise<User> {
    return this.usersService.findOne(_id);
  }

  @Mutation(() => User, { name: 'Update_User_Details' })
  @UseGuards(GqlAuthGuard)
  updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @CurrentUser() user: JwtPayload,
  ): Promise<User> {
    return this.usersService.update(user._id, updateUserInput);
  }

  @Mutation(() => User, { name: 'Delete_User' })
  removeUser(
    @Args('_id', { type: () => String }) @CurrentUser() user: JwtPayload,
  ): Promise<User> {
    return this.usersService.remove(user._id);
  }

  @Query(() => User, { name: 'GET_ME' })
  @UseGuards(GqlAuthGuard)
 async getUser(@CurrentUser() user: JwtPayload): Promise<User> {
    if (!user) throw new UnauthorizedException('User not authenticated');
    return {...user, _id: new Types.ObjectId(user._id)};
  }
}
