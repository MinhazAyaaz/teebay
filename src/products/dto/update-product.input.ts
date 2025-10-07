import { Field, Float, ID, InputType } from "@nestjs/graphql";
import { Condition, Category, RentInterval } from "@prisma/client";
import { IsArray, IsEnum, IsOptional, IsString } from "class-validator";

@InputType()
export class UpdateProductInput {
  @Field(() => ID) id: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  title?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field(() => Condition, { nullable: true })
  @IsOptional()
  @IsEnum(Condition)
  condition?: Condition;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  salePrice?: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  rentPrice?: number;

  @Field(() => RentInterval, { nullable: true })
  @IsOptional()
  @IsEnum(RentInterval)
  rentInterval?: RentInterval;

  @Field(() => [Category], { nullable: true })
  @IsOptional()
  @IsArray()
  categories?: Category[];
}
