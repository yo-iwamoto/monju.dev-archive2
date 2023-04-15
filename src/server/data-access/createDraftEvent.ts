import { prisma } from '../lib/prisma';
import type { ServicePrismaClient } from '../lib/prisma';

export const createDraftEvent = async (client: ServicePrismaClient = prisma) =>
  client.event.create({
    data: {
      title: '',
      description: '',
      capacity: 10,
      status: 'DRAFT',
    },
  });
