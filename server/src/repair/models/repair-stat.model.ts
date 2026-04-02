import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Repair stats model' })
export class RepairStat {
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
