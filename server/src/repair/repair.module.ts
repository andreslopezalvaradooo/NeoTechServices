import { Module } from '@nestjs/common';
import { RepairResolver } from './repair.resolver.js';
import { RepairService } from './repair.service.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports:[AuthModule],
  providers: [RepairService, RepairResolver],
})
export class RepairModule {}
