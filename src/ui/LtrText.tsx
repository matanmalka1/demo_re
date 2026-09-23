import React from 'react';
import { cx } from './cx';

export interface LtrTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  as?: 'span' | 'div' | 'code' | 'strong';
}

/**
 * Isolates Latin/LTR text strings (e.g. English company names, job codes, URLs)
 * inside an RTL Hebrew layout to prevent bidirectional punctuation jumping.
 */
export const LtrText: React.FC<LtrTextProps> = ({
  children,
  as: Component = 'span',
  className,
  ...props
}) => {
  return (
    <Component
      dir="ltr"
      className={cx('inline-block text-left unicode-bidi-isolate', className)}
      {...props}
    >
      {children}
    </Component>
  );
};
