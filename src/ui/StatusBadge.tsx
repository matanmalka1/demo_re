import React from 'react';
import { cx } from './cx';
import { Tone, toneStyles } from './tone';

export interface StatusBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  tone?: Tone;
  showDot?: boolean;
  size?: 'sm' | 'md';
  icon?: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }>;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  children,
  tone = 'neutral',
  showDot = true,
  size = 'md',
  icon: Icon,
  className,
  ...props
}) => {
  const styles = toneStyles[tone];
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs';

  return (
    <span
      className={cx(
        'inline-flex items-center gap-1.5 font-medium rounded-md border whitespace-nowrap',
        sizeClasses,
        styles.bg,
        styles.text,
        styles.border,
        className
      )}
      {...props}
    >
      {Icon ? <Icon aria-hidden="true" className="h-3.5 w-3.5" /> : showDot && (
        <span
          className={cx('w-1.5 h-1.5 rounded-full shrink-0', styles.dot)}
          aria-hidden="true"
        />
      )}
      <span>{children}</span>
    </span>
  );
};
