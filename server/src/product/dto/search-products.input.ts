import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsString,
  IsOptional,
  IsArray,
  IsInt,
  Min,
  Max,
} from 'class-validator';

@InputType()
export class SearchProductsInput {
  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  q?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Field(() => [String], { nullable: true })
  categories?: string[];

  @IsOptional()
  @IsString()
  @Field(() => String, { defaultValue: 'relevance' })
  order: string = 'relevance';

  @IsOptional()
  @IsInt()
  @Min(1)
  @Field(() => Int, { defaultValue: 1 })
  page: number = 1;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  @Field(() => Int, { defaultValue: 12 })
  limit: number = 12;
}
