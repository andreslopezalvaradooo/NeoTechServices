import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

@InputType()
export class CreateConsultingInput {
  @Field()
  @IsString()
  @MinLength(2, { message: 'Name must be at least 2 characters' })
  @MinLength(1, { message: 'Name cannot be empty if provided' })
  name: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(2, { message: 'Company must be at least 2 characters' })
  company: string | null;

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
  @MinLength(1, { message: 'Service cannot be empty if provided' })
  service: string;

  @Field()
  @IsString()
  @MinLength(1, { message: 'Size cannot be empty if provided' })
  size: string;

  @Field()
  @IsString()
  @MinLength(1, { message: 'Challenge cannot be empty if provided' })
  challenge: string;
}
