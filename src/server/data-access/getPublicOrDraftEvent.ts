import { prisma } from '../lib/prisma';
import type { ServicePrismaClient } from '../lib/prisma';

type Args = {
  id: string;
};

export const getPublicOrDraftEvent = async (
  { id }: Args,
  client: ServicePrismaClient = prisma
) =>
  client.event.findUnique({
    where: { id },
    include: {
      EventAdmin: {
        select: {
          userId: true,
        },
      },
    },
  });
