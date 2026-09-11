import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
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
  @Field(() => Float, { nullable: true }) minPrice?: number; //quizá no sea necesario
  @Field(() => Float, { nullable: true }) maxPrice?: number; //quizá no sea necesario
}

@ObjectType()
export class SearchProductsResult {
  @Field(() => [Product]) products!: Product[];
  @Field(() => Filters) filters!: Filters;
  @Field(() => Int) total!: number;
  @Field(() => Int) pages!: number;
}
