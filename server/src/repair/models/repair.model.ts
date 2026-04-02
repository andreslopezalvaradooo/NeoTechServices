import { Field, ID, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  RepairStatus,
  type Repair as PrismaRepair,
} from '../../generated/prisma/client.js';

registerEnumType(RepairStatus, {
  name: 'RepairStatus',
  description: 'Current status of a repair',
});

@ObjectType({ description: 'Repair model' })
export class Repair implements Pick<
  PrismaRepair,
  | 'id'
  | 'ticketNumber'
  | 'createdAt'
  | 'updatedAt'
  | 'name'
  | 'phone'
  | 'email'
  | 'type'
  | 'brand'
  | 'model'
  | 'issue'
  | 'problem'
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

  @Field()
  phone: string;

  @Field()
  email: string;

  @Field()
  type: string;

  @Field()
  brand: string;

  @Field()
  model: string;

  @Field()
  issue: string;

  @Field()
  problem: string;

  @Field(() => RepairStatus)
  status: RepairStatus;

  @Field(() => String, { nullable: true })
  userId: string | null;
}
