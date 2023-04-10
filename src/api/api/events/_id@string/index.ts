import type { Serialize } from '@/api/$utils';
import type { Event } from '@prisma/client';
import type { DefineMethods } from 'aspida';

type SerializedEvent = Serialize<Event>;

export type Methods = DefineMethods<{
  get: {
    resBody: {
      event: SerializedEvent;
    };
  };
}>;
