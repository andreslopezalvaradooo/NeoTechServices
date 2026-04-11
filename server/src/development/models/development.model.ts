import { Field, ID, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  DevelopmentStatus,
  type Development as PrismaDevelopment,
} from '../../generated/prisma/client.js';

registerEnumType(DevelopmentStatus, {
  name: 'DevelopmentStatus',
  description: 'Current status of a development',
});

@ObjectType({ description: 'Development model' })
export class Development implements Pick<
  PrismaDevelopment,
  | 'id'
  | 'ticketNumber'
  | 'createdAt'
  | 'updatedAt'
  | 'name'
  | 'phone'
  | 'email'
  | 'type'
  | 'budget'
  | 'timeline'
  | 'description'
  | 'userId'
> {
  @Field(() => ID)
  id: string;

  @Field(() => Int)
  ticketNumber: number;

  @Field(() => String)
  ticketCode: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field()
  name: string;

  @Field()
  phone: string;

  @Field()
  email: string;

  @Field()
  type: string;

  @Field()
  budget: string;

  @Field()
  timeline: string;

  @Field()
  description: string;

  @Field(() => DevelopmentStatus)
  status: DevelopmentStatus;

  @Field(() => String, { nullable: true })
  userId: string | null;
}
