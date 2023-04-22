import type { Event, EventStatus } from '@prisma/client';

type Branded<T, B> = T & { __brand: B };

type EventStatusBrand = 'EventStatus';

type SerializedEventStatus = Branded<string, EventStatusBrand>;

/**
 * Date | (Date | null) を含む複数階層のある TypeScript の型について
 *     Date → string、Date | null → string に再帰的に変換する型
 */
export type Serialize<T> = T extends Date
  ? string
  : T extends object
  ? { [K in keyof T]: Serialize<T[K]> }
  : T extends EventStatus
  ? SerializedEventStatus
  : T;

type E = Serialize<Event>;
(e: E) => {
  e.status.st;
};
