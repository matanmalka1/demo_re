import React from 'react';
import { ApplicationRecord } from '@/src/api/contracts';
import { LtrText } from '@/src/ui/LtrText';
import { Button } from '@/src/ui/Button';

export interface ApplicationPipelineViewProps {
  applications: ApplicationRecord[];
  onOpenApplication: (app: ApplicationRecord) => void;
  onExecuteNextAction: (app: ApplicationRecord) => void;
  onUpdateRecruitment: (app: ApplicationRecord) => void;
}

interface PipelineColumn {
  id: string;
  title: string;
  filter: (app: ApplicationRecord) => boolean;
  color: string;
}

export const ApplicationPipelineView: React.FC<ApplicationPipelineViewProps> = ({
  applications,
  onOpenApplication,
  onExecuteNextAction,
  onUpdateRecruitment,
}) => {
  const columns: PipelineColumn[] = [
    {
      id: 'intake_analysis',
      title: 'קליטה וניתוח',
      filter: (a) =>
        a.status === 'open' && (a.preparationStage === 'intake' || a.preparationStage === 'analysis'),
      color: 'border-t-cv-accent',
    },
    {
      id: 'tailoring_verification',
      title: 'התאמת קו״ח ואימות',
      filter: (a) =>
        a.status === 'open' &&
        (a.preparationStage === 'content_selection' ||
          a.preparationStage === 'verification' ||
          a.preparationStage === 'draft_ready') &&
        a.recruitmentStage === 'draft',
      color: 'border-t-cv-warning',
    },
    {
      id: 'applied',
      title: 'הוגשה מועמדות',
      filter: (a) => a.status === 'open' && a.recruitmentStage === 'applied',
      color: 'border-t-cv-info',
    },
    {
      id: 'interviewing',
      title: 'תהליך ראיונות',
      filter: (a) =>
        a.status === 'open' &&
        (a.recruitmentStage === 'screening' || a.recruitmentStage === 'interviewing'),
      color: 'border-t-purple-500',
    },
    {
      id: 'offer',
      title: 'הצעת שכר',
      filter: (a) => a.status === 'open' && a.recruitmentStage === 'offer',
      color: 'border-t-cv-success',
    },
    {
      id: 'closed',
      title: 'סגור וארכיון',
      filter: (a) => a.status === 'closed',
      color: 'border-t-cv-border-strong',
    },
  ];

  return (
    <div className="flex gap-3.5 overflow-x-auto pb-4 pt-1 items-start min-h-[520px]">
      {columns.map((col) => {
        const colApps = applications.filter(col.filter);
        return (
          <div
            key={col.id}
            className={`w-72 shrink-0 bg-cv-surface-muted/70 rounded-xl border border-cv-border/80  border-t-3 ${col.color} p-3 flex flex-col max-h-[75vh]`}
          >
            {/* Column Header */}
            <div className="flex items-center justify-between mb-3 px-1">
              <h3 className="text-xs font-bold text-cv-text">{col.title}</h3>
              <span className="text-xs font-bold bg-cv-surface text-cv-text-muted border border-cv-border px-2 py-0.5 rounded-full tabular-nums shadow-2xs">
                {colApps.length}
              </span>
            </div>

            {/* Column Body / Stack */}
            <div className="flex-1 overflow-y-auto space-y-2.5 pr-0.5">
              {colApps.length === 0 ? (
                <div className="py-8 text-center text-xs text-cv-text-muted border border-dashed border-cv-border rounded-lg">
                  אין משרות בשלב זה
                </div>
              ) : (
                colApps.map((app) => (
                  <div
                    key={app.id}
                    onClick={() => onOpenApplication(app)}
                    className="bg-cv-surface rounded-xl border border-cv-border/80 p-3.5 shadow-2xs hover:border-cv-accent transition-all cursor-pointer flex flex-col gap-2.5"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-1 mb-1">
                        <h4 className="font-bold text-xs sm:text-sm text-cv-text truncate">
                          <LtrText>{app.companyName}</LtrText>
                        </h4>
                        {app.needsAttention && (
                          <span
                            className="w-2 h-2 rounded-full bg-cv-warning shrink-0 mt-1"
                            title="דורש טיפול"
                          />
                        )}
                      </div>
                      <p className="text-xs text-cv-text-muted truncate">
                        <LtrText>{app.roleTitle}</LtrText>
                      </p>
                    </div>

                    {app.attentionReason && (
                      <div className="bg-cv-warning-soft border border-cv-warning/60 rounded p-1.5 text-[11px] text-cv-warning leading-tight">
                        {app.attentionReason}
                      </div>
                    )}

                    {/* Action button */}
                    <div
                      className="flex items-center justify-between gap-2 pt-2 border-t border-cv-border"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {app.nextAction ? (
                        <Button
                          size="sm"
                          variant="primary"
                          onClick={() => onExecuteNextAction(app)}
                          className="text-[11px] h-7 px-2.5 flex-1 truncate"
                        >
                          {app.nextAction.title}
                        </Button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => onUpdateRecruitment(app)}
                          className="text-[11px] text-cv-accent hover:underline font-medium"
                        >
                          עדכן סטטוס
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => onUpdateRecruitment(app)}
                        className="p-1 rounded text-cv-text-muted hover:text-cv-text"
                        title="עדכן שלב גיוס"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
