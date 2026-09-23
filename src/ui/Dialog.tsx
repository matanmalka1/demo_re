import React, { useEffect, useRef } from 'react';
import { cx } from './cx';
import { IconButton } from './IconButton';

export interface DialogProps {
  isOpen?: boolean;
  open?: boolean;
  headingId?: string;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'wide';
}

export const Dialog: React.FC<DialogProps> = ({
  isOpen,
  open,
  headingId = 'dialog-title',
  onClose,
  title,
  description,
  children,
  footer,
  size = 'md',
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  const visible = open ?? isOpen ?? false;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (visible) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [visible, onClose]);

  if (!visible) return null;

  const normalizedSize = size === 'wide' ? 'xl' : size;
  const maxWidthClass = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  }[normalizedSize];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby={headingId}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-cv-brand-deep/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog Window */}
      <div
        ref={dialogRef}
        className={cx(
          'relative w-full bg-cv-surface  rounded-2xl shadow-xl border border-cv-border  text-right z-10 overflow-hidden flex flex-col my-8 max-h-[90vh]',
          maxWidthClass
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-cv-border">
          <div>
            <h2 id={headingId} className="text-lg font-semibold text-cv-text">
              {title}
            </h2>
            {description && (
              <p className="text-xs text-cv-text-muted mt-0.5">{description}</p>
            )}
          </div>
          <IconButton
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            }
            aria-label="סגור חלון"
            onClick={onClose}
            size="sm"
          />
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="flex items-center justify-end gap-3 px-6 py-4 bg-cv-surface-muted border-t border-cv-border">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
