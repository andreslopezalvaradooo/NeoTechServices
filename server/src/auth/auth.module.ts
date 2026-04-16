import { Module } from '@nestjs/common';
import { GqlAuthGuard } from './gql-auth.guard.js';
import { AuthService } from './auth.service.js';

@Module({
  providers: [AuthService, GqlAuthGuard],
  exports: [AuthService, GqlAuthGuard],
})
export class AuthModule {}
