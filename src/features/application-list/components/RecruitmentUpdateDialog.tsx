import React, { useState, useEffect } from 'react';
import { ApplicationRecord, RecruitmentStage, RecruitmentUpdatePayload } from '@/src/api/contracts';
import { Dialog } from '@/src/ui/Dialog';
import { Button } from '@/src/ui/Button';
import { Select } from '@/src/ui/Select';
import { Input } from '@/src/ui/Input';
import { LtrText } from '@/src/ui/LtrText';

export interface RecruitmentUpdateDialogProps {
  application: ApplicationRecord | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (applicationId: string, payload: RecruitmentUpdatePayload) => void;
  isSubmitting?: boolean;
}

export const RecruitmentUpdateDialog: React.FC<RecruitmentUpdateDialogProps> = ({
  application,
  isOpen,
  onClose,
  onSave,
  isSubmitting = false,
}) => {
  const [stage, setStage] = useState<RecruitmentStage>('draft');
  const [interviewDate, setInterviewDate] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [salary, setSalary] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (application) {
      setStage(application.recruitmentStage || 'draft');
      setInterviewDate(application.nextInterviewDate || '');
      setContactPerson(application.contactPerson || '');
      setContactInfo(application.contactEmailOrPhone || '');
      setSalary(application.salaryTarget || '');
      setNotes(application.notes || '');
    }
  }, [application]);

  if (!application) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(application.id, {
      recruitmentStage: stage,
      nextInterviewDate: interviewDate || undefined,
      contactPerson: contactPerson || undefined,
      contactEmailOrPhone: contactInfo || undefined,
      salaryTarget: salary || undefined,
      notes: notes || undefined,
    });
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="ניהול ועדכון תהליך גיוס"
      description={`עדכון פרטי גיוס וסטטוס עבור ${application.companyName}`}
      footer={
        <>
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            ביטול
          </Button>
          <Button variant="primary" onClick={handleSubmit} isLoading={isSubmitting}>
            שמירת עדכונים
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-right">
        {/* Recruitment Stage */}
        <div>
          <label className="block text-xs font-semibold text-cv-text mb-1.5">
            שלב גיוס נוכחי
          </label>
          <Select
            value={stage}
            onChange={(e) => setStage(e.target.value as RecruitmentStage)}
            options={[
              { value: 'draft', label: 'טיוטה טרם הגשה' },
              { value: 'applied', label: 'הוגשה מועמדות' },
              { value: 'screening', label: 'סינון טלפוני / HR' },
              { value: 'interviewing', label: 'תהליך ראיונות מקצועיים' },
              { value: 'offer', label: 'התקבלה הצעת שכר' },
              { value: 'rejected', label: 'לא התקבל' },
              { value: 'withdrawn', label: 'הוסרה מועמדות' },
            ]}
          />
        </div>

        {/* Next Interview Date */}
        <div>
          <label className="block text-xs font-semibold text-cv-text mb-1.5">
            מועד ראיון הבא (אם יש)
          </label>
          <Input
            type="datetime-local"
            value={interviewDate}
            onChange={(e) => setInterviewDate(e.target.value)}
          />
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-cv-text mb-1.5">
              איש קשר / מגייס/ת
            </label>
            <Input
              value={contactPerson}
              onChange={(e) => setContactPerson(e.target.value)}
              placeholder="שם המגייס/ת או המנהל"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-cv-text mb-1.5">
              פרטי קשר (טלפון / אימייל)
            </label>
            <Input
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
              placeholder="למשל hr@company.com"
            />
          </div>
        </div>

        {/* Expected Salary */}
        <div>
          <label className="block text-xs font-semibold text-cv-text mb-1.5">
            ציפיית שכר / שכר שהוצע
          </label>
          <Input
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            placeholder="למשל 42,000 ₪ לחודש + אופציות"
          />
        </div>

        {/* Notes & Feedback */}
        <div>
          <label className="block text-xs font-semibold text-cv-text mb-1.5">
            הערות וסיכומי שיחות
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            placeholder="רשמים מהראיון, שאלות טכניות שנשאלו, משימות בית..."
            className="w-full bg-cv-surface border border-cv-border rounded-lg p-2.5 text-xs text-cv-text placeholder:text-cv-text-muted focus:outline-none focus:ring-2 focus:ring-cv-focus"
          />
        </div>
      </form>
    </Dialog>
  );
};
