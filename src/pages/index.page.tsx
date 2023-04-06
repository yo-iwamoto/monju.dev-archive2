import { Button } from '@/components/Button';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function Page() {
  const { status, data } = useSession();

  return (
    <>
      {status === 'authenticated' ? (
        <>
          <p>you&apos;re authorized</p>
          {data.user?.image && (
            <img src={data.user.image} alt={data.user.name ?? ''} />
          )}
          <Button onClick={() => signOut()}>Sign out</Button>
        </>
      ) : (
        <Button onClick={() => signIn('github')}>Sign in with GitHub</Button>
      )}
    </>
  );
}
