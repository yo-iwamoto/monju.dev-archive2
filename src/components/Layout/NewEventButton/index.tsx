import { Button } from '@/components/Button';
import { pagesPath } from '@/lib/$path';
import { api } from '@/lib/api';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const NewEventButton = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const createEvent = async () => {
    setIsLoading(true);
    try {
      // 下書き状態のイベントを作成
      const res = await api.events.$post();
      // 作成したイベントの編集ページに遷移
      router.push(pagesPath.events._id(res.event.id).edit.$url());
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button onClick={createEvent} disabled={isLoading}>
      イベントを作成
    </Button>
  );
};
