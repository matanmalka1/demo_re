import React from 'react';
import { LtrText } from '@/src/ui/LtrText';

export interface AppHeaderProps {
  onNewApplication?: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = () => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-xs border-b border-slate-200/80 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-15 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element Brand Zone */}
        <a
          href="/"
          className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2 select-none"
        >
          <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-sm font-black shadow-xs">
            CV
          </div>
          <span className="font-display">לוח משרות</span>
        </a>

        {/* Zone 2: Clean text navigation links */}
        <nav
          className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300"
          aria-label="ניווט ראשי"
        >
          <a
            href="/"
            aria-current="page"
            className="text-indigo-600 dark:text-indigo-400 font-semibold border-b-2 border-indigo-600 pb-1 -mb-[2px] transition-colors"
          >
            לוח מועמדויות
          </a>
          <span
            className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-not-allowed opacity-75"
            title="עובדות והישגים (תכונה עתידית)"
          >
            מאגר הישגים
          </span>
          <span
            className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-not-allowed opacity-75"
            title="הגדרות פרופיל (תכונה עתידית)"
          >
            הגדרות
          </span>
        </nav>

        {/* Zone 3: 1-2 primary actions / User profile indicator */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500" title="מערכת פעילה ומסונכרנת" />
            <span className="hidden sm:inline font-medium">מועמד יחיד</span>
            <div className="w-7 h-7 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold flex items-center justify-center text-xs">
              <LtrText>ME</LtrText>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
