import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { ProductModel } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/common/guards/gql-auth.guard';

@Resolver(() => ProductModel)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Query(() => [ProductModel])
  getAllProducts() {
    return this.productsService.list();
  }

  @Query(() => ProductModel)
  getProductById(@Args('id', { type: () => String }) id: string) {
    return this.productsService.byId(id);
  }

  @Mutation(() => ProductModel)
  @UseGuards(GqlAuthGuard)
  createProduct(@Context() ctx: any, @Args('input') input: CreateProductInput) {
    return this.productsService.create(ctx.userId, input);
  }

  @Mutation(() => ProductModel)
  @UseGuards(GqlAuthGuard)
  updateProduct(@Context() ctx: any, @Args('input') input: UpdateProductInput) {
    return this.productsService.update(ctx.userId, input);
  }
}
