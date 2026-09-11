import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsString, Length, Max, Min } from 'class-validator';

@InputType()
export class CreateReviewInput {
  @Field()
  @IsString()
  productId!: string;

  @Field(() => Int)
  @IsInt()
  @Min(1)
  @Max(5)
  rating!: number;

  @Field()
  @IsString()
  @Length(3, 100)
  title!: string;

  @Field()
  @IsString()
  @Length(10, 1000)
  body!: string;

  @Field()
  @IsString()
  @Length(2, 80)
  author!: string;
}
