import { Field, ID, InputType } from "@nestjs/graphql";
import { IsUUID } from "class-validator";

@InputType()
export class CreateBuyOrderInput {
  @Field(() => ID)
  @IsUUID()
  productId: string;
}
