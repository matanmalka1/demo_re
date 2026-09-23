import React from 'react';
import { cx } from './cx';

export interface EmptyStateProps {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  children,
  icon,
  title,
  description,
  action,
  className,
}) => {
  return (
    <div
      className={cx(
        'flex flex-col items-center justify-center text-center p-10 sm:p-14 bg-cv-surface rounded-2xl border border-dashed border-cv-border ',
        className
      )}
    >
      {icon && (
        <div className="w-12 h-12 rounded-xl bg-cv-surface-muted text-cv-text-muted flex items-center justify-center mb-4">
          {icon}
        </div>
      )}
      {title && <h3 className="text-base font-semibold text-cv-text mb-1">{title}</h3>}
      {description && <p className="text-sm text-cv-text-muted max-w-sm mb-5 text-balance">{description}</p>}
      {children}
      {action && <div>{action}</div>}
    </div>
  );
};
