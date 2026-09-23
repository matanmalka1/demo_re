import React from 'react';
import { ApplicationRecord } from '@/api/contracts';
import { Dialog } from '@/ui/Dialog';
import { Button } from '@/ui/Button';
import { LtrText } from '@/ui/LtrText';

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
        <p className="text-cv-text">
          האם אתה בטוח שברצונך למחוק את המועמדות עבור{' '}
          <strong className="text-cv-text">
            <LtrText>{application.companyName}</LtrText>
          </strong>{' '}
          בתפקיד{' '}
          <strong className="text-cv-text">
            <LtrText>{application.roleTitle}</LtrText>
          </strong>
          ?
        </p>
        <div className="bg-cv-blocker-soft border border-cv-blocker/80 rounded-xl p-3 text-cv-blocker text-xs">
          מחיקת המשרה תסיר גם את כל היסטוריית הגרסאות, ניתוחי דרישות המשרה וטיוטות קורות החיים
          המותאמות שנבנו עבור משרה זו.
        </div>
      </div>
    </Dialog>
  );
};
