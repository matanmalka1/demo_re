import React from 'react';
import { cx } from './cx';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'compact';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  pending?: boolean;
  pendingLabel?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'secondary',
      size = 'md',
      isLoading = false,
      pending = false,
      pendingLabel,
      disabled,
      startIcon,
      endIcon,
      className,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer whitespace-nowrap select-none';

    const loading = isLoading || pending;
    const normalizedSize = size === 'compact' ? 'sm' : size;
    const normalizedVariant = variant === 'destructive' ? 'danger' : variant;
    const sizeClasses = {
      sm: 'text-xs h-8 px-3 gap-1.5 rounded-lg',
      md: 'text-sm h-9 px-4 gap-2 rounded-lg',
      lg: 'text-base h-11 px-5 gap-2.5 rounded-xl',
    }[normalizedSize];

    const variantClasses = {
      primary:
        'bg-cv-accent hover:bg-cv-accent-hover text-cv-on-accent shadow-sm focus-visible:ring-cv-focus border border-cv-accent',
      secondary:
        'bg-cv-surface hover:bg-cv-surface-muted text-cv-text shadow-sm border border-cv-border focus-visible:ring-cv-focus    ',
      outline:
        'bg-transparent hover:bg-cv-surface-muted text-cv-text border border-cv-border focus-visible:ring-cv-focus   ',
      ghost:
        'bg-transparent hover:bg-cv-surface-muted text-cv-text-muted hover:text-cv-text focus-visible:ring-cv-focus   ',
      danger:
        'bg-cv-blocker hover:bg-cv-blocker-hover text-cv-on-accent shadow-sm focus-visible:ring-cv-focus border border-cv-blocker',
    }[normalizedVariant];

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cx(baseClasses, sizeClasses, variantClasses, className)}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin -ml-1 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!loading && startIcon}
        <span>{loading && pendingLabel ? pendingLabel : children}</span>
        {!loading && endIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';
