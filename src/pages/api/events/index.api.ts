import { addEventAdmin } from '@/server/data-access/addEventAdmin';
import { createDraftEvent } from '@/server/data-access/createDraftEvent';
import { getEvents } from '@/server/data-access/getEvents';
import { getSession } from '@/server/lib/getSession';
import type { NextApiHandler } from 'next';

/**
 * イベント一覧を取得する
 * @todo limit や order などのパラメータによる操作
 */
const GET = ((_, res) => {
  const events = getEvents();

  return res.json({ events });
}) satisfies NextApiHandler;

/**
 * 下書き状態のイベントを作成する
 */
const POST = (async (req, res) => {
  const session = await getSession(req, res);
  if (session === null) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const event = await createDraftEvent();
  await addEventAdmin({ eventId: event.id, userId: session.userId });

  return res.json({
    event,
  });
}) satisfies NextApiHandler;

const handler = ((req, res) => {
  switch (req.method) {
    case 'GET':
      return GET(req, res);
    case 'POST':
      return POST(req, res);
    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}) satisfies NextApiHandler;

export default handler;
