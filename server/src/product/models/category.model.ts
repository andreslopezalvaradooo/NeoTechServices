import { Field, ID, ObjectType } from '@nestjs/graphql';
import { type Category as PrismaCategory } from '../../generated/prisma/client.js';

@ObjectType({ description: 'Category Model' })
export class Category implements Pick<
  PrismaCategory,
  'id' | 'name' | 'slug' | 'description' | 'image' | 'createdAt' | 'updatedAt'
> {
  @Field(() => ID)
  id!: string;

  @Field()
  name!: string;

  @Field()
  slug!: string;

  @Field(() => String, { nullable: true })
  description!: string | null;

  @Field(() => String, { nullable: true })
  image!: string | null;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}
