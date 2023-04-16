import { getServerSideProps } from './index.server';
import { pagesPath } from '@/lib/$path';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import type { PageProps } from './index.server';

export { getServerSideProps };

export default function Page({ events }: PageProps) {
  const { status } = useSession();

  return (
    <div className='px-4 py-8'>
      <div className='max-w-5xl mx-auto'>
        <h1>ダッシュボード</h1>

        {status === 'authenticated' ? (
          <h2>参加予定・開催予定のイベントなどを表示するダッシュボード</h2>
        ) : null}

        <h2>イベント一覧</h2>
        <ul className='grid gap-2'>
          {events.map((event) => (
            <li key={event.id} className='p-2 bg-white shadow-md'>
              <Link href={pagesPath.events._id(event.id).$url()}>
                <p>{event.title}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
