import { getServerSideProps } from './index.server';
import { ButtonLink } from '@/components/Button';
import { pagesPath } from '@/lib/$path';
import { useSession } from 'next-auth/react';
import type { PageProps } from './index.server';

export { getServerSideProps };

export default function Page({ event }: PageProps) {
  const session = useSession();

  const isOwner = event.EventAdmin.some(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    (admin) => admin.userId === session.data?.userId
  );

  return (
    <>
      <h1>{event.title}</h1>
      {isOwner && (
        <ButtonLink href={pagesPath.events._id(event.id).edit.$url()}>
          編集
        </ButtonLink>
      )}
    </>
  );
}
