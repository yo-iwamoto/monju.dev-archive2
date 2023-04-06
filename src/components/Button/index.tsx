import { cn } from '@/lib/cn';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'button'>;

export const Button = ({ children, className, ...props }: Props) => (
  <button
    {...props}
    className={cn(
      'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded',
      className
    )}
  >
    {children}
  </button>
);
