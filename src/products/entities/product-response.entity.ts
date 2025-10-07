import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ProductModel } from './product.entity';

@ObjectType()
export class ProductResponse {
  @Field(() => Int)
  statusCode: number;

  @Field()
  message: string;

  @Field(() => ProductModel)
  product: ProductModel;
}