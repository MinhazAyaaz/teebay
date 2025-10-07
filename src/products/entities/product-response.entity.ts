import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ProductModel } from './product.entity';
import { IsOptional } from 'class-validator';

@ObjectType()
export class ProductResponse {
  @Field(() => Int)
  statusCode: number;

  @Field()
  message: string;

  @Field(() => ProductModel)
  @IsOptional()
  product?: ProductModel;
}