import { useMeQuery } from '@/queries/useMeQuery';
import { pagesPath } from '@/lib/$path';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ExitIcon, RocketIcon } from '@radix-ui/react-icons';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

export const UserIcon = () => {
  const router = useRouter();

  const meQuery = useMeQuery();

  const imageUrl = meQuery.data?.image;

  if (!imageUrl) return null;

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          aria-label='ユーザーメニューを開く'
          className='h-10 w-10 hover:opacity-80 transition-opacity rounded-full overflow-hidden hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500'
        >
          <img src={imageUrl} alt='プロフィール画像' />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          hideWhenDetached
          className='absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
          align='end'
        >
          <DropdownMenu.Item
            className='p-1 group data-[highlighted]:outline-none cursor-pointer'
            onSelect={() => router.push(pagesPath.events.$url())}
          >
            <span className='group-data-[highlighted]:text-white group-data-[highlighted]:bg-cyan-500 text-gray-900 flex w-full items-center rounded-md px-2 py-2 text-sm'>
              <RocketIcon
                className='mr-2 h-5 w-5 text-cyan-600 group-data-[highlighted]:text-white'
                aria-hidden='true'
              />
              <span>イベントの管理</span>
            </span>
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className='p-1 group data-[highlighted]:outline-none cursor-pointer'
            onSelect={() => signOut()}
          >
            <span className='text-gray-900 flex w-full items-center rounded-md px-2 py-2 text-sm group-data-[highlighted]:text-white group-data-[highlighted]:bg-cyan-500'>
              <ExitIcon
                className='mr-2 h-5 w-5 text-cyan-600 group-data-[highlighted]:text-white'
                aria-hidden='true'
              />
              サインアウト
            </span>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
