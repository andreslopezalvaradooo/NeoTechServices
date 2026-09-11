import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { ProductService } from './product.service.js';
import { SearchProductsInput } from './dto/search-products.input.js';
import { SearchProductsResult } from './dto/search-products.result.js';
import { Product } from './models/product.model.js';
import { Review } from './models/review.model.js';
import { CreateReviewInput } from './dto/create-review.input.js';

@Resolver()
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query(() => [Product])
  async getProducts() {
    return this.productService.getProducts();
  }

  @Query(() => Product)
  async getProduct(@Args('slug') slug: string) {
    return this.productService.getProduct(slug);
  }

  @Query(() => SearchProductsResult)
  async searchProducts(@Args('input') input: SearchProductsInput) {
    return this.productService.searchProducts(input);
  }

  @Mutation(() => Review)
  async createReview(@Args('input') input: CreateReviewInput) {
    return this.productService.createReview(input);
  }
}
