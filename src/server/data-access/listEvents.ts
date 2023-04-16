import { prisma } from '../lib/prisma';
import type { ServicePrismaClient } from '../lib/prisma';

export const listEvents = (client: ServicePrismaClient = prisma) =>
  client.event.findMany({
    take: 10,
    where: {
      status: 'PUBLISHED',
    },
  });
