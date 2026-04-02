import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Consulting } from './model/consulting.model.js';
import { CreateConsultingInput } from './dto/create-consulting.input.js';
import { ConsultingService } from './consulting.service.js';

@Resolver(() => Consulting)
export class ConsultingResolver {
  constructor(private readonly consulting: ConsultingService) {}

  @Mutation(() => Consulting)
  async createConsulting(
    @Args('input') input: CreateConsultingInput,
  ): Promise<Consulting> {
    return this.consulting.createConsulting(input);
  }
}
