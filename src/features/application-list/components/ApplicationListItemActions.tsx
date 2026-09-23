import React, { useState, useRef, useEffect } from 'react';
import { ApplicationRecord } from '@/api/contracts';
import { IconButton } from '@/ui/IconButton';

export interface ApplicationListItemActionsProps {
  application: ApplicationRecord;
  onOpen: () => void;
  onUpdateRecruitment: () => void;
  onCloseApplication: () => void;
  onDeleteApplication: () => void;
}

export const ApplicationListItemActions: React.FC<ApplicationListItemActionsProps> = ({
  application,
  onOpen,
  onUpdateRecruitment,
  onCloseApplication,
  onDeleteApplication,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative inline-flex items-center" ref={menuRef}>
      <IconButton
        icon={
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
            />
          </svg>
        }
        aria-label={`פעולות נוספות עבור ${application.companyName}`}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
        size="sm"
      />

      {isOpen && (
        <div
          role="menu"
          className="absolute left-0 top-full mt-1.5 w-48 bg-cv-surface rounded-xl shadow-lg border border-cv-border py-1.5 z-30 text-right text-xs divide-y divide-cv-hairline"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="py-1">
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setIsOpen(false);
                onOpen();
              }}
              className="w-full flex items-center gap-2 px-3.5 py-2 text-cv-text hover:bg-cv-surface-muted transition-colors"
            >
              <svg className="w-4 h-4 text-cv-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span>פתח פרטי משרה</span>
            </button>

            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setIsOpen(false);
                onUpdateRecruitment();
              }}
              className="w-full flex items-center gap-2 px-3.5 py-2 text-cv-text hover:bg-cv-surface-muted transition-colors"
            >
              <svg className="w-4 h-4 text-cv-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <span>עדכן סטטוס גיוס</span>
            </button>
          </div>

          <div className="py-1">
            {application.status === 'open' && (
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  setIsOpen(false);
                  onCloseApplication();
                }}
                className="w-full flex items-center gap-2 px-3.5 py-2 text-cv-text hover:bg-cv-surface-muted transition-colors"
              >
                <svg className="w-4 h-4 text-cv-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>סגור מועמדות</span>
              </button>
            )}

            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setIsOpen(false);
                onDeleteApplication();
              }}
              className="w-full flex items-center gap-2 px-3.5 py-2 text-cv-blocker hover:bg-cv-blocker-soft transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <span>מחק משרה לצמיתות</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
