import { Module } from '@nestjs/common';
import { ConsultingResolver } from './consulting.resolver.js';
import { ConsultingService } from './consulting.service.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports: [AuthModule],
  providers: [ConsultingService, ConsultingResolver],
})
export class ConsultingModule {}
