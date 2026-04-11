import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module.js';
import { RepairService } from './repair.service.js';
import { RepairResolver } from './repair.resolver.js';

@Module({
  imports:[AuthModule],
  providers: [RepairService, RepairResolver],
})
export class RepairModule {}
