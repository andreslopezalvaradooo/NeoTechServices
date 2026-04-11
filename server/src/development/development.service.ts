import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateDevelopmentInput } from './dto/create-development.input.js';
import { Development } from './models/development.model.js';
import { Development as PrismaDevelopment } from '../generated/prisma/client.js';

@Injectable()
export class DevelopmentService {
  constructor(private readonly prisma: PrismaService) {}

  private toDevelopmentModel(development: PrismaDevelopment): Development {
    return {
      ...development,
      ticketCode: `DEV-${String(development.ticketNumber).padStart(6, '0')}`,
    };
  }

  async createDevelopment(input: CreateDevelopmentInput): Promise<Development> {
    const user = await this.prisma.user.findUnique({
      where: { email: input.email },
      select: { id: true },
    });

    const development = await this.prisma.development.create({
      data: { ...input, userId: user?.id ?? null },
    });

    return this.toDevelopmentModel(development);
  }
}
