import { listEvents } from '@/server/data-access/listEvents';
import { gsspProps } from '@/server/lib/gsspResponse';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

export const getServerSideProps = (async ({ res }) => {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  );

  const events = await listEvents();

  return {
    props: gsspProps({
      events,
    }),
  };
}) satisfies GetServerSideProps;

export type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>;
