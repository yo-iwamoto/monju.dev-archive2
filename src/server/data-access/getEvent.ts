import { prisma } from '../lib/prisma';
import type { ServicePrismaClient } from '../lib/prisma';

type Args = {
  id: string;
};

/**
 * id でイベントを検索
 * 全ての状態のイベントが含まれる
 */
export const getEvent = ({ id }: Args, client: ServicePrismaClient = prisma) =>
  client.event.findFirst({
    where: {
      id,
    },
    include: {
      EventAdmin: {
        include: {
          user: true,
        },
      },
    },
  });
