import { Module } from '@nestjs/common';
import { RepairResolver } from './repair.resolver.js';
import { RepairService } from './repair.service.js';
import { PrismaService } from '../prisma.service.js';
import { GqlAuthGuard } from '../auth/gql-auth.guard.js';

@Module({
  providers: [RepairResolver, RepairService, PrismaService, GqlAuthGuard],
})
export class RepairModule {}
