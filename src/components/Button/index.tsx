import { cn } from '@/lib/cn';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'button'>;

export const Button = ({
  type = 'button',
  children,
  className,
  ...props
}: Props) => (
  <button
    type={type}
    {...props}
    className={cn(
      'bg-violet-600 disabled:cursor-not-allowed disabled:bg-violet-400 hover:bg-violet-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-black transition-colors text-white font-bold py-2 px-4 rounded',
      className
    )}
  >
    {children}
  </button>
);
