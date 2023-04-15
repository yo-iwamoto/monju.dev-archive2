import { prisma } from '../lib/prisma';
import type { ServicePrismaClient } from '../lib/prisma';

type Args = {
  id: string;
  data: {
    title: string;
    description: string;
    capacity: number;
  };
};

export const updateEvent = (
  { id, data }: Args,
  client: ServicePrismaClient = prisma
) => client.event.update({ where: { id }, data });
