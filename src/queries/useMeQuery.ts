import { api } from '@/lib/api';
import useSWR from 'swr';

export const useMeQuery = () => {
  const query = useSWR('me', () => api.me.$get());

  return query;
};
