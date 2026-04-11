import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module.js';
import { DevelopmentService } from './development.service.js';
import { DevelopmentResolver } from './development.resolver.js';

@Module({
  imports: [AuthModule],
  providers: [DevelopmentService, DevelopmentResolver],
})
export class DevelopmentModule {}
