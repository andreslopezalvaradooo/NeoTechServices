import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString, MinLength } from 'class-validator';

@InputType()
export class CreateDevelopmentInput {
  @Field()
  @IsString()
  @MinLength(2, { message: 'Name must be at least 2 characters' })
  @MinLength(1, { message: 'Name cannot be empty if provided' })
  name: string;

  @Field()
  @IsString()
  @MinLength(10, { message: 'Phone must be at least 10 characters' })
  @MinLength(1, { message: 'Phone cannot be empty if provided' })
  phone: string;

  @Field()
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @Field()
  @IsString()
  @MinLength(1, { message: 'Type cannot be empty if provided' })
  type: string;

  @Field()
  @IsString()
  @MinLength(1, { message: 'Budget cannot be empty if provided' })
  budget: string;

  @Field()
  @IsString()
  @MinLength(1, { message: 'Timeline cannot be empty if provided' })
  timeline: string;

  @Field()
  @IsString()
  @MinLength(1, { message: 'Description cannot be empty if provided' })
  description: string;
}
