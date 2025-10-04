import { Resolver, Query, Args, Mutation } from '@nestjs/graphql'
import { UsersService } from './users.service'
import { User } from './entities/user.entity'
import { CreateUserDto } from './dto/create-user-dto'
import { ValidateUserDto } from './dto/validate-user-dto'

@Resolver()
export class UsersResolver {
    constructor(private readonly usersService: UsersService) {}

    @Query(() => [User])
    users() {
        return this.usersService.findAll()
    }

    @Mutation(() => User)
    createUser(@Args('createUserInput') createUserInput: CreateUserDto) {
        return this.usersService.signUp(createUserInput)
    }

    @Mutation(() => User)
    validateUser(
        @Args('validateUserInput')
        validateUserInput: ValidateUserDto
    ) {
        return this.usersService.validateUser(
            validateUserInput.email,
            validateUserInput.password
        )
    }
}
