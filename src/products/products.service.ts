import {
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { CreateProductInput } from "./dto/create-product.input";
import { UpdateProductInput } from "./dto/update-product.input";
import { PrismaService } from "src/prisma/prisma.service";
import { ProductStatus } from "@prisma/client";

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async list(ownerId: string) {
    return this.prisma.product.findMany({
      where: { status: ProductStatus.AVAILABLE, ownerId: ownerId },
      include: { categories: true },
      orderBy: { createdAt: "desc" },
    });
  }

  async byId(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: { categories: true },
    });
    if (!product) {
      throw new HttpException("Product not found", HttpStatus.BAD_REQUEST); // 400
    }
    return product;
  }

  async create(ownerId: string, input: CreateProductInput) {
    try {
      const newProduct = await this.prisma.product.create({
        data: {
          ownerId,
          title: input.title,
          description: input.description,
          condition: input.condition ?? "GOOD",
          salePrice: input.salePrice ?? null,
          rentPricePerDay: input.rentPricePerDay ?? null,
          categories: {
            create: input.categories.map((c) => ({ category: c })),
          },
        },
        include: { categories: true },
      });

      return {
        statusCode: HttpStatus.CREATED,
        message: "Product created successfully",
        product: newProduct,
      };
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

  async update(ownerId: string, input: UpdateProductInput) {
    try {
    const product = await this.prisma.product.findUnique({
      where: { id: input.id },
    });

    if (!product) {
      throw new HttpException("Product not found", HttpStatus.BAD_REQUEST); // 400
    }
    if (product.ownerId !== ownerId) {
      throw new HttpException("You are not the owner of this product", HttpStatus.BAD_REQUEST); // 400
    }

    const updatedProduct = await this.prisma.$transaction(async (tx) => {
      // Update core fields first
      await tx.product.update({
        where: { id: input.id },
        data: {
          title: input.title ?? undefined,
          description: input.description ?? undefined,
          condition: input.condition ?? undefined,
          salePrice: input.salePrice ?? undefined,
          rentPricePerDay: input.rentPricePerDay ?? undefined,
        },
      });

      // If categories provided, replace them
      if (input.categories) {
        await tx.productCategory.deleteMany({ where: { productId: input.id } });
        await tx.productCategory.createMany({
          data: input.categories.map((c) => ({
            productId: input.id,
            category: c,
          })),
        });
      }

      // Return the updated product with categories
      return tx.product.findUnique({
        where: { id: input.id },
        include: { categories: true },
      });
    });

    return {
      statusCode: HttpStatus.OK,
      message: "Product updated successfully",
      product: updatedProduct,
    };
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
