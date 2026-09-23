import React from 'react';
import { LtrText } from '@/src/ui/LtrText';

export interface ApplicationIdentityProps {
  companyName: string;
  roleTitle: string;
  location?: string;
  jobUrl?: string;
  showMonogram?: boolean;
}

export const ApplicationIdentity: React.FC<ApplicationIdentityProps> = ({
  companyName,
  roleTitle,
  location,
  jobUrl,
  showMonogram = true,
}) => {
  // Generate a clean 2-letter monogram
  const initials = companyName
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

  return (
    <div className="flex items-center gap-3 min-w-0">
      {showMonogram && (
        <div
          className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center justify-center shrink-0 select-none"
          aria-hidden="true"
        >
          <LtrText>{initials || 'CV'}</LtrText>
        </div>
      )}

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5 flex-wrap">
          <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 hover:text-indigo-600 transition-colors truncate">
            <LtrText>{companyName}</LtrText>
          </h3>

          {jobUrl && (
            <a
              href={jobUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-0.5 inline-flex"
              title="פתיחת מודעת המשרה המקורית"
              aria-label={`פתיחת מודעת המשרה של ${companyName}`}
              onClick={(e) => e.stopPropagation()}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          )}
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 truncate">
          <span className="font-medium text-slate-700 dark:text-slate-300 truncate">
            <LtrText>{roleTitle}</LtrText>
          </span>
          {location && (
            <>
              <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">
                ·
              </span>
              <span className="truncate">{location}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
