import { getUser } from '@/server/data-access/getUser';
import { getSession } from '@/server/lib/getSession';
import type { NextApiHandler } from 'next';

/**
 * ログインユーザーの登録情報を取得して返す
 */
const handler = (async (req, res) => {
  const session = await getSession(req, res);
  if (session === null) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const user = await getUser({ id: session.userId });

  return res.json(user);
}) satisfies NextApiHandler;

export default handler;
