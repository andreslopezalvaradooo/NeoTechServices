import { Int, Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  ConsultingStatus,
  type Consulting as PrismaConsulting,
} from '../../generated/prisma/client.js';

registerEnumType(ConsultingStatus, {
  name: 'ConsultingStatus',
  description: 'Current status of a consulting',
});

@ObjectType({ description: 'Consulting model' })
export class Consulting implements Pick<
  PrismaConsulting,
  | 'id'
  | 'ticketNumber'
  | 'createdAt'
  | 'updatedAt'
  | 'name'
  | 'company'
  | 'phone'
  | 'email'
  | 'service'
  | 'size'
  | 'challenge'
  | 'status'
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

  @Field(() => String, { nullable: true })
  company: string | null;

  @Field()
  phone: string;

  @Field()
  email: string;

  @Field()
  service: string;

  @Field()
  size: string;

  @Field()
  challenge: string;

  @Field(() => ConsultingStatus)
  status: ConsultingStatus;

  @Field(() => String, { nullable: true })
  userId: string | null;
}
