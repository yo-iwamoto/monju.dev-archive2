import { cn } from '@/lib/cn';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
};

export const CenteredContainer = ({ children, className = '' }: Props) => {
  return (
    <div className='px-2 md:px-4'>
      <div className={cn('mx-auto max-w-5xl', className)}>{children}</div>
    </div>
  );
};
