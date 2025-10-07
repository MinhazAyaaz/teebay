import { Field, InputType } from '@nestjs/graphql'
import { IsEmail, IsString } from 'class-validator'

@InputType()
export class CreateUserDto {
    @Field()
    @IsEmail()
    email: string

    @Field()
    @IsString()
    password: string

    @Field()
    @IsString()
    firstName: string

    @Field()
    @IsString()
    lastName: string

    @Field()
    @IsString()
    address: string

    @Field()
    @IsString()
    phone: string
}
