import React from 'react';
import { AppHeader } from './AppHeader';

export interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans antialiased">
      <AppHeader />
      <main className="flex-1 w-full pb-12">{children}</main>
      <footer className="border-t border-slate-200/80 dark:border-slate-800 py-6 text-center text-xs text-slate-400 dark:text-slate-500 select-none">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>מערכת ניהול והתאמת קורות חיים למשרות · RTL Hebrew Edition</span>
          <span className="tabular-nums">גרסה 2.4.0</span>
        </div>
      </footer>
    </div>
  );
};
