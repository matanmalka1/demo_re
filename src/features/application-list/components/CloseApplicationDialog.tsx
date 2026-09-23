import React, { useState } from 'react';
import { ApplicationRecord } from '@/api/contracts';
import { Dialog } from '@/ui/Dialog';
import { Button } from '@/ui/Button';
import { Select } from '@/ui/Select';
import { LtrText } from '@/ui/LtrText';

export interface CloseApplicationDialogProps {
  application: ApplicationRecord | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string, notes?: string) => void;
  isSubmitting?: boolean;
}

export const CloseApplicationDialog: React.FC<CloseApplicationDialogProps> = ({
  application,
  isOpen,
  onClose,
  onConfirm,
  isSubmitting = false,
}) => {
  const [reason, setReason] = useState('התקבלה הודעת דחייה');
  const [notes, setNotes] = useState('');

  if (!application) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(reason, notes);
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="סגירת מועמדות למשרה"
      description={`סגירת התהליך עבור ${application.companyName} (${application.roleTitle})`}
      footer={
        <>
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            ביטול
          </Button>
          <Button
            variant="danger"
            onClick={handleSubmit}
            isLoading={isSubmitting}
          >
            אישור סגירת מועמדות
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-right">
        <div>
          <label className="block text-xs font-semibold text-cv-text mb-1.5">
            סיבת סגירת המועמדות
          </label>
          <Select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            options={[
              { value: 'התקבלה הודעת דחייה', label: 'התקבלה הודעת דחייה מהחברה' },
              { value: 'הוסרה מועמדות על ידי המועמד', label: 'החלטתי להסיר מועמדות (שכר / מיקום / תרבות)' },
              { value: 'התקבלה הצעה במקום אחר', label: 'חתמתי על הצעה בחברה אחרת' },
              { value: 'המשרה הוקפאה או בוטלה', label: 'המשרה הוקפאה או בוטלה על ידי המעסיק' },
              { value: 'אין מענה ממושך (Ghosting)', label: 'אין מענה ממושך מחברת ההשמה / המעסיק' },
              { value: 'אחר', label: 'סיבה אחרת' },
            ]}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-cv-text mb-1.5">
            הערות או לקחים מהתהליך (אופציונלי)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            placeholder="למשל: ביקשו יותר ניסיון בארכיטקטורת ענן, לחזור עליהם בעוד שנה..."
            className="w-full bg-cv-surface border border-cv-border rounded-lg p-2.5 text-xs text-cv-text placeholder:text-cv-text-muted focus:outline-none focus:ring-2 focus:ring-cv-focus"
          />
        </div>

        <div className="bg-cv-surface-muted p-3 rounded-xl border border-cv-border text-xs text-cv-text-muted">
          <p>
            לאחר הסגירה, המשרה תועבר ללשונית "סגורות וארכיון". תוכל לבטל את הפעולה מיד באמצעות כפתור
            ביטול שיופיע במסך.
          </p>
        </div>
      </form>
    </Dialog>
  );
};
