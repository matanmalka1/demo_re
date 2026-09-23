import React from 'react';
import { ApplicationRecord } from '@/src/api/contracts';
import { ApplicationIdentity } from './ApplicationIdentity';
import { ApplicationListStatuses } from './ApplicationListStatuses';
import { ApplicationListItemActions } from './ApplicationListItemActions';
import { formatHebrewDate } from '../model/applicationListPresentation';
import { Button } from '@/src/ui/Button';

export interface ApplicationCardsViewProps {
  applications: ApplicationRecord[];
  onOpenApplication: (app: ApplicationRecord) => void;
  onExecuteNextAction: (app: ApplicationRecord) => void;
  onClearNextAction: (appId: string) => void;
  onUpdateRecruitment: (app: ApplicationRecord) => void;
  onCloseApplication: (app: ApplicationRecord) => void;
  onDeleteApplication: (app: ApplicationRecord) => void;
}

export const ApplicationCardsView: React.FC<ApplicationCardsViewProps> = ({
  applications,
  onOpenApplication,
  onExecuteNextAction,
  onClearNextAction,
  onUpdateRecruitment,
  onCloseApplication,
  onDeleteApplication,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {applications.map((app) => (
        <div
          key={app.id}
          onClick={() => onOpenApplication(app)}
          className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-xs transition-all cursor-pointer"
        >
          {/* Header Row */}
          <div>
            <div className="flex items-start justify-between gap-3 mb-4">
              <ApplicationIdentity
                companyName={app.companyName}
                roleTitle={app.roleTitle}
                location={app.location}
                jobUrl={app.jobUrl}
              />

              <div onClick={(e) => e.stopPropagation()} className="shrink-0">
                <ApplicationListItemActions
                  application={app}
                  onOpen={() => onOpenApplication(app)}
                  onUpdateRecruitment={() => onUpdateRecruitment(app)}
                  onCloseApplication={() => onCloseApplication(app)}
                  onDeleteApplication={() => onDeleteApplication(app)}
                />
              </div>
            </div>

            {/* Statuses and Progress */}
            <div className="mb-4 bg-slate-50/70 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-100 dark:border-slate-800/80">
              <ApplicationListStatuses
                preparationStage={app.preparationStage}
                recruitmentStage={app.recruitmentStage}
                activeOperation={app.activeOperation}
              />
            </div>

            {/* Next Action Box */}
            {app.nextAction ? (
              <div className="mb-4 p-3 rounded-xl border border-indigo-100 dark:border-indigo-900/50 bg-indigo-50/50 dark:bg-indigo-950/30 flex items-center justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <span className="text-[11px] font-semibold text-indigo-700 dark:text-indigo-400 block mb-0.5">
                    פעולה מומלצת הבאה
                  </span>
                  <p className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate">
                    {app.nextAction.title}
                  </p>
                  {app.nextAction.description && (
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                      {app.nextAction.description}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => onExecuteNextAction(app)}
                    className="text-xs h-7.5 px-3"
                  >
                    בצע
                  </Button>
                  {app.nextAction.isDismissible && (
                    <button
                      type="button"
                      onClick={() => onClearNextAction(app.id)}
                      className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                      title="נקה פעולה"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="mb-4 p-3 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 text-center text-xs text-slate-400">
                אין פעולה מתוזמנת כעת
              </div>
            )}
          </div>

          {/* Footer Row */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <span className="tabular-nums">{formatHebrewDate(app.updatedAt)}</span>
              {app.matchScore && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300 tabular-nums">
                    {app.matchScore}% התאמה
                  </span>
                </>
              )}
            </div>

            <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                onClick={() => onUpdateRecruitment(app)}
                className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 font-medium text-xs transition-colors"
              >
                ניהול גיוס
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
