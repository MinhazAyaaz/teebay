import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { OrderStatus, OrderType, ProductStatus } from "@prisma/client";
import { NotFoundException } from "@nestjs/common";
import { differenceInCalendarDays } from "date-fns";
import { BadRequestException } from "@nestjs/common";

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async currentUserOrders(buyerId: string) {
    try {
      return this.prisma.order.findMany({
        include: { product: true, buyer: true },
        where: { buyerId },
        orderBy: { createdAt: "desc" },
      });
    } catch (error) {
      console.log(error);
      // Rethrow specific errors for clarity
      if (error instanceof HttpException) {
        throw error; // Re-throw the HTTP exceptions to keep their status codes
      } else {
        throw new HttpException(
          "Internal server error",
          HttpStatus.INTERNAL_SERVER_ERROR
        ); // 500
      }
    }
  }

  async salesForCurrentUserAsOwner(ownerId: string) {
    try {
      return this.prisma.order.findMany({
        include: { product: true, buyer: true },
        where: { product: { ownerId } },
        orderBy: { createdAt: "desc" },
      });
    } catch (error) {
      console.log(error);
      // Rethrow specific errors for clarity
      if (error instanceof HttpException) {
        throw error; // Re-throw the HTTP exceptions to keep their status codes
      } else {
        throw new HttpException(
          "Internal server error",
          HttpStatus.INTERNAL_SERVER_ERROR
        ); // 500
      }
    }
  }

  async createBuyOrder(buyerId: string, productId: string) {
    try {
      return this.prisma.$transaction(async (tx) => {
        const product = await tx.product.findUnique({
          where: { id: productId },
        });
        if (product?.ownerId === buyerId)
          throw new BadRequestException("You cannot buy your own product");
        if (!product) throw new NotFoundException("Product not found");
        if (product.status !== ProductStatus.AVAILABLE) {
          throw new BadRequestException("Product not available");
        }
        if (!product.salePrice)
          throw new BadRequestException("Sale price not set");

        const order = await tx.order.create({
          data: {
            type: OrderType.SALE,
            status: OrderStatus.CONFIRMED,
            productId,
            buyerId,
            amount: product.salePrice,
            currency: product.currency,
          },
        });

        await tx.product.update({
          where: { id: productId },
          data: { status: ProductStatus.SOLD },
        });

        return {
          statusCode: HttpStatus.CREATED,
          message: "Order created successfully",
          order: order,
        };
      });
    } catch (error) {
      console.log(error);
      // Rethrow specific errors for clarity
      if (error instanceof HttpException) {
        throw error; // Re-throw the HTTP exceptions to keep their status codes
      } else {
        throw new HttpException(
          "Internal server error",
          HttpStatus.INTERNAL_SERVER_ERROR
        ); // 500
      }
    }
  }

  async createRentOrder(
    buyerId: string,
    productId: string,
    startISO: string,
    endISO: string
  ) {
    try {
      const start = new Date(startISO);
      const end = new Date(endISO);
      if (!(start < end)) throw new BadRequestException("Invalid date range");

      return this.prisma.$transaction(async (tx) => {
        const product = await tx.product.findUnique({
          where: { id: productId },
        });
        if (!product) throw new NotFoundException("Product not found");
        if (product.ownerId === buyerId)
          throw new BadRequestException("You cannot rent your own product");
        if (product.status === ProductStatus.RENTED)
          throw new BadRequestException("Product is already rented");
        if (product.status === ProductStatus.SOLD) {
          throw new BadRequestException("Product is sold");
        }
        if (!product.rentPrice) {
          throw new BadRequestException("Rent price not set");
        }
        const days = Math.max(1, differenceInCalendarDays(end, start));
        const amount = product.rentPrice.toNumber() * days;

        // DB-level exclusion constraint (add via migration) prevents overlaps
        const order = await tx.order.create({
          data: {
            type: OrderType.RENT,
            status: OrderStatus.CONFIRMED,
            productId,
            buyerId,
            startDate: start,
            endDate: end,
            amount,
            currency: product.currency,
          },
        });

        return {
          statusCode: HttpStatus.CREATED,
          message: "Order created successfully",
          order: order,
        };
      });
    } catch (error) {
      console.log(error);
      // Rethrow specific errors for clarity
      if (error instanceof HttpException) {
        throw error; // Re-throw the HTTP exceptions to keep their status codes
      } else {
        throw new HttpException(
          "Internal server error",
          HttpStatus.INTERNAL_SERVER_ERROR
        ); // 500
      }
    }
  }
}
