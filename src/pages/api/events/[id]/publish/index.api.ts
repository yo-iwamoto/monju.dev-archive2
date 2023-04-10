import { prisma } from '@/lib/prisma';
import { nextAuthOptions } from '@/pages/api/auth/[...nextauth].api';
import { getServerSession } from 'next-auth/next';
import type { NextApiHandler } from 'next';

const PATCH = (async (req, res) => {
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
        select: {
          userId: true,
        },
      },
    },
    where: { id },
  });
  // 存在しなければ 404
  if (draftEvent === null) {
    return res.status(404).json({ message: 'Not found' });
  }

  const adminUserIds = draftEvent.DraftEventAdmin.map((admin) => admin.userId);
  const isUserMemberOfAdmin = !adminUserIds.includes(session.userId);
  if (!isUserMemberOfAdmin) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { DraftEventAdmin: _, ...event } = draftEvent;

  await prisma.event.create({
    data: {
      draftEventId: id,
      ...event,
    },
  });

  return res.status(200).json({ message: 'published' });
}) satisfies NextApiHandler;

const handler = ((req, res) => {
  switch (req.method) {
    case 'PATCH':
      return PATCH(req, res);
    default:
      return res.status(401).json({ message: 'Method not allowed' });
  }
}) satisfies NextApiHandler;

export default handler;
