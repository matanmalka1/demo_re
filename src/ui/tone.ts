export type Tone = 'neutral' | 'primary' | 'success' | 'warning' | 'danger' | 'info';

export interface ToneStyles {
  bg: string;
  text: string;
  border: string;
  dot: string;
}

export const toneStyles: Record<Tone, ToneStyles> = {
  neutral: {
    bg: 'bg-cv-surface-muted',
    text: 'text-cv-text',
    border: 'border-cv-border',
    dot: 'bg-cv-text-muted',
  },
  primary: {
    bg: 'bg-cv-accent-soft',
    text: 'text-cv-accent',
    border: 'border-cv-accent',
    dot: 'bg-cv-accent',
  },
  success: {
    bg: 'bg-cv-success-soft',
    text: 'text-cv-success',
    border: 'border-cv-success',
    dot: 'bg-cv-success',
  },
  warning: {
    bg: 'bg-cv-warning-soft',
    text: 'text-cv-warning',
    border: 'border-cv-warning',
    dot: 'bg-cv-warning',
  },
  danger: {
    bg: 'bg-cv-blocker-soft',
    text: 'text-cv-blocker',
    border: 'border-cv-blocker',
    dot: 'bg-cv-blocker',
  },
  info: {
    bg: 'bg-cv-info-soft',
    text: 'text-cv-info',
    border: 'border-cv-info',
    dot: 'bg-cv-info',
  },
};
