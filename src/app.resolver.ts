import { Resolver, Query } from '@nestjs/graphql'

@Resolver()
export class AppResolver {
    @Query(() => String)
    hello(): string {
        return 'Hello World!'
    }

    @Query(() => String)
    welcome(): string {
        return 'Welcome to your GraphQL API!'
    }
}
