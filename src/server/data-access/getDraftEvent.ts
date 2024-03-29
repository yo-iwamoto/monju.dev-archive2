import { prisma } from '../lib/prisma';
import type { ServicePrismaClient } from '../lib/prisma';

type Args = {
  id: string;
};

export const getDraftEvent = (
  { id }: Args,
  client: ServicePrismaClient = prisma
) =>
  client.event.findFirst({
    where: {
      id,
      AND: {
        status: 'DRAFT',
      },
    },
    include: {
      EventAdmin: {
        where: {
          eventId: id,
        },
        select: {
          userId: true,
        },
      },
    },
  });
