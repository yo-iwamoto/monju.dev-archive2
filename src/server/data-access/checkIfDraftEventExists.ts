import { prisma } from '../lib/prisma';
import type { ServicePrismaClient } from '../lib/prisma';

type Args = {
  id: string;
};

export const checkIfDraftEventExists = async (
  { id }: Args,
  client: ServicePrismaClient = prisma
) => {
  const result = await client.event.findFirst({
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

  return result !== null;
};
