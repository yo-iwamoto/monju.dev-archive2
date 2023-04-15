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
      'bg-teal-600 hover:bg-teal-700 transition-colors text-white font-bold py-2 px-4 rounded',
      className
    )}
  >
    {children}
  </button>
);
