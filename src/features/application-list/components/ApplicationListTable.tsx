import React from 'react';
import { ApplicationRecord } from '@/src/api/contracts';
import { ApplicationIdentity } from './ApplicationIdentity';
import { ApplicationListStatuses } from './ApplicationListStatuses';
import { ApplicationNextAction } from './ApplicationNextAction';
import { ApplicationListItemActions } from './ApplicationListItemActions';
import { formatHebrewDate } from '../model/applicationListPresentation';

export interface ApplicationListTableProps {
  applications: ApplicationRecord[];
  onOpenApplication: (app: ApplicationRecord) => void;
  onExecuteNextAction: (app: ApplicationRecord) => void;
  onClearNextAction: (appId: string) => void;
  onUpdateRecruitment: (app: ApplicationRecord) => void;
  onCloseApplication: (app: ApplicationRecord) => void;
  onDeleteApplication: (app: ApplicationRecord) => void;
}

export const ApplicationListTable: React.FC<ApplicationListTableProps> = ({
  applications,
  onOpenApplication,
  onExecuteNextAction,
  onClearNextAction,
  onUpdateRecruitment,
  onCloseApplication,
  onDeleteApplication,
}) => {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs">
      <table className="w-full text-right border-collapse text-xs sm:text-sm">
        <thead>
          <tr className="bg-slate-50/80 dark:bg-slate-800/60 border-b border-slate-200/80 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold text-xs select-none">
            <th scope="col" className="py-3 px-4 font-semibold">
              חברה ותפקיד
            </th>
            <th scope="col" className="py-3 px-4 font-semibold min-w-[200px]">
              התקדמות הכנה וגיוס
            </th>
            <th scope="col" className="py-3 px-4 font-semibold min-w-[220px]">
              פעולה מומלצת הבאה
            </th>
            <th scope="col" className="py-3 px-4 font-semibold text-center whitespace-nowrap">
              ציון התאמה
            </th>
            <th scope="col" className="py-3 px-4 font-semibold whitespace-nowrap">
              עדכון אחרון
            </th>
            <th scope="col" className="py-3 px-4 font-semibold text-center w-12">
              <span className="sr-only">פעולות</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {applications.map((app) => (
            <tr
              key={app.id}
              onClick={() => onOpenApplication(app)}
              className="hover:bg-slate-50/75 dark:hover:bg-slate-800/40 transition-colors cursor-pointer group"
            >
              {/* Company & Role */}
              <td className="py-3.5 px-4 align-middle">
                <ApplicationIdentity
                  companyName={app.companyName}
                  roleTitle={app.roleTitle}
                  location={app.location}
                  jobUrl={app.jobUrl}
                />
              </td>

              {/* Statuses (Dual Track) */}
              <td className="py-3.5 px-4 align-middle" onClick={(e) => e.stopPropagation()}>
                <ApplicationListStatuses
                  preparationStage={app.preparationStage}
                  recruitmentStage={app.recruitmentStage}
                  activeOperation={app.activeOperation}
                />
              </td>

              {/* Next Action */}
              <td className="py-3.5 px-4 align-middle" onClick={(e) => e.stopPropagation()}>
                <ApplicationNextAction
                  nextAction={app.nextAction}
                  needsAttention={app.needsAttention}
                  attentionReason={app.attentionReason}
                  onExecute={() => onExecuteNextAction(app)}
                  onClear={() => onClearNextAction(app.id)}
                />
              </td>

              {/* Match Score */}
              <td className="py-3.5 px-4 align-middle text-center">
                {app.matchScore ? (
                  <span className="inline-flex items-center justify-center font-mono font-bold text-xs px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 tabular-nums">
                    {app.matchScore}%
                  </span>
                ) : (
                  <span className="text-slate-300 dark:text-slate-600">—</span>
                )}
              </td>

              {/* Last Updated */}
              <td className="py-3.5 px-4 align-middle whitespace-nowrap text-xs text-slate-500 dark:text-slate-400 tabular-nums">
                {formatHebrewDate(app.updatedAt)}
              </td>

              {/* Action Menu */}
              <td className="py-3.5 px-4 align-middle text-center" onClick={(e) => e.stopPropagation()}>
                <ApplicationListItemActions
                  application={app}
                  onOpen={() => onOpenApplication(app)}
                  onUpdateRecruitment={() => onUpdateRecruitment(app)}
                  onCloseApplication={() => onCloseApplication(app)}
                  onDeleteApplication={() => onDeleteApplication(app)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
