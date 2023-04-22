import { prisma } from '../lib/prisma';
import type { ServicePrismaClient } from '../lib/prisma';

type Args = {
  id: string;
};

export const cancelEvent = (
  { id }: Args,
  client: ServicePrismaClient = prisma
) =>
  client.event.update({
    where: { id },
    data: { status: 'CANCELED' },
  });
