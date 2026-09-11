import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { type Review as PrismaReview } from '../../generated/prisma/client.js';

@ObjectType({ description: 'Product Review' })
export class Review implements Pick<
  PrismaReview,
  'id' | 'productId' | 'rating' | 'title' | 'body' | 'author' | 'createdAt'
> {
  @Field(() => ID)
  id!: string;

  @Field()
  productId!: string;

  @Field(() => Int)
  rating!: number;

  @Field()
  title!: string;

  @Field()
  body!: string;

  @Field()
  author!: string;

  @Field()
  createdAt!: Date;
}
