import { prisma } from '@/lib/prisma';
import { nextAuthOptions } from '@/pages/api/auth/[...nextauth].api';
import { getServerSession } from 'next-auth/next';
import type { NextApiHandler } from 'next';

const POST = (async (req, res) => {
  const { id } = req.query;
  // URL 不正の時 404
  if (typeof id !== 'string') {
    return res.status(404).json({ message: 'Not found' });
  }

  const session = await getServerSession(req, res, nextAuthOptions);
  // ログインしていなければ 401
  if (session === null) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // 下書き状態のイベントを検索
  const draftEvent = await prisma.draftEvent.findUnique({
    include: {
      DraftEventAdmin: {
        where: { userId: session.userId },
      },
    },
    where: { id },
  });
  // 存在しなければ 404
  if (draftEvent === null) {
    return res.status(404).json({ message: 'Not found' });
  }

  const { DraftEventAdmin, ...event } = draftEvent;

  await prisma.event.create({
    data: {
      ...draftEvent,
    },
  });

  // 下書き状態のイベントを返す
  return res.json({ event: draftEvent });
}) satisfies NextApiHandler;

const handler = ((req, res) => {
  switch (req.method) {
    case 'POST':
      return POST(req, res);
    default:
      return res.status(401).json({ message: 'Method not allowed' });
  }
}) satisfies NextApiHandler;

export default handler;
