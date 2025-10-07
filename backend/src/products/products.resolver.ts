import { Resolver, Query, Mutation, Args, Context, Int } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { ProductModel } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/common/guards/gql-auth.guard';
import { ProductListResponse, ProductResponse } from './entities/product-response.entity';

@Resolver(() => ProductModel)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Query(() => ProductListResponse) 
  @UseGuards(GqlAuthGuard)
  getAllProducts(
    @Context() ctx: any,
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
    @Args('pageSize', { type: () => Int, defaultValue: 10 }) pageSize: number,
    @Args('search', { type: () => String, nullable: true }) search?: string,
  ) {
    return this.productsService.listAllProducts(ctx.userId, { page, pageSize, search });
  }

  @Query(() => ProductListResponse)
  @UseGuards(GqlAuthGuard)
  getUserProducts(
    @Context() ctx: any,
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
    @Args('pageSize', { type: () => Int, defaultValue: 10 }) pageSize: number,
    @Args('search', { type: () => String, nullable: true }) search?: string,
  ) {
    return this.productsService.listUserProducts(ctx.userId, { page, pageSize, search });
  }

  @Query(() => ProductModel)
  @UseGuards(GqlAuthGuard)
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

  @Mutation(() => ProductResponse)
  @UseGuards(GqlAuthGuard)
  deleteProduct(@Context() ctx: any, @Args('id', { type: () => String }) id: string) {
    return this.productsService.delete(ctx.userId, id);
  }
}
