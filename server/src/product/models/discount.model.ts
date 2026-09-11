import {
  Field,
  Float,
  ID,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import {
  DiscountType,
  type Discount as PrismaDiscount,
} from '../../generated/prisma/client.js';

registerEnumType(DiscountType, { name: 'DiscountType' });

@ObjectType({ description: 'Discount Model' })
export class Discount implements Pick<
  PrismaDiscount,
  | 'id'
  | 'name'
  | 'type'
  | 'value'
  | 'startsAt'
  | 'endsAt'
  | 'isActive'
  | 'createdAt'
  | 'updatedAt'
> {
  @Field(() => ID)
  id!: string;

  @Field()
  name!: string;

  @Field(() => DiscountType)
  type!: DiscountType;

  @Field(() => Float)
  value!: PrismaDiscount['value'];

  @Field(() => Date, { nullable: true })
  startsAt!: Date | null;

  @Field(() => Date, { nullable: true })
  endsAt!: Date | null;

  @Field()
  isActive!: boolean;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}
