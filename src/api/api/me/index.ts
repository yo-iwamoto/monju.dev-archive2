import type { Serialize } from '@/types/Serialize';
import type { User } from '@prisma/client';
import type { DefineMethods } from 'aspida';

type SerializedUser = Serialize<User>;

export type Methods = DefineMethods<{
  get: {
    resBody: SerializedUser;
  };
}>;
