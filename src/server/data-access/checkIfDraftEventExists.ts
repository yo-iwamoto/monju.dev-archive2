import { prisma } from '../lib/prisma';
import type { ServicePrismaClient } from '../lib/prisma';

type Args = {
  id: string;
  userId: string;
};

export const checkIfDraftEventExists = async (
  { id, userId }: Args,
  client: ServicePrismaClient = prisma
) => {
  const result = await client.event.findFirst({
    select: {},
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

  return result !== null;
};
