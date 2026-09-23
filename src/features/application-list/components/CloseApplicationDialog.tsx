import React, { useState } from 'react';
import { ApplicationRecord } from '@/src/api/contracts';
import { Dialog } from '@/src/ui/Dialog';
import { Button } from '@/src/ui/Button';
import { Select } from '@/src/ui/Select';
import { LtrText } from '@/src/ui/LtrText';

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
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
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
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            הערות או לקחים מהתהליך (אופציונלי)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            placeholder="למשל: ביקשו יותר ניסיון בארכיטקטורת ענן, לחזור עליהם בעוד שנה..."
            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-2.5 text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
          <p>
            לאחר הסגירה, המשרה תועבר ללשונית "סגורות וארכיון". תוכל לבטל את הפעולה מיד באמצעות כפתור
            ביטול שיופיע במסך.
          </p>
        </div>
      </form>
    </Dialog>
  );
};
