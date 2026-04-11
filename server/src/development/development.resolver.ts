import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Development } from './models/development.model.js';
import { DevelopmentService } from './development.service.js';
import { CreateDevelopmentInput } from './dto/create-development.input.js';

@Resolver(() => Development)
export class DevelopmentResolver {
  constructor(private readonly development: DevelopmentService) {}

  @Mutation(() => Development)
  async createDevelopment(
    @Args('input') input: CreateDevelopmentInput,
  ): Promise<Development> {
    return this.development.createDevelopment(input);
  }
}
