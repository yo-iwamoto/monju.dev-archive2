import type { Serialize } from '@/types/Serialize';
import type { Event } from '@prisma/client';
import type { DefineMethods } from 'aspida';

type SerializedEvent = Serialize<Event>;

export type Methods = DefineMethods<{
  get: {
    resBody: {
      event: SerializedEvent;
    };
  };
  put: {
    reqBody: {
      title?: string;
      description?: string;
      capacity?: number;
    };
  };
}>;
