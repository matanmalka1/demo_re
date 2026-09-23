import React from 'react';
import { AppHeader } from './AppHeader';

export interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-cv-canvas text-cv-text font-sans antialiased">
      <AppHeader />
      <main className="flex-1 w-full pb-12">{children}</main>
      <footer className="border-t border-cv-hairline py-6 text-center text-caption text-cv-text-muted select-none">
        <div className="page-gutter page-frame flex flex-col sm:flex-row items-center justify-between gap-control-gap">
          <span>מערכת ניהול והתאמת קורות חיים למשרות · RTL Hebrew Edition</span>
          <span className="tabular-nums">גרסה 2.4.0</span>
        </div>
      </footer>
    </div>
  );
};
