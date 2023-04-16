import { prisma } from '../lib/prisma';
import type { ServicePrismaClient } from '../lib/prisma';

export const getEvents = (client: ServicePrismaClient = prisma) =>
  client.event.findMany({
    take: 10,
    where: {
      status: 'PUBLISHED',
    },
  });
