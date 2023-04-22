import { useUserId } from './useUserId';

export const useIsOwner = (event: {
  EventAdmin: {
    userId: string;
  }[];
}) => {
  const userId = useUserId();

  return event.EventAdmin.some((admin) => admin.userId === userId);
};
