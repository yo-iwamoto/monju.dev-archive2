import { nextAuthOptions } from './nextAuth';
import { getServerSession } from 'next-auth/next';
import type { NextApiRequest, NextApiResponse } from 'next';

export const getSession = (req: NextApiRequest, res: NextApiResponse) =>
  getServerSession(req, res, nextAuthOptions);
