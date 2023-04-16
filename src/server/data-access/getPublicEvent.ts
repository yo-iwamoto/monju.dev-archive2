import { prisma } from '../lib/prisma';
import type { ServicePrismaClient } from '../lib/prisma';

type Args = {
  id: string;
};

export const getPublicEvent = (
  { id }: Args,
  client: ServicePrismaClient = prisma
) =>
  client.event.findFirst({
    where: {
      id,
      AND: {
        status: 'PUBLISHED',
      },
    },
    include: {
      EventAdmin: {
        include: {
          user: true,
        },
      },
    },
  });
