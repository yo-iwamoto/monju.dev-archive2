import type { Serialize } from '@/api/$utils';
import type { User } from '@prisma/client';
import type { DefineMethods } from 'aspida';

type SerializedUser = Serialize<User>;

export type Methods = DefineMethods<{
  get: {
    resBody: SerializedUser;
  };
}>;
