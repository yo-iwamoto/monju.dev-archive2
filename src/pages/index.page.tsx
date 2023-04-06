import { Button } from '@/components/Button';
import { api } from '@/lib/api';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function Page() {
  const { status, data } = useSession();

  const createEvent = async () => {
    const res = await api.events.$post();
    console.log(res.event);
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
