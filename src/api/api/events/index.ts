import type { Serialize } from '@/types/Serialize';
import type { Event } from '@prisma/client';
import type { DefineMethods } from 'aspida';

type SerializedEvent = Serialize<Event>;

export type Methods = DefineMethods<{
  get: {
    resBody: {
      events: {
        id: string;
      };
    };
  };
  post: {
    resBody: {
      event: SerializedEvent;
    };
  };
}>;
