import { Button } from '@/components/Button';
import { pagesPath } from '@/lib/$path';
import { api } from '@/lib/api';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function Page() {
  const router = useRouter();

  const { status, data } = useSession();

  const createEvent = async () => {
    const res = await api.events.$post();
    router.push(pagesPath.events._id(res.event.id).edit.$url());
  };

  return (
    <>
      {status === 'authenticated' ? (
        <>
          <p>you&apos;re authorized</p>
          {data.user?.image && (
            <img src={data.user.image} alt={data.user.name ?? ''} />
          )}
          <Button onClick={() => signOut()}>Sign out</Button>

          <Button onClick={createEvent}>
            Create event (with authorization)
          </Button>
        </>
      ) : (
        <Button onClick={() => signIn('github')}>Sign in with GitHub</Button>
      )}
    </>
  );
}
