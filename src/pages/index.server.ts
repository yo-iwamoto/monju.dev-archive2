import { getEvents } from '@/server/data-access/getEvents';
import { gsspProps } from '@/server/lib/gsspResponse';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

export const getServerSideProps = (async () => {
  const events = await getEvents();

  return {
    props: gsspProps({
      events,
    }),
  };
}) satisfies GetServerSideProps;

export type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>;
