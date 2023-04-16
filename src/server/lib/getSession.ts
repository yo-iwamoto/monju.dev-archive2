import { nextAuthOptions } from './nextAuth';
import { getServerSession } from 'next-auth/next';
import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next';

export const getSession = (req: NextApiRequest, res: NextApiResponse) =>
  getServerSession(req, res, nextAuthOptions);

export const getSessionGssp = (
  req: GetServerSidePropsContext['req'],
  res: GetServerSidePropsContext['res']
) => getServerSession(req, res, nextAuthOptions);
