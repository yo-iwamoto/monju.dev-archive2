import { getEvent } from '@/server/data-access/getEvent';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

export const getServerSideProps = (async ({ query }) => {
  const { id } = query;
  if (typeof id !== 'string') return { notFound: true };

  const event = await getEvent({ id });
  if (!event) return { notFound: true };

  return {
    props: {
      event,
    },
  };
}) satisfies GetServerSideProps;

export type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>;
