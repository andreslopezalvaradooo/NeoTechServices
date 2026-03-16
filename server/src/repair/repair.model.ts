import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import type { Repair as PrismaRepair } from '../generated/prisma/client.js';

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
  | 'userId'
> {
  @Field(() => ID)
  id: string;

  @Field(() => Int)
  ticketNumber: number;

  @Field(() => String)
  ticketCode: string; // campo normal, lo resuelve el resolver

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

  @Field(() => String, { nullable: true })
  userId: string | null;
}
