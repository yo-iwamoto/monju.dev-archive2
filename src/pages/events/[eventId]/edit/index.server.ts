import { gsspProps } from '@/server/lib/gsspResponse';
import { getEvent } from '@/server/data-access/getEvent';
import { getSessionGssp } from '@/server/lib/getSession';
import { unstable_serialize } from 'swr';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

export const getServerSideProps = (async ({ query, req, res }) => {
  // 編集ページなのでキャッシュさせない
  res.setHeader('Cache-Control', 'no-store');

  const { eventId: id } = query;
  // URL が不正な場合 404
  if (typeof id !== 'string') return { notFound: true };

  const session = await getSessionGssp(req, res);
  // ログインしていなければ 404
  if (session === null)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };

  // id でイベントを検索
  const event = await getEvent({ id });
  if (event === null) return { notFound: true };

  // 下書きであれば、ログイン中のユーザーが管理者でなければ 404
  if (
    event.status === 'DRAFT' &&
    !event.EventAdmin.some((admin) => admin.userId === session.userId)
  ) {
    return { notFound: true };
  }

  return {
    props: gsspProps({
      event,
      fallback: {
        [unstable_serialize(['event', id])]: event,
      },
    }),
  };
}) satisfies GetServerSideProps;

export type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>;
