import React from 'react';
import { PreparationStage, RecruitmentStage, OperationStatus } from '@/src/api/contracts';
import {
  PREPARATION_STAGE_INFO,
  RECRUITMENT_STAGE_INFO,
} from '../model/applicationListPresentation';
import { StatusBadge } from '@/src/ui/StatusBadge';

export interface ApplicationListStatusesProps {
  preparationStage: PreparationStage;
  recruitmentStage: RecruitmentStage;
  activeOperation?: OperationStatus;
  compact?: boolean;
}

export const ApplicationListStatuses: React.FC<ApplicationListStatusesProps> = ({
  preparationStage,
  recruitmentStage,
  activeOperation,
  compact = false,
}) => {
  const prepInfo = PREPARATION_STAGE_INFO[preparationStage] || PREPARATION_STAGE_INFO.intake;
  const recInfo = RECRUITMENT_STAGE_INFO[recruitmentStage] || RECRUITMENT_STAGE_INFO.draft;

  const isOperationRunning = activeOperation && activeOperation.status === 'running';

  if (compact) {
    return (
      <div className="flex flex-col gap-1.5 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="text-slate-400 text-[11px]">הכנה:</span>
          <span className="font-semibold text-slate-800 dark:text-slate-200">
            {prepInfo.shortLabel}
          </span>
          <span className="text-[10px] text-slate-400 tabular-nums">
            ({prepInfo.stepNumber}/{prepInfo.totalSteps})
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-slate-400 text-[11px]">גיוס:</span>
          <StatusBadge tone={recInfo.tone} size="sm">
            {recInfo.label}
          </StatusBadge>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 min-w-0">
      {/* Preparation Track */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300">
            <span className="text-slate-400 text-[11px]">הכנת קו״ח:</span>
            <span>{prepInfo.label}</span>
          </div>
          <span className="text-[11px] text-slate-400 tabular-nums font-mono">
            {prepInfo.stepNumber}/{prepInfo.totalSteps}
          </span>
        </div>

        {/* Progress Mini Bar */}
        <div
          className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden flex"
          role="progressbar"
          aria-valuenow={prepInfo.stepNumber}
          aria-valuemin={1}
          aria-valuemax={prepInfo.totalSteps}
          aria-label={`שלב הכנה: ${prepInfo.label}`}
        >
          <div
            className="bg-indigo-600 dark:bg-indigo-500 h-full rounded-full transition-all duration-300"
            style={{ width: `${(prepInfo.stepNumber / prepInfo.totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Recruitment Status + Operation */}
      <div className="flex items-center gap-2 flex-wrap">
        <StatusBadge tone={recInfo.tone} size="sm">
          {recInfo.label}
        </StatusBadge>

        {isOperationRunning && (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 px-2 py-0.5 rounded-md animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-ping shrink-0" />
            <span>פעולה רצה...</span>
          </span>
        )}
      </div>
    </div>
  );
};
