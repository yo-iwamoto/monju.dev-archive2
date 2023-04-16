import { getServerSideProps } from './index.server';
import { Seo } from './seo';
import { Button } from '@/components/Button';
import { api } from '@/lib/api';
import { pagesPath } from '@/lib/$path';
import { CenteredContainer } from '@/components/CenteredContainer';
import { useRouter } from 'next/router';
import type { PageProps } from './index.server';

export { getServerSideProps };

export default function Page({ event }: PageProps) {
  const router = useRouter();

  const title = event.title || 'イベント';
  const publish = async () => {
    await api.events._id(event.id).admin.publish.patch();
    router.push(pagesPath.events._eventId(event.id).$url());
  };

  const save = async () => {
    await api.events.draft._id(event.id).$put({ body: {} });
  };

  const cancel = async () => {
    await api.events._id(event.id).admin.cancel.$patch();
  };

  return (
    <>
      <Seo eventTitle={title} />
      <CenteredContainer className='py-4'>
        <h1 className='font-bold text-3xl'>{title}の編集</h1>
        <p>{event.status}</p>

        {event.status === 'DRAFT' && <Button onClick={publish}>公開</Button>}
        {event.status === 'PUBLISHED' && (
          <Button onClick={cancel}>キャンセル</Button>
        )}
        <Button onClick={save}>保存</Button>
      </CenteredContainer>
    </>
  );
}
