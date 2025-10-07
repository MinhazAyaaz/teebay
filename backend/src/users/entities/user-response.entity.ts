import { ObjectType, Field, Int } from '@nestjs/graphql';
import { UserModel } from './user.entity';

@ObjectType()
export class UserResponse {
  @Field(() => Int)
  statusCode: number;

  @Field()
  message: string;

  @Field(() => UserModel)
  user: UserModel;
}

