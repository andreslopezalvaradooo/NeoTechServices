import { Module } from "@nestjs/common";
import { GqlAuthGuard } from "./gql-auth.guard.js";

@Module({
  providers: [GqlAuthGuard],
  exports: [GqlAuthGuard],
})
export class AuthModule {}
