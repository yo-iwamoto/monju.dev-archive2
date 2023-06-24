import { Button } from '@/components/Button';
import { api } from '@/lib/api';
import { paths } from '@/lib/paths';
import { useRouter } from 'next/router';

export const NewEventButton = () => {
  const router = useRouter();

  const createEvent = async () => {
    // 下書き状態のイベントを作成
    const res = await api.events.$post();
    // 作成したイベントの編集ページに遷移
    router.push(paths.event.edit(res.event.id));
  };

  return <Button onClick={createEvent}>イベントを作成</Button>;
};
