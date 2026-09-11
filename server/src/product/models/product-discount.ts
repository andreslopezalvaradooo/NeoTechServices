import { Field, ID, ObjectType } from '@nestjs/graphql';
import { type ProductDiscount as PrismaProductDiscount } from '../../generated/prisma/client.js';
import { Discount } from './discount.model.js';

@ObjectType({ description: 'Product Discount Model' })
export class ProductDiscount implements Pick<
  PrismaProductDiscount,
  'productId' | 'discountId'
> {
  @Field(() => ID)
  productId!: string;

  @Field(() => ID)
  discountId!: string;

  @Field(() => Discount, { nullable: true })
  discount?: Discount;
}
