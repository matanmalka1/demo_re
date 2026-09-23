import React from 'react';
import { cx } from './cx';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
  label?: string;
  isInvalid?: boolean;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options, label, isInvalid, disabled, ...props }, ref) => {
    return (
      <div className="relative inline-flex items-center w-full">
        <select
          ref={ref}
          disabled={disabled}
          className={cx(
            'w-full appearance-none bg-white dark:bg-slate-900 border rounded-lg py-2 pr-3 pl-8 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors disabled:opacity-50 disabled:bg-slate-50 cursor-pointer',
            isInvalid
              ? 'border-rose-300 dark:border-rose-700'
              : 'border-slate-200 dark:border-slate-700',
            className
          )}
          {...props}
        >
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
              className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
            >
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute left-2.5 pointer-events-none text-slate-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    );
  }
);

Select.displayName = 'Select';
