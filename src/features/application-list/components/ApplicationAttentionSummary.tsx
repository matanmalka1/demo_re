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
      <div className="bg-gradient-to-r from-cv-success-soft/70 to-cv-success-soft/40 border border-cv-success/60 rounded-2xl p-4 sm:p-5 flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          <div className="w-9 h-9 rounded-xl bg-cv-success-soft text-cv-success flex items-center justify-center shrink-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-cv-success">
              כל המועמדויות מעודכנות
            </h3>
            <p className="text-xs text-cv-success">
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
      className="bg-cv-warning-soft/70 border border-cv-warning/80 rounded-2xl p-4 sm:p-5 shadow-2xs"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3.5 pb-3 border-b border-cv-warning/60">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-cv-warning-soft text-cv-warning flex items-center justify-center shrink-0">
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
              <h3 className="text-sm font-bold text-cv-warning">
                מרכז פעולות דחופות
              </h3>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-cv-warning-soft/80 text-cv-warning tabular-nums">
                {attentionItems.length}
              </span>
            </div>
            <p className="text-xs text-cv-warning/90">
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
              ? 'bg-cv-warning-soft  text-cv-warning '
              : 'bg-cv-surface/80 hover:bg-cv-surface text-cv-warning border border-cv-warning/80  '
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
            className="bg-cv-surface/95 border border-cv-warning/90 rounded-xl p-3.5 flex flex-col justify-between hover:border-cv-warning transition-colors shadow-2xs"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <div className="min-w-0">
                  <h4 className="font-bold text-sm text-cv-text truncate">
                    <LtrText>{app.companyName}</LtrText>
                  </h4>
                  <p className="text-xs text-cv-text-muted truncate">
                    <LtrText>{app.roleTitle}</LtrText>
                  </p>
                </div>
                {app.nextInterviewDate && (
                  <span className="shrink-0 text-[11px] font-semibold text-cv-blocker bg-cv-blocker-soft border border-cv-blocker/80 px-2 py-0.5 rounded-md tabular-nums">
                    ראיון קרוב
                  </span>
                )}
              </div>

              <div className="bg-cv-warning-soft/90 rounded-lg p-2 mb-3 border border-cv-warning">
                <p className="text-xs font-medium text-cv-warning leading-snug">
                  {app.attentionReason || 'נדרשת תשומת לב להמשך התהליך'}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between gap-2 pt-1 border-t border-cv-border">
              <span className="text-[11px] text-cv-text-muted truncate">
                {app.nextAction?.title || 'פעולה נדרשת'}
              </span>
              <button
                type="button"
                onClick={() => onSelectApplication(app)}
                className="inline-flex items-center gap-1 text-xs font-semibold text-cv-accent hover:text-cv-accent-hover transition-colors"
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
