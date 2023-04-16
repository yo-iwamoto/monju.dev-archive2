import { prisma } from '../lib/prisma';
import type { ServicePrismaClient } from '../lib/prisma';

export const createDraftEvent = async (client: ServicePrismaClient = prisma) =>
  client.event.create({
    select: {
      id: true,
    },
    data: {
      title: '新しいイベント',
      description: '',
      capacity: 10,
      status: 'DRAFT',
    },
  });
