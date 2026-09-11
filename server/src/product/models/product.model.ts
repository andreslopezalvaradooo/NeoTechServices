import {
  Field,
  Float,
  GraphQLISODateTime,
  ID,
  ObjectType,
} from '@nestjs/graphql';
// import { GraphQLJSON } from 'graphql-scalars';
import { GraphQLJSON } from 'graphql-type-json';
import { type Product as PrismaProduct } from '../../generated/prisma/client.js';
import { Category } from './category.model.js';
import { ProductDiscount } from './product-discount.js';
import { Review } from './review.model.js';

@ObjectType({ description: 'Product Model' })
export class Product implements Pick<
  PrismaProduct,
  | 'id'
  | 'name'
  | 'slug'
  | 'description'
  | 'price'
  | 'stock'
  | 'images'
  | 'isActive'
  | 'categoryId'
  | 'createdAt'
  | 'updatedAt'
  | 'features'
> {
  @Field(() => ID)
  id!: string;

  @Field()
  name!: string;

  @Field(() => GraphQLISODateTime)
  createdAt!: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date;

  @Field()
  slug!: string;

  @Field()
  description!: string;

  @Field(() => Float)
  price!: PrismaProduct['price'];

  @Field()
  stock!: number;

  @Field(() => [String])
  images!: string[];

  @Field()
  isActive!: boolean;

  @Field()
  categoryId!: string;

  @Field(() => GraphQLJSON, { nullable: true })
  features!: PrismaProduct['features'];

  @Field(() => Category, { nullable: true })
  category?: Category;

  @Field(() => [ProductDiscount], { nullable: true })
  discounts?: ProductDiscount[];

  @Field(() => [Review], { nullable: true })
  reviews?: Review[];
}
