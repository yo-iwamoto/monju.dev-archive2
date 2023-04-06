import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import type { NextApiHandler } from 'next';

const GET = ((_, res) => {
  const events = prisma.event.findMany();

  return res.json({ events });
}) satisfies NextApiHandler;

const POST = (async (_, res) => {
  const session = await getServerSession();
  if (session === null) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const event = await prisma.draftEvent.create({ data: {} });

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
