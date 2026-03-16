import { Field, InputType } from '@nestjs/graphql';
import { IsString, Matches } from 'class-validator';

@InputType()
export class TrackRepairInput {
  @Field()
  @IsString()
  @Matches(/^REP-\d{6}$/, { message: 'Invalid ticket code format' })
  ticketCode: string;
}
