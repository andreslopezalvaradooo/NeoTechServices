import { Field, ObjectType } from '@nestjs/graphql';
import { ActivityType } from '../../generated/prisma/client.js';
import { registerEnumType } from '@nestjs/graphql';

registerEnumType(ActivityType, {
  name: 'ActivityType',
  description: 'Type of activity event on a repair',
});

@ObjectType()
export class ActivityFeedItem {
  @Field()
  id: string;

  @Field(() => ActivityType)
  type: ActivityType;

  @Field()
  message: string;

  @Field()
  timestamp: string;
}
