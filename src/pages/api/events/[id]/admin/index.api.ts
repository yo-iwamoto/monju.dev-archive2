import { getEvent } from '@/server/data-access/getEvent';
import { getSession } from '@/server/lib/getSession';
import type { NextApiHandler } from 'next';

/**
 * イベントを取得して返す
 * 管理者による認可を行い、状態に関わらず返す
 */
const GET = (async (req, res) => {
  const { id } = req.query;
  // URL 不正の時 404
  if (typeof id !== 'string') {
    return res.status(404).json({ message: 'Not found' });
  }

  const session = await getSession(req, res);
  if (session === null) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // 公開状態のイベントを検索
  const event = await getEvent({ id });
  // イベントが存在しない時 404
  if (
    event === null ||
    !event.EventAdmin.some((admin) => admin.userId === session.userId)
  ) {
    return res.status(404).json({ message: 'Not found' });
  }

  return res.json({ event });
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
