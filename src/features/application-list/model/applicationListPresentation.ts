import { PreparationStage, RecruitmentStage, ApplicationStatus } from '@/api/contracts';
import { Tone } from '@/ui/tone';

export interface StagePresentation {
  label: string;
  shortLabel: string;
  tone: Tone;
  stepNumber: number;
  totalSteps: number;
  description: string;
}

export const PREPARATION_STAGE_INFO: Record<PreparationStage, StagePresentation> = {
  intake: {
    label: 'קליטת משרה',
    shortLabel: 'קליטה',
    tone: 'neutral',
    stepNumber: 1,
    totalSteps: 5,
    description: 'הזנת תיאור המשרה ומקורותיה',
  },
  analysis: {
    label: 'ניתוח דרישות',
    shortLabel: 'ניתוח',
    tone: 'info',
    stepNumber: 2,
    totalSteps: 5,
    description: 'חילוץ דרישות סף, טכנולוגיות ומילות מפתח',
  },
  content_selection: {
    label: 'בחירת עובדות',
    shortLabel: 'עובדות',
    tone: 'primary',
    stepNumber: 3,
    totalSteps: 5,
    description: 'בחירת הישגים ופרויקטים ממאגר העובדות',
  },
  verification: {
    label: 'אימות והתאמה',
    shortLabel: 'אימות',
    tone: 'warning',
    stepNumber: 4,
    totalSteps: 5,
    description: 'אימות התאמה לדרישות ובדיקת כיסוי',
  },
  draft_ready: {
    label: 'טיוטה מוכנה',
    shortLabel: 'טיוטה',
    tone: 'success',
    stepNumber: 5,
    totalSteps: 5,
    description: 'טיוטת קורות החיים מוכנה לבדיקה והורדה',
  },
  completed: {
    label: 'הכנה הושלמה',
    shortLabel: 'הושלם',
    tone: 'success',
    stepNumber: 5,
    totalSteps: 5,
    description: 'קורות חיים סופיים הופקו ונשמרו',
  },
};

export const RECRUITMENT_STAGE_INFO: Record<RecruitmentStage, { label: string; tone: Tone; badgeDotColor: string }> = {
  draft: {
    label: 'טיוטה טרם הגשה',
    tone: 'neutral',
    badgeDotColor: 'bg-cv-text-muted',
  },
  applied: {
    label: 'הוגשה מועמדות',
    tone: 'info',
    badgeDotColor: 'bg-cv-info',
  },
  screening: {
    label: 'סינון טלפוני / HR',
    tone: 'primary',
    badgeDotColor: 'bg-cv-accent',
  },
  interviewing: {
    label: 'בתהליך ראיונות',
    tone: 'warning',
    badgeDotColor: 'bg-cv-warning',
  },
  offer: {
    label: 'התקבלה הצעת שכר',
    tone: 'success',
    badgeDotColor: 'bg-cv-success',
  },
  rejected: {
    label: 'לא התקבל',
    tone: 'danger',
    badgeDotColor: 'bg-cv-blocker',
  },
  withdrawn: {
    label: 'הוסרה מועמדות',
    tone: 'neutral',
    badgeDotColor: 'bg-cv-text-muted',
  },
  archived: {
    label: 'בארכיון',
    tone: 'neutral',
    badgeDotColor: 'bg-cv-text-muted',
  },
};

export function formatHebrewDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;

    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      if (diffHours === 0) return 'עודכן עכשיו';
      return `עודכן היום (לפני ${diffHours} שע')`;
    }
    if (diffDays === 1) return 'עודכן אתמול';
    if (diffDays < 7) return `עודכן לפני ${diffDays} ימים`;

    return date.toLocaleDateString('he-IL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  } catch {
    return dateString;
  }
}

export function formatDateTimeHebrew(dateString: string): string {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return (
      date.toLocaleDateString('he-IL', { day: '2-digit', month: '2-digit', year: 'numeric' }) +
      ' ' +
      date.toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })
    );
  } catch {
    return dateString;
  }
}
