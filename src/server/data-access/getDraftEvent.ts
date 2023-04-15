import { prisma } from '../lib/prisma';
import type { ServicePrismaClient } from '../lib/prisma';

type Args = {
  id: string;
  userId: string;
};

export const getDraftEvent = (
  { id, userId }: Args,
  client: ServicePrismaClient = prisma
) =>
  client.event.findFirst({
    where: {
      id,
      AND: {
        status: 'DRAFT',
        AND: {
          EventAdmin: {
            some: {
              id: userId,
            },
          },
        },
      },
    },
  });
