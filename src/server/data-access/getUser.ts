import { prisma } from '../lib/prisma';
import type { ServicePrismaClient } from '../lib/prisma';

type Args = {
  id: string;
};

export const getUser = ({ id }: Args, client: ServicePrismaClient = prisma) =>
  client.user.findUnique({ where: { id } });
