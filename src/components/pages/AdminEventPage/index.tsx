import { StatusTip } from './StatusTip';
import { pagesPath } from '@/lib/$path';
import { CenteredContainer } from '@/components/CenteredContainer';
import Link from 'next/link';
import type { PageProps } from '@/pages/events/index.server';

type Props = {
  pageProps: PageProps;
};

export const AdminEventPage = ({ pageProps: { events } }: Props) => {
  return (
    <CenteredContainer className='grid gap-4'>
      <h1>自分が管理しているイベントの一覧ページ</h1>
      <ul className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {events.map(({ id, title, status }) => (
          <li key={id}>
            <Link
              href={
                status === 'DRAFT'
                  ? pagesPath.events._eventId(id).edit.$url()
                  : pagesPath.events._eventId(id).$url()
              }
            >
              <div className='p-2 shadow-md rounded-md bg-white'>
                <div className='flex justify-between items-center'>
                  <p className='font-bold text-lg'>{title}</p>
                  <StatusTip status={status} />
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </CenteredContainer>
  );
};
