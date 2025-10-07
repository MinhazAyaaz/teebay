import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductStatus } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async list() {
    return this.prisma.product.findMany({ 
      where: { status: ProductStatus.AVAILABLE },
      include: { categories: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async byId(id: string) {
    const p = await this.prisma.product.findUnique({
      where: { id },
      include: { categories: true },
    });
    if (!p) throw new NotFoundException('Product not found');
    return p;
  }

  async create(ownerId: string, input: CreateProductInput) {
    const newProduct = await this.prisma.product.create({
      data: {
        ownerId,
        title: input.title,
        description: input.description,
        condition: input.condition ?? 'GOOD',
        salePrice: input.salePrice ?? null,
        rentPricePerDay: input.rentPricePerDay ?? null,
        categories: { create: input.categories.map(c => ({ category: c })) },
      },
      include: { categories: true },
    });

    return {
      statusCode: HttpStatus.CREATED,
      message: "Product created successfully",
      product: newProduct,
    };
  }

  async update(ownerId: string, input: UpdateProductInput) {
    // simple owner check (could harden later)
    const existing = await this.prisma.product.findUnique({ where: { id: input.id } });
    if (!existing || existing.ownerId !== ownerId) throw new NotFoundException();

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
          data: input.categories.map((c) => ({ productId: input.id, category: c })),
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
  }
}
