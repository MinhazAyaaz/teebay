import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.enableCors({
        origin: ['http://localhost:5173'],
        credentials: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        allowedHeaders: 'Content-Type,Authorization,x-user-id',
        exposedHeaders: 'Content-Length,Content-Type',
        preflightContinue: false,
        optionsSuccessStatus: 204,
    })
    const port = process.env.PORT ?? 3000
    await app.listen(port)

    console.log('\n🚀 Application is running on:')
    console.log(`📡 REST API: http://localhost:${port}`)
    console.log(`🎮 Apollo Sandbox: http://localhost:${port}/graphql`)
    console.log(
        `📚 GraphQL Schema: http://localhost:${port}/graphql (introspection enabled)\n`
    )
}
bootstrap()
