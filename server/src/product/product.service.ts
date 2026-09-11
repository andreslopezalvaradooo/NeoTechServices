import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { SearchProductsInput } from './dto/search-products.input.js';
import { Prisma } from '../generated/prisma/client.js';
import { CreateReviewInput } from './dto/create-review.input.js';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async getProducts() {
    return this.prisma.product.findMany();
  }

  async getProduct(slug: string) {
    return this.prisma.product.findUnique({
      where: { slug },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
            description: true,
            image: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        discounts: { include: { discount: true } },
        reviews: { orderBy: { createdAt: 'desc' } }, // ← NUEVO
      },
    });
  }

  async searchProducts(input: SearchProductsInput) {
    const { q, order } = input;

    const where: Prisma.ProductWhereInput = {
      isActive: true,
      ...(q && {
        OR: [
          { name: { contains: q, mode: 'insensitive' } },
          { description: { contains: q, mode: 'insensitive' } },
        ],
      }),
    };

    const [products, priceAggregate, categoryCounts] = await Promise.all([
      this.prisma.product.findMany({
        where,
        orderBy: this.resolveOrderBy(order),
        include: {
          category: {
            select: {
              id: true,
              name: true,
              slug: true,
              description: true,
              image: true,
              createdAt: true,
              updatedAt: true,
            },
          },
          discounts: {
            include: { discount: true },
          },
        },
      }),

      this.prisma.product.aggregate({
        where,
        _min: { price: true },
        _max: { price: true },
      }),

      this.prisma.product.groupBy({
        by: ['categoryId'],
        where,
        _count: { id: true },
      }),
    ]);

    const categoryIds = categoryCounts
      .map((c) => c.categoryId)
      .filter((id): id is string => id !== null);

    const categoriesData =
      categoryIds.length > 0
        ? await this.prisma.category.findMany({
            where: { id: { in: categoryIds } },
            select: { id: true, name: true, slug: true, image: true },
          })
        : [];

    const filters = {
      minPrice: priceAggregate._min.price ?? 0,
      maxPrice: priceAggregate._max.price ?? 0,
      categories: categoriesData
        .map((cat) => ({
          name: cat.name,
          slug: cat.slug,
          image: cat.image,
          count:
            categoryCounts.find((cc) => cc.categoryId === cat.id)?._count.id ??
            0,
        }))
        .sort((a, b) => a.name.localeCompare(b.name)),
    };

    return { products, filters };
  }

  async getProductReviews(productId: string) {
    return this.prisma.review.findMany({
      where: { productId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createReview(input: CreateReviewInput) {
    return this.prisma.review.create({ data: input });
  }

  private resolveOrderBy(
    order: string,
  ): Prisma.ProductOrderByWithRelationInput {
    switch (order) {
      case 'asc':
        return { price: 'asc' };
      case 'desc':
        return { price: 'desc' };
      case 'newest':
        return { createdAt: 'desc' };
      default:
        return { name: 'asc' };
    }
  }
}
