import { useMe } from '@/queries/useMe';
import { pagesPath } from '@/lib/$path';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { ExitIcon, RocketIcon } from '@radix-ui/react-icons';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

export const UserIcon = () => {
  const meQuery = useMe();

  const imageUrl = meQuery.data?.image;

  if (!imageUrl) return null;

  return (
    <div className='h-10 w-10'>
      <button type='button' aria-label='ユーザーメニューを開く'></button>

      <Menu as='div' className='relative inline-block text-left'>
        <div>
          <Menu.Button className='h-10 w-10 hover:opacity-80 transition-opacity rounded-full overflow-hidden hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500'>
            <img src={imageUrl} alt='' />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter='transition ease-out duration-100'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'
        >
          <Menu.Items className='absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
            <div className='px-1 py-1 '>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href={pagesPath.events.$url()}
                    className={`${
                      active ? 'bg-violet-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    <RocketIcon
                      className={`mr-2 h-5 w-5 ${
                        active ? 'text-white' : 'text-violet-600'
                      }`}
                      aria-hidden='true'
                    />
                    イベントの管理
                  </Link>
                )}
              </Menu.Item>
            </div>
            <div className='px-1 py-1'>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-violet-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={() => signOut()}
                  >
                    <ExitIcon
                      className={`mr-2 h-5 w-5 ${
                        active ? 'text-white' : 'text-violet-600'
                      }`}
                      aria-hidden='true'
                    />
                    ログアウト
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};
