import { getPublicEvent } from '@/server/data-access/getPublicEvent';
import type { NextApiHandler } from 'next';

/**
 * 公開状態のイベントを取得して返す
 */
const GET = (async (req, res) => {
  const { id } = req.query;
  // URL 不正の時 404
  if (typeof id !== 'string') {
    return res.status(404).json({ message: 'Not found' });
  }

  // 公開状態のイベントを検索
  const event = await getPublicEvent({ id });
  // イベントが存在しない時 404
  if (event === null) {
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
