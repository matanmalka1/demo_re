import React from 'react';

export interface LiveRegionProps {
  message?: string;
  role?: 'status' | 'alert';
}

export const LiveRegion: React.FC<LiveRegionProps> = ({ message, role = 'status' }) => {
  return (
    <div
      role={role}
      aria-live={role === 'alert' ? 'assertive' : 'polite'}
      aria-atomic="true"
      className="sr-only"
    >
      {message}
    </div>
  );
};
