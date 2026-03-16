import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class GqlAuthGuard implements CanActivate {
  constructor(private readonly config: ConfigService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext<{ req: Request; user?: object }>().req;

    const response = await fetch(
      `${this.config.get('FRONTEND_URL')}/api/auth/get-session`,
      {
        headers: {
          cookie: req.headers.cookie ?? '',
          'user-agent': req.headers['user-agent'] ?? '',
        },
      },
    );

    if (!response.ok)
      throw new UnauthorizedException('Invalid or expired session');

    const data = (await response.json()) as {
      user: { id: string; email: string; name: string };
    } | null;

    if (!data?.user)
      throw new UnauthorizedException('Invalid or expired session');

    ctx.getContext().user = data.user;
    return true;
  }
}
