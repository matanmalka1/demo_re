import React from 'react';
import { cx } from './cx';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  interactive?: boolean;
  padded?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  interactive = false,
  padded = true,
  className,
  ...props
}) => {
  return (
    <div
      className={cx(
        'bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl transition-all duration-150',
        padded && 'p-5 sm:p-6',
        interactive &&
          'hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-sm cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
