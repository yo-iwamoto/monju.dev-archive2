import { useSession } from 'next-auth/react';

export const useUserId = () => {
  const session = useSession();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const userId = session === null ? null : session.data?.userId;

  return userId as string | null;
};
