import React from 'react';
import { NextAction } from '@/api/contracts';
import { Button } from '@/ui/Button';

export interface ApplicationNextActionProps {
  nextAction?: NextAction | null;
  needsAttention?: boolean;
  attentionReason?: string;
  onExecute: () => void;
  onClear?: () => void;
}

export const ApplicationNextAction: React.FC<ApplicationNextActionProps> = ({
  nextAction,
  needsAttention,
  attentionReason,
  onExecute,
  onClear,
}) => {
  if (!nextAction && !needsAttention) {
    return (
      <span className="text-xs text-cv-text-muted italic">
        אין פעולה מתוזמנת
      </span>
    );
  }

  return (
    <div className="flex items-center gap-2 max-w-sm">
      <div className="min-w-0 flex-1">
        {nextAction && (
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-cv-text truncate">
              {nextAction.title}
            </span>
          </div>
        )}
        {attentionReason && (
          <p className="text-[11px] text-cv-warning font-medium truncate mt-0.5">
            {attentionReason}
          </p>
        )}
      </div>

      <div className="flex items-center gap-1 shrink-0">
        {nextAction && (
          <Button
            size="sm"
            variant={needsAttention ? 'primary' : 'outline'}
            onClick={onExecute}
            className="text-xs h-7.5 px-2.5 font-medium"
          >
            בצע
          </Button>
        )}

        {nextAction?.isDismissible && onClear && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClear();
            }}
            title="נקה פעולה הבאה"
            aria-label="נקה פעולה מומלצת"
            className="p-1 rounded text-cv-text-muted hover:text-cv-text-muted transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};
