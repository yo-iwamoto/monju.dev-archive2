import { getDraftEvent } from '@/server/data-access/getDraftEvent';
import { getSession } from '@/server/lib/getSession';
import type { NextApiHandler } from 'next';

/**
 * 下書き状態のイベントを取得して返す
 * ログイン中のユーザーが管理者であるかどうかを検証する
 */
const GET = (async (req, res) => {
  const { id } = req.query;
  // URL 不正の時 404
  if (typeof id !== 'string') {
    return res.status(404).json({ message: 'Not found' });
  }

  const session = await getSession(req, res);
  // ログインしていなければ 404
  if (session === null) {
    return res.status(404).json({ message: 'Not found' });
  }

  // 下書き状態のイベントを検索
  const event = await getDraftEvent({ id, userId: session.userId });
  // 存在しなければ 404
  if (event === null) {
    return res.status(404).json({ message: 'Not found' });
  }

  // 下書き状態のイベントを返す
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
