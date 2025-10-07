import {
  Field,
  Float,
  ID,
  ObjectType,
  registerEnumType,
} from "@nestjs/graphql";
import { ProductCategoryModel } from "./product-category.entity";
import { Condition, ProductStatus, RentInterval } from "@prisma/client";


registerEnumType(ProductStatus, { name: "ProductStatus" });
registerEnumType(Condition, { name: "Condition" });
registerEnumType(RentInterval, { name: "RentInterval" });

@ObjectType()
export class ProductModel {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Condition)
  condition: Condition;

  @Field(() => ProductStatus)
  status: ProductStatus;

  @Field(() => Float, { nullable: true })
  salePrice?: number;

  @Field(() => Float, { nullable: true })
  rentPrice?: number;

  @Field(() => RentInterval, { nullable: true })
  rentInterval?: RentInterval;

  @Field()
  currency: string;

  @Field(() => [ProductCategoryModel])
  categories: ProductCategoryModel[];

  @Field()
  ownerId: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
