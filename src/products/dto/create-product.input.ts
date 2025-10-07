import { Field, Float, InputType } from "@nestjs/graphql";
import { Condition, Category } from "@prisma/client";
import {
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

@InputType()
export class CreateProductInput {
  @Field()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  title: string;

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
  rentPricePerDay?: number;

  @Field(() => [Category])
  @IsArray()
  categories: Category[];
}
