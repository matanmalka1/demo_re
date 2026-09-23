import React from 'react';
import { ApplicationRecord } from '@/src/api/contracts';
import { Dialog } from '@/src/ui/Dialog';
import { Button } from '@/src/ui/Button';
import { LtrText } from '@/src/ui/LtrText';

export interface DeleteApplicationDialogProps {
  application: ApplicationRecord | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isSubmitting?: boolean;
}

export const DeleteApplicationDialog: React.FC<DeleteApplicationDialogProps> = ({
  application,
  isOpen,
  onClose,
  onConfirm,
  isSubmitting = false,
}) => {
  if (!application) return null;

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="מחיקת משרה לצמיתות"
      description="פעולה זו היא בלתי הפיכה"
      footer={
        <>
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            ביטול
          </Button>
          <Button
            variant="danger"
            onClick={onConfirm}
            isLoading={isSubmitting}
          >
            מחק לצמיתות
          </Button>
        </>
      }
    >
      <div className="space-y-3 text-right text-xs sm:text-sm">
        <p className="text-slate-700 dark:text-slate-300">
          האם אתה בטוח שברצונך למחוק את המועמדות עבור{' '}
          <strong className="text-slate-900 dark:text-slate-100">
            <LtrText>{application.companyName}</LtrText>
          </strong>{' '}
          בתפקיד{' '}
          <strong className="text-slate-900 dark:text-slate-100">
            <LtrText>{application.roleTitle}</LtrText>
          </strong>
          ?
        </p>
        <div className="bg-rose-50 dark:bg-rose-950/40 border border-rose-200/80 dark:border-rose-900/40 rounded-xl p-3 text-rose-800 dark:text-rose-200 text-xs">
          מחיקת המשרה תסיר גם את כל היסטוריית הגרסאות, ניתוחי דרישות המשרה וטיוטות קורות החיים
          המותאמות שנבנו עבור משרה זו.
        </div>
      </div>
    </Dialog>
  );
};
