import { Field, ID, InputType } from "@nestjs/graphql";
import { IsDateString, IsUUID } from "class-validator";

@InputType()
export class CreateRentOrderInput {
  @Field(() => ID)
  @IsUUID()
  productId: string;

  @Field()
  @IsDateString()
  startDate: string; // ISO

  @Field()
  @IsDateString()
  endDate: string; // ISO
}
