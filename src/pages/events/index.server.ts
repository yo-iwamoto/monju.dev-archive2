import { listEvents } from '@/server/data-access/listEvents';
import { getSessionGssp } from '@/server/lib/getSession';
import { gsspProps } from '@/server/lib/gsspResponse';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

export const getServerSideProps = (async ({ req, res }) => {
  // キャッシュさせない
  res.setHeader('Cache-Control', 'no-store');

  const session = await getSessionGssp(req, res);
  if (session === null)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };

  const events = await listEvents({ userId: session.userId });

  return {
    props: gsspProps({
      events,
    }),
  };
}) satisfies GetServerSideProps;

export type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>;
