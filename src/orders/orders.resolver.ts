import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { OrdersService } from './orders.service';
import { OrderModel } from './entities/order.entity';
import { OrderResponse } from './entities/order-response.entity';
import { CreateSaleOrderInput } from './dto/create-sale.order.input';
import { CreateRentOrderInput } from './dto/create-rent.order.input';
import { GqlAuthGuard } from 'src/common/guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => OrderModel)
export class OrdersResolver {
  constructor(private readonly ordersService: OrdersService) {}

  @Query(() => [OrderModel])
  @UseGuards(GqlAuthGuard)
  getCurrentUserOrders(@Context() ctx: any) {
    return this.ordersService.currentUserOrders(ctx.userId);
  }

  @Query(() => [OrderModel])
  @UseGuards(GqlAuthGuard)
  getCurrentUserSales(@Context() ctx: any) {
    return this.ordersService.salesForCurrentUserAsOwner(ctx.userId);
  }

  @Mutation(() => OrderResponse)
  @UseGuards(GqlAuthGuard)
  createBuyOrder(@Context() ctx: any, @Args('input') input: CreateSaleOrderInput) {
    return this.ordersService.createBuyOrder(ctx.userId, input.productId);
  }

  @Mutation(() => OrderResponse)
  @UseGuards(GqlAuthGuard)
  createRentOrder(@Context() ctx: any, @Args('input') input: CreateRentOrderInput) {
    return this.ordersService.createRentOrder(ctx.userId, input.productId, input.startDate, input.endDate);
  }
}
