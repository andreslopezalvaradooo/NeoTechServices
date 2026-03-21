import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RepairStats {
  @Field()
  active: number;

  @Field()
  activeDelta: number;

  @Field()
  pending: number;

  @Field()
  completed: number;

  @Field()
  completedDelta: number;

  @Field()
  avgDays: number;
}
