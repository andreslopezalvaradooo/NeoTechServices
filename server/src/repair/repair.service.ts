import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateRepairInput } from './dto/create-repair.input.js';
import { Repair } from './models/repair.model.js';
import {
  ActivityType,
  Repair as PrismaRepair,
} from '../generated/prisma/client.js';
import { TrackRepairInput } from './dto/track-repair.input.js';
import { FindRepairsByEmailInput } from './dto/find-repairs-by-email.input.js';
import { RepairActivity } from './models/repair-activity.model.js';
import { RepairStat } from './models/repair-stat.model.js';
import { NewRepairInput } from './dto/new-repair.input.js';

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

  async newRepair(userId: string, input: NewRepairInput): Promise<Repair> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { name: true, email: true },
    });

    if (!user?.name) {
      throw new BadRequestException(
        'Your account has no name set. Please update your profile first.',
      );
    }

    const repair = await this.prisma.repair.create({
      data: { ...input, userId, name: user?.name, email: user?.email },
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

  async findByUserId(userId: string, limit?: number): Promise<Repair[]> {
    const repairs = await this.prisma.repair.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });

    return repairs.map((repair) => this.toRepairModel(repair));
  }

  private buildMessage(type: ActivityType, ticketCode: string): string {
    const messages: Record<ActivityType, string> = {
      assigned: `Technician assigned to ${ticketCode}`,
      completed: `${ticketCode} marked as completed`,
      waiting: `${ticketCode} waiting on spare part`,
      approval: `Approval needed for ${ticketCode}`,
      created: `New repair ${ticketCode} submitted`,
    };
    return messages[type] ?? `Update on ${ticketCode}`;
  }

  async getActivityFeed(
    userId: string,
    limit = 4,
  ): Promise<RepairActivity[]> {
    const events = await this.prisma.repairEvent.findMany({
      where: { repair: { userId } },
      orderBy: { createdAt: 'desc' },
      take: limit,
      include: { repair: { select: { ticketNumber: true } } },
    });

    return events.map((e) => ({
      id: e.id,
      type: e.type,
      message: this.buildMessage(
        e.type,
        `REP-${String(e.repair.ticketNumber).padStart(6, '0')}`,
      ),
      timestamp: e.createdAt.toISOString(),
    }));
  }

  async getRepairStats(userId: string): Promise<RepairStat> {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    const [active, pending, completedThisMonth, completedLastMonth] =
      await Promise.all([
        this.prisma.repair.count({ where: { userId, status: 'in_progress' } }),
        this.prisma.repair.count({ where: { userId, status: 'pending' } }),
        this.prisma.repair.count({
          where: {
            userId,
            status: 'completed',
            updatedAt: { gte: startOfMonth },
          },
        }),
        this.prisma.repair.count({
          where: {
            userId,
            status: 'completed',
            updatedAt: { gte: startOfLastMonth, lt: startOfMonth },
          },
        }),
      ]);

    const completedRepairs = await this.prisma.repair.findMany({
      where: { userId, status: 'completed' },
      select: { createdAt: true, updatedAt: true },
    });

    const avgDays =
      completedRepairs.length > 0
        ? completedRepairs.reduce((acc, r) => {
            const days =
              (r.updatedAt.getTime() - r.createdAt.getTime()) / 86_400_000;
            return acc + days;
          }, 0) / completedRepairs.length
        : 0;

    const completedDelta =
      completedLastMonth > 0
        ? Math.round(
            ((completedThisMonth - completedLastMonth) / completedLastMonth) *
              100,
          )
        : 0;

    return {
      active,
      activeDelta: 0, // puedes calcular comparando con la semana pasada si lo necesitas
      pending,
      completed: completedThisMonth,
      completedDelta,
      avgDays: Math.round(avgDays * 10) / 10,
    };
  }
}
