import { Resolver, Query } from '@nestjs/graphql'

@Resolver()
export class AppResolver {
    @Query(() => String)
    test(): string {
        return 'Hello World!'
    }
}
