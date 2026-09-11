import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Product } from '../models/product.model.js';

@ObjectType()
export class ByCategory {
  @Field() name!: string;
  @Field() slug!: string;
  @Field(() => String, { nullable: true }) image!: string | null;
  @Field(() => Int) count!: number;
}

@ObjectType()
export class Filters {
  @Field(() => [ByCategory]) categories!: ByCategory[];
}

@ObjectType()
export class SearchProductsResult {
  @Field(() => [Product]) products!: Product[];
  @Field(() => Filters) filters!: Filters;
}
