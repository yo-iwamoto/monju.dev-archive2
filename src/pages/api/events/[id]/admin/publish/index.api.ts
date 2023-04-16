import { getPublicOrDraftEvent } from '@/server/data-access/getPublicOrDraftEvent';
import { publishEvent } from '@/server/data-access/publishEvent';
import { getSession } from '@/server/lib/getSession';
import { prisma } from '@/server/lib/prisma';
import type { NextApiHandler } from 'next';

/**
 * DRAFT 状態のイベントを PUBLISHED に更新する
 * 想定していないが冪等性のため、PUBLISHED 状態のイベントでも 200 を返す
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

  await prisma.$transaction(async (tx) => {
    // 下書き状態（または公開状態）のイベントが存在するか確認
    const event = await getPublicOrDraftEvent({ id }, tx);
    // 存在しないまたはログイン中のユーザーが管理者でなければ 404
    if (
      !event ||
      !event.EventAdmin.some((admin) => admin.userId === session.userId)
    ) {
      return res.status(404).json({ message: 'Not found' });
    }

    // 既に PUBLISHED であればトランザクションを終了
    if (event.status === 'PUBLISHED') return;

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
