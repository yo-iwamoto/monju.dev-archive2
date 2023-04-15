export type Serialize<T> = {
  [key in keyof T]: T[key] extends Date
    ? string
    : T[key] extends Date | null
    ? string | null
    : T[key];
};
