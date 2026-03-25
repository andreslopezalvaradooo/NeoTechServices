import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Repair } from './repair.model.js';
import { RepairService } from './repair.service.js';
import { CreateRepairInput } from './dto/create-repair.input.js';
import { TrackRepairInput } from './dto/track-repair.input.js';
import { FindRepairsByEmailInput } from './dto/find-repairs-by-email.input.js';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from '../auth/current-user.decorator.js';
import { GqlAuthGuard } from '../auth/gql-auth.guard.js';
import { ActivityFeedItem } from './dto/activity-feed-item.js';
import { RepairStats } from './repair-stats.js';
import { NewRepairInput } from './dto/new-repair.input.js';

@Resolver(() => Repair)
export class RepairResolver {
  constructor(private readonly repair: RepairService) {}

  @Mutation(() => Repair)
  async createRepair(@Args('input') input: CreateRepairInput): Promise<Repair> {
    return this.repair.createRepair(input);
  }

  @Mutation(() => Repair)
  @UseGuards(GqlAuthGuard)
  async newRepair(
    @CurrentUser() user: { id: string },
    @Args('input') input: NewRepairInput,
  ): Promise<Repair> {
    return this.repair.newRepair(user.id, input);
  }

  @Query(() => Repair)
  async trackRepair(@Args('input') input: TrackRepairInput): Promise<Repair> {
    return this.repair.trackRepair(input);
  }

  @Query(() => [Repair])
  async findRepairsByEmail(
    @Args('input') input: FindRepairsByEmailInput,
  ): Promise<Repair[]> {
    return this.repair.findRepairsByEmail(input);
  }

  @Query(() => [Repair])
  @UseGuards(GqlAuthGuard)
  async myRepairs(
    @CurrentUser() user: { id: string },
    @Args('limit', { type: () => Int, nullable: true }) limit?: number,
  ): Promise<Repair[]> {
    return this.repair.findByUserId(user.id, limit);
  }

  @Query(() => [ActivityFeedItem])
  @UseGuards(GqlAuthGuard)
  async getActivityFeed(
    @CurrentUser() user: { id: string },
    @Args('limit', { type: () => Int, nullable: true, defaultValue: 4 })
    limit: number,
  ): Promise<ActivityFeedItem[]> {
    return this.repair.getActivityFeed(user.id, limit);
  }

  @Query(() => RepairStats)
  @UseGuards(GqlAuthGuard)
  async getRepairStats(
    @CurrentUser() user: { id: string },
  ): Promise<RepairStats> {
    return this.repair.getRepairStats(user.id);
  }
}
