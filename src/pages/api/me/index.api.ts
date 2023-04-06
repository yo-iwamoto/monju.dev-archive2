import { nextAuthOptions } from '../auth/[...nextauth].api';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import type { NextApiHandler } from 'next';

const handler = (async (req, res) => {
  const session = await getServerSession(req, res, nextAuthOptions);
  if (session === null) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
  });

  return res.json(user);
}) satisfies NextApiHandler;

export default handler;
