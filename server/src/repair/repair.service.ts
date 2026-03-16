import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';
import { CreateRepairInput } from './dto/create-repair.input.js';
import { Repair } from './repair.model.js';
import { Repair as PrismaRepair } from '../generated/prisma/client.js';
import { TrackRepairInput } from './dto/track-repair.input.js';
import { FindRepairsByEmailInput } from './dto/find-repairs-by-email.input.js';

@Injectable()
export class RepairService {
  constructor(private readonly prisma: PrismaService) {}

  async createRepair(input: CreateRepairInput): Promise<Repair> {
    const user = await this.prisma.user.findUnique({
      where: { email: input.email },
      select: { id: true },
    });

    const repair = await this.prisma.repair.create({
      data: { ...input, userId: user?.id ?? null },
    });

    return this.toRepairModel(repair);
  }

  private toRepairModel(repair: PrismaRepair): Repair {
    return {
      ...repair,
      ticketCode: `REP-${String(repair.ticketNumber).padStart(6, '0')}`,
    };
  }

  async trackRepair(input: TrackRepairInput): Promise<Repair> {
    const ticketNumber = this.parseTicket(input.ticketCode);

    if (isNaN(ticketNumber))
      throw new NotFoundException(`Ticket ${input.ticketCode} not found`);

    const repair = await this.prisma.repair.findUnique({
      where: { ticketNumber },
    });

    if (!repair)
      throw new NotFoundException(`Ticket ${input.ticketCode} not found`);

    return this.toRepairModel(repair);
  }

  private parseTicket(ticketCode: string): number {
    return parseInt(ticketCode.replace('REP-', ''), 10);
  }

  async findRepairsByEmail(input: FindRepairsByEmailInput): Promise<Repair[]> {
    const repairs = await this.prisma.repair.findMany({
      where: { email: input.email },
      orderBy: { createdAt: 'desc' },
    });

    return repairs.map((repair) => this.toRepairModel(repair));
  }

  async findByUserId(userId: string): Promise<Repair[]> {
    const repairs = await this.prisma.repair.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    return repairs.map((repair) => this.toRepairModel(repair));
  }
}
