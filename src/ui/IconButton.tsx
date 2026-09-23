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
        'text-cv-text-muted hover:text-cv-text hover:bg-cv-surface-muted focus-visible:ring-cv-focus   ',
      outline:
        'border border-cv-border text-cv-text-muted hover:bg-cv-surface-muted hover:text-cv-text focus-visible:ring-cv-focus   ',
      secondary:
        'bg-cv-surface-muted text-cv-text hover:bg-cv-surface-muted focus-visible:ring-cv-focus   ',
      danger:
        'text-cv-blocker hover:bg-cv-blocker-soft focus-visible:ring-cv-focus  ',
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
