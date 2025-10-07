import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { Category } from '@prisma/client';


registerEnumType(Category, { name: 'Category' });

@ObjectType()
export class Product {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
