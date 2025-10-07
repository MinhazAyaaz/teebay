import { ObjectType, Field, Int } from '@nestjs/graphql';
import { OrderModel } from './order.entity';

@ObjectType()
export class OrderResponse {
  @Field(() => Int)
  statusCode: number;

  @Field()
  message: string;

  @Field(() => OrderModel)
  order: OrderModel;
}