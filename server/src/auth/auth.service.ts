import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { User } from 'better-auth';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  extractToken(cookieHeader: string | undefined): string | null {
    if (!cookieHeader) return null;

    const cookies = Object.fromEntries(
      cookieHeader.split(';').map((c) => {
        const [key, ...val] = c.trim().split('=');
        return [key.trim(), val.join('=')];
      }),
    );

    const raw =
      cookies['__Secure-better-auth.session_token'] ??
      cookies['better-auth.session_token'];

    console.log({ raw: raw });

    if (!raw) return null;
    const decoded = decodeURIComponent(raw);
    const token = decoded.split('.')[0];
    return token ?? null;
  }

  async validateSession(token: string): Promise<User> {
    const session = await this.prisma.session.findUnique({
      where: { token: token },
      include: { user: true },
    });

    if (!session) throw new UnauthorizedException('Session not found');

    if (session.expiresAt < new Date())
      throw new UnauthorizedException('Session expired');

    return session.user;
  }
}
