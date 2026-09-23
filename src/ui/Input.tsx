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
          <div className="absolute right-3 flex items-center pointer-events-none text-slate-400">
            {startAdornment}
          </div>
        )}
        <input
          ref={ref}
          value={value}
          disabled={disabled}
          className={cx(
            'w-full bg-white dark:bg-slate-900 border rounded-lg py-2 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors disabled:opacity-50 disabled:bg-slate-50 dark:disabled:bg-slate-800',
            isInvalid
              ? 'border-rose-300 dark:border-rose-700 focus:ring-rose-500'
              : 'border-slate-200 dark:border-slate-700',
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
            className="absolute left-2.5 p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
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
          <div className="absolute left-3 flex items-center pointer-events-none text-slate-400">
            {endAdornment}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
