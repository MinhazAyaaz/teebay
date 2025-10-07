import { Resolver, Args, Mutation, Query, Context } from "@nestjs/graphql";
import { UsersService } from "./users.service";
import { UserModel } from "./entities/user.entity";
import { UserResponse } from "./entities/user-response.entity";
import { CreateUserDto } from "./dto/create-user-dto";
import { LoginUserDto } from "./dto/login-user-dto";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "src/common/guards/gql-auth.guard";

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => UserModel)
  @UseGuards(GqlAuthGuard)
  getCurrentUser(@Context() ctx: any) {
    return this.usersService.getCurrentUser(ctx.userId);
  }

  @Query(() => UserModel)
  findUserById(@Args("userId") userId: string) {
    return this.usersService.findUserById(userId);
  }

  @Query(() => UserModel)
  findUserByEmail(@Args("email") email: string) {
    return this.usersService.getUserByEmail(email);
  }

  @Mutation(() => UserResponse)
  createUser(@Args("createUserInput") createUserInput: CreateUserDto) {
    return this.usersService.createUser(createUserInput);
  }

  @Mutation(() => UserResponse)
  loginUser(
    @Args("loginUserInput")
    loginUserInput: LoginUserDto
  ) {
    return this.usersService.loginUser(
      loginUserInput.email,
      loginUserInput.password
    );
  }
}
