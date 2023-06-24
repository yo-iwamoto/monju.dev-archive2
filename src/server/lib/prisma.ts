import { PrismaClient } from '@prisma/client';
import type * as runtime from '@prisma/client/runtime/library';

export const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

/**
 * prisma.$transaction で受け取れる tx が PrismaClient の部分型なのでこれに合わせる
 */
export type ServicePrismaClient = Omit<PrismaClient, runtime.ITXClientDenyList>;
