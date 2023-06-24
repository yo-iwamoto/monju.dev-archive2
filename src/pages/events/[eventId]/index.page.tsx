import { getServerSideProps } from './index.server';
import { ButtonLink } from '@/components/Button';
import { useIsOwner } from '@/lib/useIsOwner';
import { paths } from '@/lib/paths';
import type { PageProps } from './index.server';

export { getServerSideProps };

export default function Page({ event }: PageProps) {
  const isOwner = useIsOwner(event);

  return (
    <>
      <h1>{event.title}</h1>
      {isOwner && (
        <ButtonLink href={paths.event.edit(event.id)}>編集</ButtonLink>
      )}
    </>
  );
}
