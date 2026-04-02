import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateConsultingInput } from './dto/create-consulting.input.js';
import { Consulting } from './model/consulting.model.js';
import { type Consulting as PrismaConsulting } from '../generated/prisma/client.js';

@Injectable()
export class ConsultingService {
  constructor(private readonly prisma: PrismaService) {}

  async createConsulting(input: CreateConsultingInput): Promise<Consulting> {
    const user = await this.prisma.user.findUnique({
      where: { email: input.email },
      select: { id: true },
    });

    const consulting = await this.prisma.consulting.create({
      data: { ...input, userId: user?.id ?? null },
    });

    return this.toConsultingModel(consulting);
  }

  private toConsultingModel(consulting: PrismaConsulting): Consulting {
    return {
      ...consulting,
      ticketCode: `CON-${String(consulting.ticketNumber).padStart(6, '0')}`,
    };
  }
}
