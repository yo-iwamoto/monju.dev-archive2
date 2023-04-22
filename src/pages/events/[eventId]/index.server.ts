import { gsspProps } from '@/server/lib/gsspResponse';
import { getPublicEvent } from '@/server/data-access/getPublicEvent';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

export const getServerSideProps = (async ({ query, res }) => {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  );

  const { eventId: id } = query;
  // URL が不正な場合 404
  if (typeof id !== 'string') return { notFound: true };

  // id でイベントを検索
  const event = await getPublicEvent({ id });

  // イベントが存在ければ 404
  if (!event) return { notFound: true };

  return {
    props: gsspProps({
      event,
    }),
  };
}) satisfies GetServerSideProps;

export type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>;
