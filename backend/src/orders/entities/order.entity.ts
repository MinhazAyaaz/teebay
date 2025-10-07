import {
  Field,
  Float,
  ID,
  ObjectType,
  registerEnumType,
} from "@nestjs/graphql";
import { OrderStatus, OrderType } from "@prisma/client";
import { ProductModel } from "src/products/entities/product.entity";
import { UserModel } from "src/users/entities/user.entity";

registerEnumType(OrderType, { name: "OrderType" });
registerEnumType(OrderStatus, { name: "OrderStatus" });

@ObjectType()
export class OrderModel {
  @Field(() => ID)
  id: string;

  @Field(() => OrderType)
  type: OrderType;

  @Field(() => OrderStatus)
  status: OrderStatus;

  @Field()
  productId: string;

  @Field()
  buyerId: string;

  @Field(() => Float)
  amount: number;

  @Field()
  currency: string;

  @Field({ nullable: true })
  startDate?: string;

  @Field({ nullable: true })
  endDate?: string;

  @Field(() => ProductModel)
  product: ProductModel;

  @Field(() => UserModel)
  buyer: UserModel;

  @Field()
  createdAt: string;
}
