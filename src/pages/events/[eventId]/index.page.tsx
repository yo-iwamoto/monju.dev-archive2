import { getServerSideProps } from './index.server';
import { ButtonLink } from '@/components/Button';
import { pagesPath } from '@/lib/$path';
import { useIsOwner } from '@/lib/useIsOwner';
import type { PageProps } from './index.server';

export { getServerSideProps };

export default function Page({ event }: PageProps) {
  const isOwner = useIsOwner(event);

  return (
    <>
      <h1>{event.title}</h1>
      {isOwner && (
        <ButtonLink href={pagesPath.events._eventId(event.id).edit.$url()}>
          編集
        </ButtonLink>
      )}
    </>
  );
}
