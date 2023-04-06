import type { Serialize } from '@/api/$utils';
import type { Event } from '@prisma/client';
import type { DefineMethods } from 'aspida';

type SerializedEvent = Serialize<Event>;

export type Methods = DefineMethods<{
  get: {
    resBody: {
      events: SerializedEvent[];
    };
  };
  post: {
    resBody: {
      event: SerializedEvent;
    };
  };
}>;
