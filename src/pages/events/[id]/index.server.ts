import { gsspProps } from '@/server/lib/gsspResponse';
import { getEvent } from '@/server/data-access/getEvent';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

export const getServerSideProps = (async ({ query, res }) => {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  );

  const { id } = query;
  // URL が不正な場合 404
  if (typeof id !== 'string') return { notFound: true };

  // id で下書き状態のイベントを検索
  const event = await getEvent({ id });

  // イベントが存在しないかログイン中のユーザーが管理者でなければ 404
  if (!event) return { notFound: true };

  return {
    props: gsspProps({
      event,
    }),
  };
}) satisfies GetServerSideProps;

export type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>;
