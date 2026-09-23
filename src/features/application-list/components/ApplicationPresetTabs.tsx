import React from 'react';
import { ApplicationPresetCounts } from '@/src/api/contracts';
import { cx } from '@/src/ui/cx';

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
      className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none border-b border-slate-200/80 dark:border-slate-800"
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
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-900 hover:border-slate-300 dark:text-slate-400 dark:hover:text-slate-200'
            )}
          >
            <span>{tab.label}</span>
            <span
              className={cx(
                'text-xs font-semibold px-2 py-0.5 rounded-full tabular-nums transition-colors',
                isActive
                  ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300'
                  : tab.alert
                  ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
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
