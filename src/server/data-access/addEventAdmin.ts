import { prisma } from '../lib/prisma';
import type { ServicePrismaClient } from '../lib/prisma';

type Args = {
  eventId: string;
  userId: string;
};

export const addEventAdmin = (
  { eventId, userId }: Args,
  client: ServicePrismaClient = prisma
) =>
  client.eventAdmin.create({
    data: {
      eventId,
      userId,
    },
  });
