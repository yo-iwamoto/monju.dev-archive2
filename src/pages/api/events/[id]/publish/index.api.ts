import { checkIfDraftEventExists } from '@/server/data-access/checkIfDraftEventExists';
import { publishEvent } from '@/server/data-access/publishEvent';
import { getSession } from '@/server/lib/getSession';
import { transaction } from '@/server/lib/transaction';
import type { NextApiHandler } from 'next';

/**
 * DRAFT 状態のイベントを PUBLISHED に更新する
 * ログイン中のユーザーが管理者であるかどうかを検証する
 */
const PATCH = (async (req, res) => {
  const { id } = req.query;
  // URL 不正の時 404
  if (typeof id !== 'string') {
    return res.status(404).json({ message: 'Not found' });
  }

  const session = await getSession(req, res);
  // ログインしていなければ 401
  if (session === null) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  await transaction(async (tx) => {
    // 下書き状態のイベントが存在するか確認
    const eventExists = await checkIfDraftEventExists(
      { id, userId: session.userId },
      tx
    );
    if (!eventExists) {
      return res.status(404).json({ message: 'Not found' });
    }

    // status を 'PUBLISHED' に更新
    await publishEvent({ id }, tx);
  });

  return res.status(200).json({ message: 'Updated' });
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
