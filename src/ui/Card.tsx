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
        'bg-cv-surface  border border-cv-border/80  rounded-xl transition-all duration-150',
        padded && 'p-5 sm:p-6',
        interactive &&
          'hover:border-cv-border  hover:shadow-sm cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
