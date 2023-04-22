import { NewEventButton } from './NewEventButton';
import { UserIcon } from './UserIcon';
import { Button } from '../Button';
import { pagesPath } from '@/lib/$path';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const Layout = ({ children }: Props) => {
  const session = useSession();

  return (
    <div className='bg-gray-50'>
      <header className='flex h-[72px] justify-between items-center p-4'>
        <Link
          href={pagesPath.$url()}
          className='font-bold text-xl md:text-2xl font-mono'
        >
          monju.dev
        </Link>

        {session.status === 'authenticated' ? (
          <div className='flex animate-fade-appear items-center gap-4'>
            <NewEventButton />

            <UserIcon />
          </div>
        ) : session.status === 'unauthenticated' ? (
          <Button
            className='animate-fade-appear'
            onClick={() => signIn('github')}
          >
            <span className='flex items-center gap-2'>
              <GitHubLogoIcon className='h-5 w-5 text-white' />
              <span>GitHub でサインイン</span>
            </span>
          </Button>
        ) : null}
      </header>

      <main className='min-h-screen'>{children}</main>
    </div>
  );
};
