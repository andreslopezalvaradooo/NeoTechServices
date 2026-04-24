import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthService } from './auth.service.js';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(GqlAuthGuard.name);

  constructor(private readonly authService: AuthService) {
    super();
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = this.getRequest(context);

    const cookieHeader = request.headers?.cookie as string | undefined;

    if (!cookieHeader) {
      this.logger.warn(`No cookie header — origin: ${request.headers?.origin}`);
      throw new UnauthorizedException('Token required');
    }

    const token = this.authService.extractToken(cookieHeader);

    if (!token) {
      throw new UnauthorizedException('Token required');
    }

    const user = await this.authService.validateSession(token);

    if (!user) {
      throw new UnauthorizedException('Invalid or expired session');
    }

    request.user = user;
    return true;
  }
}