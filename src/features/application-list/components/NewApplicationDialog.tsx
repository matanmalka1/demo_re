import React, { useState } from 'react';
import { Dialog } from '@/src/ui/Dialog';
import { Button } from '@/src/ui/Button';
import { Input } from '@/src/ui/Input';

export interface NewApplicationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: {
    companyName: string;
    roleTitle: string;
    location?: string;
    jobUrl?: string;
    notes?: string;
  }) => void;
  isSubmitting?: boolean;
}

export const NewApplicationDialog: React.FC<NewApplicationDialogProps> = ({
  isOpen,
  onClose,
  onCreate,
  isSubmitting = false,
}) => {
  const [companyName, setCompanyName] = useState('');
  const [roleTitle, setRoleTitle] = useState('');
  const [location, setLocation] = useState('תל אביב / היברידי');
  const [jobUrl, setJobUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim() || !roleTitle.trim()) {
      setError('נא למלא שם חברה ושם תפקיד');
      return;
    }
    setError('');
    onCreate({
      companyName: companyName.trim(),
      roleTitle: roleTitle.trim(),
      location: location.trim() || undefined,
      jobUrl: jobUrl.trim() || undefined,
      notes: notes.trim() || undefined,
    });
    // Reset
    setCompanyName('');
    setRoleTitle('');
    setJobUrl('');
    setNotes('');
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="הוספת משרה חדשה"
      description="הזן את פרטי המשרה כדי להתחיל בהתאמת קורות החיים ומעקב גיוס"
      footer={
        <>
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            ביטול
          </Button>
          <Button variant="primary" onClick={handleSubmit} isLoading={isSubmitting}>
            הוסף משרה והתחל ניתוח
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-right">
        {error && (
          <div className="bg-cv-blocker-soft text-cv-blocker text-xs p-2.5 rounded-lg border border-cv-blocker">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-cv-text mb-1.5">
              שם החברה <span className="text-cv-blocker">*</span>
            </label>
            <Input
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="למשל Google, Monday, Wiz"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-cv-text mb-1.5">
              שם התפקיד / משרה <span className="text-cv-blocker">*</span>
            </label>
            <Input
              value={roleTitle}
              onChange={(e) => setRoleTitle(e.target.value)}
              placeholder="למשל Senior Frontend Engineer"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-cv-text mb-1.5">
              מיקום ומודל עבודה
            </label>
            <Input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="תל אביב / היברידי / מרחוק"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-cv-text mb-1.5">
              קישור למודעת המשרה (URL)
            </label>
            <Input
              type="url"
              value={jobUrl}
              onChange={(e) => setJobUrl(e.target.value)}
              placeholder="https://..."
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-cv-text mb-1.5">
            הערות או דגשים מיוחדים
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            placeholder="איש קשר, המלצה מחבר, שכר מבוקש..."
            className="w-full bg-cv-surface border border-cv-border rounded-lg p-2.5 text-xs text-cv-text placeholder:text-cv-text-muted focus:outline-none focus:ring-2 focus:ring-cv-focus"
          />
        </div>
      </form>
    </Dialog>
  );
};
