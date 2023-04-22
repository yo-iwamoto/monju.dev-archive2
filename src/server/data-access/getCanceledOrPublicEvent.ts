import { prisma } from '../lib/prisma';
import type { ServicePrismaClient } from '../lib/prisma';

type Args = {
  id: string;
};

export const getCanceledOrPublicEvent = (
  { id }: Args,
  client: ServicePrismaClient = prisma
) =>
  client.event.findFirst({
    where: {
      id,
      AND: {
        status: {
          not: 'DRAFT',
        },
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
