import { getServerSideProps } from './index.server';
import { Seo } from './seo';
import { Button } from '@/components/Button';
import { api } from '@/lib/api';
import { pagesPath } from '@/lib/$path';
import { useRouter } from 'next/router';
import type { PageProps } from './index.server';

export { getServerSideProps };

export default function Page({ event }: PageProps) {
  const router = useRouter();

  const title = event.title || 'イベント';
  const publish = async () => {
    await api.events._id(event.id).publish.patch();
    router.push(pagesPath.events._id(event.id).$url());
  };

  const save = async () => {
    await api.events.draft._id(event.id).$put({ body: {} });
  };

  return (
    <>
      <Seo eventTitle={title} />
      <h1 className='font-bold text-3xl'>{title}の編集</h1>
      <p>{event.status}</p>

      <Button type='button' onClick={publish}>
        公開
      </Button>
      <Button type='button' onClick={save}>
        保存
      </Button>
    </>
  );
}
