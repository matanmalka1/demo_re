import React from 'react';
import { cx } from './cx';
import { Tone, toneStyles } from './tone';

export interface CalloutProps {
  title?: string;
  children: React.ReactNode;
  tone?: Tone;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export const Callout: React.FC<CalloutProps> = ({
  title,
  children,
  tone = 'info',
  icon,
  action,
  className,
}) => {
  const styles = toneStyles[tone];

  return (
    <div
      className={cx(
        'flex items-start gap-3.5 p-4 rounded-xl border text-sm',
        styles.bg,
        styles.border,
        styles.text,
        className
      )}
      role="region"
    >
      {icon && <div className="shrink-0 mt-0.5">{icon}</div>}
      <div className="flex-1 min-w-0">
        {title && <h4 className="font-semibold text-sm mb-1">{title}</h4>}
        <div className="text-xs sm:text-sm leading-relaxed">{children}</div>
      </div>
      {action && <div className="shrink-0 self-center mr-2">{action}</div>}
    </div>
  );
};

export interface ErrorCalloutProps {
  error: Error | string | null | undefined;
  onRetry?: () => void;
  title?: string;
  className?: string;
}

export const ErrorCallout: React.FC<ErrorCalloutProps> = ({
  error,
  onRetry,
  title = 'אירעה שגיאה בטעינת הנתונים',
  className,
}) => {
  if (!error) return null;
  const message = typeof error === 'string' ? error : error.message;

  return (
    <Callout
      tone="danger"
      title={title}
      icon={
        <svg className="w-5 h-5 text-cv-blocker" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      }
      action={
        onRetry ? (
          <button
            type="button"
            onClick={onRetry}
            className="px-3 py-1.5 text-xs font-medium bg-cv-blocker text-cv-on-accent rounded-lg hover:bg-cv-blocker transition-colors"
          >
            נסה שוב
          </button>
        ) : undefined
      }
      className={className}
    >
      {message}
    </Callout>
  );
};
