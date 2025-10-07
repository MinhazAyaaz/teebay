import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';
import { Category } from '@prisma/client';

registerEnumType(Category, { name: 'Category' });

@ObjectType()
export class ProductCategoryModel {
  @Field(() => Category) 
  category: Category;
}