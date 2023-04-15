import type { Serialize } from '@/types/Serialize';

export const gsspProps = <T>(value: T) =>
  JSON.parse(JSON.stringify(value)) as Serialize<T>;
