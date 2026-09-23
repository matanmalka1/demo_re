import React from 'react';
import { ApplicationPresetCounts } from '@/api/contracts';
import { cx } from '@/ui/cx';

export type PresetTabKey = 'all' | 'attention' | 'open' | 'preparation' | 'recruitment' | 'closed';

export interface ApplicationPresetTabsProps {
  activePreset: PresetTabKey;
  onChange: (preset: PresetTabKey) => void;
  counts: ApplicationPresetCounts;
}

export const ApplicationPresetTabs: React.FC<ApplicationPresetTabsProps> = ({
  activePreset,
  onChange,
  counts,
}) => {
  const tabs: { key: PresetTabKey; label: string; count: number; alert?: boolean }[] = [
    { key: 'all', label: 'כל המשרות', count: counts.all },
    { key: 'attention', label: 'דורש טיפול', count: counts.attention, alert: counts.attention > 0 },
    { key: 'open', label: 'מועמדויות פתוחות', count: counts.open },
    { key: 'preparation', label: 'בשלבי הכנת קו״ח', count: counts.preparation },
    { key: 'recruitment', label: 'גיוס פעיל', count: counts.recruitment },
    { key: 'closed', label: 'סגורות וארכיון', count: counts.closed },
  ];

  return (
    <div
      role="tablist"
      aria-label="קטגוריות משרות"
      className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none border-b border-cv-border/80"
    >
      {tabs.map((tab) => {
        const isActive = activePreset === tab.key;
        return (
          <button
            key={tab.key}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.key)}
            className={cx(
              'flex items-center gap-2 px-3.5 py-2.5 text-xs sm:text-sm font-medium border-b-2 -mb-[2px] transition-all whitespace-nowrap cursor-pointer select-none',
              isActive
                ? 'border-cv-accent text-cv-accent  font-semibold'
                : 'border-transparent text-cv-text-muted hover:text-cv-text hover:border-cv-border  '
            )}
          >
            <span>{tab.label}</span>
            <span
              className={cx(
                'text-xs font-semibold px-2 py-0.5 rounded-full tabular-nums transition-colors',
                isActive
                  ? 'bg-cv-accent-soft text-cv-accent '
                  : tab.alert
                  ? 'bg-cv-warning-soft  text-cv-warning '
                  : 'bg-cv-surface-muted  text-cv-text-muted '
              )}
            >
              {tab.count}
            </span>
          </button>
        );
      })}
    </div>
  );
};
