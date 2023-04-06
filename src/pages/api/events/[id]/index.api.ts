import { nextAuthOptions } from '../../auth/[...nextauth].api';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import type { NextApiHandler } from 'next';

const GET = (async (req, res) => {
  const { id } = req.query;
  // URL 不正の時 404
  if (typeof id !== 'string') {
    return res.status(404).json({ message: 'Not found' });
  }

  const event = await prisma.event.findUnique({ where: { id } });
  // 公開状態のイベントが存在する時返す
  if (event !== null) {
    return res.json({ event });
  }

  const session = await getServerSession(req, res, nextAuthOptions);
  // ログインしていなければ 404
  if (session === null) {
    return res.status(404).json({ message: 'Not found' });
  }

  // 下書き状態のイベントを検索
  const draftEvent = await prisma.draftEventAdmin.findUnique({
    where: {
      userId_draftEventId: {
        userId: session.userId,
        draftEventId: id,
      },
    },
  });
  // 存在しなければ 404
  if (draftEvent === null) {
    return res.status(404).json({ message: 'Not found' });
  }

  // 下書き状態のイベントを返す
  return res.json({ event: draftEvent });
}) satisfies NextApiHandler;

const handler = ((req, res) => {
  switch (req.method) {
    case 'GET':
      return GET(req, res);
    default:
      return res.status(401).json({ message: 'Method not allowed' });
  }
}) satisfies NextApiHandler;

export default handler;
