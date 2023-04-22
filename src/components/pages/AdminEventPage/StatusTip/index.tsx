import { z } from 'zod';
import type { CSSProperties } from 'react';

type Props = {
  status: string;
};

const colorStyle = {
  DRAFT: { borderColor: 'blue' },
  PUBLISHED: { borderColor: 'green' },
  CANCELED: { borderColor: 'red' },
} satisfies Record<string, CSSProperties>;

const statusSchema = z
  .literal('DRAFT')
  .or(z.literal('PUBLISHED'))
  .or(z.literal('CANCELED'));

export const StatusTip = (props: Props) => {
  const status = statusSchema.parse(props.status);

  return (
    <div
      style={colorStyle[status]}
      className='px-2 py-1 text-xs border rounded-md'
    >
      <span>{status}</span>
    </div>
  );
};
