import { getDraftEvent } from '@/server/data-access/getDraftEvent';
import { getSession } from '@/server/lib/getSession';
import { updateEvent } from '@/server/data-access/updateEvent';
import { z } from 'zod';
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
  const event = await getDraftEvent({ id });
  // 存在しないまたはログイン中のユーザーが管理者でなければ 404
  if (
    event === null ||
    event.EventAdmin.some((admin) => admin.userId === session.userId)
  ) {
    return res.status(404).json({ message: 'Not found' });
  }

  // 下書き状態のイベントを返す
  return res.json({ event });
}) satisfies NextApiHandler;

const putReqBodySchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  capacity: z.number().min(1).max(500).optional(),
});

/**
 * 下書き状態のイベントを更新する
 */
const PUT = (async (req, res) => {
  const { id } = req.query;
  // URL 不正の時 404
  if (typeof id !== 'string') {
    return res.status(404).json({ message: 'Not found' });
  }

  const parsed = putReqBodySchema.safeParse(req.body);
  if (!parsed.success) {
    return res
      .status(400)
      .json({ message: 'Bad Request', errors: parsed.error });
  }

  const { data } = parsed;
  await updateEvent({ id, data });

  return res.status(200).json({ message: 'Updated' });
}) satisfies NextApiHandler;

const handler = ((req, res) => {
  switch (req.method) {
    case 'GET':
      return GET(req, res);
    case 'PUT':
      return PUT(req, res);
    default:
      return res.status(401).json({ message: 'Method not allowed' });
  }
}) satisfies NextApiHandler;

export default handler;
