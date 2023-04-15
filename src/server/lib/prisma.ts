import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

/**
 * prisma.$transaction で受け取れる tx が PrismaClient の部分型なのでこれに合わせる
 */
export type ServicePrismaClient = Omit<
  PrismaClient<{ log: ('info' | 'query' | 'warn' | 'error')[] }, never, false>,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'
>;
