import React from 'react';
import { ApplicationRecord } from '@/src/api/contracts';
import { LtrText } from '@/src/ui/LtrText';
import { cx } from '@/src/ui/cx';

export interface ApplicationAttentionSummaryProps {
  attentionItems: ApplicationRecord[];
  onSelectApplication: (app: ApplicationRecord) => void;
  onFilterToAttention: () => void;
  isFilterActive: boolean;
  onDismissAction?: (appId: string) => void;
}

export const ApplicationAttentionSummary: React.FC<ApplicationAttentionSummaryProps> = ({
  attentionItems,
  onSelectApplication,
  onFilterToAttention,
  isFilterActive,
  onDismissAction,
}) => {
  if (attentionItems.length === 0) {
    return (
      <div className="bg-gradient-to-r from-emerald-50/70 to-teal-50/40 dark:from-emerald-950/20 dark:to-teal-950/10 border border-emerald-200/60 dark:border-emerald-800/40 rounded-2xl p-4 sm:p-5 flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-emerald-900 dark:text-emerald-100">
              כל המועמדויות מעודכנות
            </h3>
            <p className="text-xs text-emerald-700 dark:text-emerald-300/80">
              אין משרות הדורשות תשומת לב מיידית או פעולה תקועה כרגע.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section
      aria-label="מועמדויות הדורשות תשומת לב"
      className="bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-800/60 rounded-2xl p-4 sm:p-5 shadow-2xs"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3.5 pb-3 border-b border-amber-200/60 dark:border-amber-800/40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200 flex items-center justify-center shrink-0">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-amber-950 dark:text-amber-100">
                מרכז פעולות דחופות
              </h3>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-200/80 text-amber-900 dark:bg-amber-900 dark:text-amber-200 tabular-nums">
                {attentionItems.length}
              </span>
            </div>
            <p className="text-xs text-amber-800/90 dark:text-amber-300">
              משרות הממתינות לאישור טיוטה, עדכון מועד ראיון או פעולת הכנה
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onFilterToAttention}
          className={cx(
            'inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors self-start sm:self-center',
            isFilterActive
              ? 'bg-amber-200 dark:bg-amber-900 text-amber-950 dark:text-amber-100'
              : 'bg-white/80 hover:bg-white text-amber-900 border border-amber-300/80 dark:bg-slate-900 dark:text-amber-200 dark:border-amber-700'
          )}
        >
          <span>{isFilterActive ? 'מציג משרות אלו כעת' : 'סנן לוח למשרות אלו'}</span>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      {/* Grid of urgent items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {attentionItems.slice(0, 3).map((app) => (
          <div
            key={app.id}
            className="bg-white/95 dark:bg-slate-900/95 border border-amber-200/90 dark:border-amber-900/60 rounded-xl p-3.5 flex flex-col justify-between hover:border-amber-300 dark:hover:border-amber-700 transition-colors shadow-2xs"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <div className="min-w-0">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 truncate">
                    <LtrText>{app.companyName}</LtrText>
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                    <LtrText>{app.roleTitle}</LtrText>
                  </p>
                </div>
                {app.nextInterviewDate && (
                  <span className="shrink-0 text-[11px] font-semibold text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/60 border border-rose-200/80 dark:border-rose-900/50 px-2 py-0.5 rounded-md tabular-nums">
                    ראיון קרוב
                  </span>
                )}
              </div>

              <div className="bg-amber-50/90 dark:bg-amber-950/40 rounded-lg p-2 mb-3 border border-amber-100 dark:border-amber-900/30">
                <p className="text-xs font-medium text-amber-900 dark:text-amber-200 leading-snug">
                  {app.attentionReason || 'נדרשת תשומת לב להמשך התהליך'}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-100 dark:border-slate-800">
              <span className="text-[11px] text-slate-400 dark:text-slate-500 truncate">
                {app.nextAction?.title || 'פעולה נדרשת'}
              </span>
              <button
                type="button"
                onClick={() => onSelectApplication(app)}
                className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
              >
                <span>טפל כעת</span>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
