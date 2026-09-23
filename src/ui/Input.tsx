import React from 'react';
import { cx } from './cx';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  onClear?: () => void;
  isInvalid?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      startAdornment,
      endAdornment,
      onClear,
      value,
      disabled,
      isInvalid,
      ...props
    },
    ref
  ) => {
    const hasValue = value !== undefined && value !== '';

    return (
      <div className="relative flex items-center w-full">
        {startAdornment && (
          <div className="absolute right-3 flex items-center pointer-events-none text-cv-text-muted">
            {startAdornment}
          </div>
        )}
        <input
          ref={ref}
          value={value}
          disabled={disabled}
          className={cx(
            'w-full bg-cv-surface  border rounded-lg py-2 text-sm text-cv-text  placeholder:text-cv-text-muted focus:outline-none focus:ring-2 focus:ring-cv-focus focus:border-cv-field-focus transition-colors disabled:opacity-50 disabled:bg-cv-surface-muted ',
            isInvalid
              ? 'border-cv-blocker  focus:ring-cv-focus'
              : 'border-cv-border ',
            startAdornment ? 'pr-9' : 'pr-3',
            endAdornment || onClear ? 'pl-9' : 'pl-3',
            className
          )}
          {...props}
        />
        {onClear && hasValue && !disabled && (
          <button
            type="button"
            onClick={onClear}
            className="absolute left-2.5 p-1 rounded-md text-cv-text-muted hover:text-cv-text-muted hover:bg-cv-surface-muted transition-colors"
            aria-label="נקה חיפוש"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
        {!onClear && endAdornment && (
          <div className="absolute left-3 flex items-center pointer-events-none text-cv-text-muted">
            {endAdornment}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
