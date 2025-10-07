import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { ProductModel } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/common/guards/gql-auth.guard';
import { ProductResponse } from './entities/product-response.entity';

@Resolver(() => ProductModel)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Query(() => [ProductModel]) 
  getAllProducts(@Context() ctx: any) {
    return this.productsService.list(ctx.userId);
  }

  @Query(() => ProductModel)
  getProductById(@Args('id', { type: () => String }) id: string) {
    return this.productsService.byId(id);
  }

  @Mutation(() => ProductResponse)
  @UseGuards(GqlAuthGuard)
  createProduct(@Context() ctx: any, @Args('input') input: CreateProductInput) {
    return this.productsService.create(ctx.userId, input);
  }

  @Mutation(() => ProductResponse)
  @UseGuards(GqlAuthGuard)
  updateProduct(@Context() ctx: any, @Args('input') input: UpdateProductInput) {
    return this.productsService.update(ctx.userId, input);
  }
}
