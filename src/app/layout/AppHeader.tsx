import React from 'react';
import { LtrText } from '@/ui/LtrText';

export interface AppHeaderProps {
  onNewApplication?: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = () => {
  return (
    <header className="sticky top-0 z-navigation w-full bg-cv-surface/95 backdrop-blur-xs border-b border-cv-hairline">
      <div className="page-gutter page-frame h-15 flex items-center justify-between gap-card-padding">
        {/* Zone 1: Single text element Brand Zone */}
        <a
          href="/"
          className="text-lg font-bold tracking-tight text-cv-text flex items-center gap-2 select-none"
        >
          <div className="w-8 h-8 rounded-control bg-cv-accent text-cv-on-accent flex items-center justify-center text-support font-black shadow-surface">
            CV
          </div>
          <span className="font-display">לוח משרות</span>
        </a>

        {/* Zone 2: Clean text navigation links */}
        <nav
          className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium text-cv-text-muted"
          aria-label="ניווט ראשי"
        >
          <a
            href="/"
            aria-current="page"
            className="text-cv-accent font-semibold border-b-2 border-cv-accent pb-1 -mb-[2px] transition-colors"
          >
            לוח מועמדויות
          </a>
          <span
            className="text-cv-text-muted hover:text-cv-text transition-colors cursor-not-allowed opacity-75"
            title="עובדות והישגים (תכונה עתידית)"
          >
            מאגר הישגים
          </span>
          <span
            className="text-cv-text-muted hover:text-cv-text transition-colors cursor-not-allowed opacity-75"
            title="הגדרות פרופיל (תכונה עתידית)"
          >
            הגדרות
          </span>
        </nav>

        {/* Zone 3: 1-2 primary actions / User profile indicator */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs text-cv-text-muted">
            <span className="w-2 h-2 rounded-full bg-cv-success" title="מערכת פעילה ומסונכרנת" />
            <span className="hidden sm:inline font-medium">מועמד יחיד</span>
            <div className="w-7 h-7 rounded-full bg-cv-surface-muted text-cv-text font-bold flex items-center justify-center text-xs">
              <LtrText>ME</LtrText>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
