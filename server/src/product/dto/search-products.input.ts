import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsOptional, IsArray } from 'class-validator';

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
}
