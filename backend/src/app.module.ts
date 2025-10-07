import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { AppResolver } from './app.resolver'
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import { UsersModule } from './users/users.module'
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';

@Module({
    imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            playground: false,
            autoSchemaFile: 'schema.gql',
            sortSchema: true,
            introspection: true,
            plugins: [ApolloServerPluginLandingPageLocalDefault()],
        }),
        UsersModule,
        ProductsModule,
        OrdersModule,
    ],
    controllers: [AppController],
    providers: [AppService, AppResolver],
})
export class AppModule {}
