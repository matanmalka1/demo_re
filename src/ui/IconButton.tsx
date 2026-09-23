import React from 'react';
import { cx } from './cx';

export type IconButtonVariant = 'ghost' | 'outline' | 'secondary' | 'danger';
export type IconButtonSize = 'sm' | 'md' | 'lg';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  'aria-label': string;
  icon: React.ReactNode;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      icon,
      variant = 'ghost',
      size = 'md',
      className,
      disabled,
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      'inline-flex items-center justify-center rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-40 disabled:pointer-events-none cursor-pointer shrink-0';

    const sizeClasses = {
      sm: 'w-7 h-7 text-xs',
      md: 'w-9 h-9 text-sm',
      lg: 'w-10 h-10 text-base',
    }[size];

    const variantClasses = {
      ghost:
        'text-slate-500 hover:text-slate-800 hover:bg-slate-100 focus-visible:ring-slate-400 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800',
      outline:
        'border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 focus-visible:ring-slate-400 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800',
      secondary:
        'bg-slate-100 text-slate-700 hover:bg-slate-200 focus-visible:ring-slate-400 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700',
      danger:
        'text-rose-600 hover:bg-rose-50 focus-visible:ring-rose-400 dark:text-rose-400 dark:hover:bg-rose-950/40',
    }[variant];

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        aria-label={ariaLabel}
        className={cx(baseClasses, sizeClasses, variantClasses, className)}
        {...props}
      >
        {icon}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';
