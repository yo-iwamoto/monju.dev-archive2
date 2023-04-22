import { Button } from '@/components/Button';
import { pagesPath } from '@/lib/$path';
import { api } from '@/lib/api';
import { useRouter } from 'next/router';

export const NewEventButton = () => {
  const router = useRouter();

  const createEvent = async () => {
    // 下書き状態のイベントを作成
    const res = await api.events.$post();
    // 作成したイベントの編集ページに遷移
    router.push(pagesPath.events._eventId(res.event.id).edit.$url());
  };

  return <Button onClick={createEvent}>イベントを作成</Button>;
};
