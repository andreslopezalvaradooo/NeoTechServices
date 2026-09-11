import { Injectable } from '@nestjs/common';
import { resolveEffectivePrice } from '../product/utils/discount.util.js';
import { PrismaService } from '../prisma/prisma.service.js';

Injectable();
export class CartService {
  constructor(private readonly prisma: PrismaService) {}

  async addItem(userId: string, productId: string, quantity: number) {
    const product = await this.prisma.product.findUniqueOrThrow({
      where: { id: productId },
      include: { discounts: { include: { discount: true } } },
    });

    const now = new Date();

    const discounts = product.discounts
      .map((pd) => pd.discount)
      .filter(
        (d) =>
          d.isActive &&
          (!d.startsAt || d.startsAt <= now) &&
          (!d.endsAt || d.endsAt > now),
      );

    const { effectivePrice } = resolveEffectivePrice(product.price, discounts);

    const cart = await this.prisma.cart.upsert({
      where: { userId },
      create: { userId },
      update: {},
    });

    return this.prisma.cartItem.upsert({
      where: { cartId_productId: { cartId: cart.id, productId } },
      create: {
        cartId: cart.id,
        productId,
        quantity,
        priceSnapshot: effectivePrice,
      },
      update: { quantity, priceSnapshot: effectivePrice },
    });
  }
}
