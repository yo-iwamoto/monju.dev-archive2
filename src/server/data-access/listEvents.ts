import { prisma } from '../lib/prisma';
import type { ServicePrismaClient } from '../lib/prisma';

type Args = {
  userId: string;
};

export const listEvents = async (
  { userId }: Args,
  client: ServicePrismaClient = prisma
) =>
  client.event.findMany({
    where: {
      EventAdmin: {
        some: {
          userId,
        },
      },
    },
  });
