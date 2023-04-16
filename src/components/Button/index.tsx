import { cn } from '@/lib/cn';
import Link from 'next/link';
import { useState } from 'react';
import type {
  ComponentPropsWithoutRef,
  PropsWithChildren,
  MouseEventHandler,
} from 'react';
import type { LinkProps } from 'next/link';

type Props = Omit<ComponentPropsWithoutRef<'button'>, 'onClick'> & {
  onClick: (() => void) | (() => Promise<void>);
  withoutLoading?: boolean;
};

export const Button = ({
  type = 'button',
  children,
  className,
  onClick,
  withoutLoading = false,
  ...props
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const onClickWithLoading = (async () => {
    setIsLoading(true);
    try {
      await onClick();
    } finally {
      setIsLoading(false);
    }
  }) satisfies MouseEventHandler<HTMLButtonElement>;

  const presentLoading = isLoading && !withoutLoading;

  return (
    <button
      type={type}
      {...props}
      className={cn(
        'bg-cyan-600 relative disabled:cursor-not-allowed disabled:bg-cyan-400 hover:bg-cyan-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-black transition-colors text-white text-sm md:text-md font-bold py-2 px-4 rounded',
        className,
        { 'cursor-not-allowed': presentLoading }
      )}
      onClick={onClickWithLoading}
      disabled={presentLoading}
    >
      {presentLoading && (
        <div className='flex absolute h-full w-full top-0 left-0 justify-center items-center'>
          <span className='animate-spin h-5 w-5 border-2 border-white rounded-full border-t-transparent' />
        </div>
      )}

      <span className={presentLoading ? 'opacity-0' : ''}>{children}</span>
    </button>
  );
};

export const ButtonLink = ({
  className,
  ...props
}: LinkProps & PropsWithChildren<{ className?: string }>) => (
  <Link
    {...props}
    className={cn(
      'bg-cyan-600 disabled:cursor-not-allowed disabled:bg-cyan-400 hover:bg-cyan-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-black transition-colors text-white text-sm md:text-md font-bold py-2 px-4 rounded',
      className
    )}
  />
);
