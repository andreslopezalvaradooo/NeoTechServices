import { Field, InputType } from '@nestjs/graphql';
import { IsString, MinLength } from 'class-validator';

@InputType()
export class NewRepairInput {
  @Field()
  @IsString()
  @MinLength(10, { message: 'Phone must be at least 10 characters' })
  @MinLength(1, { message: 'Phone cannot be empty if provided' })
  phone: string;

  @Field()
  @IsString()
  @MinLength(1, { message: 'Type cannot be empty if provided' })
  type: string;

  @Field()
  @IsString()
  @MinLength(1, { message: 'Brand cannot be empty if provided' })
  brand: string;

  @Field()
  @IsString()
  @MinLength(1, { message: 'Model cannot be empty if provided' })
  model: string;

  @Field()
  @IsString()
  @MinLength(1, { message: 'Issue cannot be empty if provided' })
  issue: string;

  @Field()
  @IsString()
  @MinLength(1, { message: 'Problem cannot be empty if provided' })
  problem: string;
}
