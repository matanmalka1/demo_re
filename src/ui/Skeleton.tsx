import React from 'react';
import { cx } from './cx';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'rectangular' | 'circular';
  width?: string | number;
  height?: string | number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'rectangular',
  width,
  height,
  className,
  style,
  ...props
}) => {
  const variantClasses = {
    text: 'rounded h-4 w-full',
    rectangular: 'rounded-lg',
    circular: 'rounded-full',
  }[variant];

  return (
    <div
      className={cx('animate-pulse bg-slate-200 dark:bg-slate-800', variantClasses, className)}
      style={{ width, height, ...style }}
      aria-hidden="true"
      {...props}
    />
  );
};
