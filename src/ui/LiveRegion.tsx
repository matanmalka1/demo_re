import React from 'react';

export interface LiveRegionProps {
  children?: React.ReactNode;
  className?: string;
  message?: string;
  role?: 'status' | 'alert';
  visuallyHidden?: boolean;
}

export const LiveRegion: React.FC<LiveRegionProps> = ({ children, className, message, role = 'status', visuallyHidden = true }) => {
  return (
    <div
      role={role}
      aria-live={role === 'alert' ? 'assertive' : 'polite'}
      aria-atomic="true"
      className={visuallyHidden ? 'sr-only' : className}
    >
      {message ?? children}
    </div>
  );
};
