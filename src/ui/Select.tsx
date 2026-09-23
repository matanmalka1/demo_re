import React from 'react';
import { cx } from './cx';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options?: SelectOption[];
  label?: string;
  isInvalid?: boolean;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ children, className, options, label, isInvalid, disabled, ...props }, ref) => {
    return (
      <div className="relative inline-flex items-center w-full">
        <select
          ref={ref}
          disabled={disabled}
          className={cx(
            'w-full appearance-none bg-cv-surface  border rounded-lg py-2 pr-3 pl-8 text-sm text-cv-text  focus:outline-none focus:ring-2 focus:ring-cv-focus focus:border-cv-field-focus transition-colors disabled:opacity-50 disabled:bg-cv-surface-muted cursor-pointer',
            isInvalid
              ? 'border-cv-blocker '
              : 'border-cv-border ',
            className
          )}
          {...props}
        >
          {options?.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
              className="bg-cv-surface text-cv-text"
            >
              {option.label}
            </option>
          )) ?? children}
        </select>
        <div className="absolute left-2.5 pointer-events-none text-cv-text-muted">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    );
  }
);

Select.displayName = 'Select';
