import React from 'react';
import { PreparationStage, RecruitmentStage } from '@/src/api/contracts';
import { ViewSwitch, ApplicationViewType } from '@/src/ui/ViewSwitch';
import { Input } from '@/src/ui/Input';
import { Select } from '@/src/ui/Select';
import { Button } from '@/src/ui/Button';

export interface ApplicationListToolbarProps {
  search: string;
  onSearchChange: (query: string) => void;
  preparationStage: PreparationStage | 'all';
  onPreparationStageChange: (stage: PreparationStage | 'all') => void;
  recruitmentStage: RecruitmentStage | 'all';
  onRecruitmentStageChange: (stage: RecruitmentStage | 'all') => void;
  sortBy: 'updatedAt' | 'createdAt' | 'companyName' | 'needsAttention';
  onSortChange: (sort: 'updatedAt' | 'createdAt' | 'companyName' | 'needsAttention') => void;
  view: ApplicationViewType;
  onViewChange: (view: ApplicationViewType) => void;
  onNewApplication: () => void;
  onResetFilters: () => void;
  hasActiveFilters: boolean;
}

export const ApplicationListToolbar: React.FC<ApplicationListToolbarProps> = ({
  search,
  onSearchChange,
  preparationStage,
  onPreparationStageChange,
  recruitmentStage,
  onRecruitmentStageChange,
  sortBy,
  onSortChange,
  view,
  onViewChange,
  onNewApplication,
  onResetFilters,
  hasActiveFilters,
}) => {
  return (
    <div className="flex flex-col gap-3 py-1">
      {/* Top row: Search, New Application, View Switcher */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="w-full sm:max-w-md">
          <Input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            onClear={() => onSearchChange('')}
            placeholder="חיפוש חברה, תפקיד, מיקום או מילת מפתח..."
            startAdornment={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            }
          />
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between sm:justify-end gap-2.5">
          <ViewSwitch value={view} onChange={onViewChange} />

          <Button
            variant="primary"
            onClick={onNewApplication}
            startIcon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            }
          >
            הוספת משרה
          </Button>
        </div>
      </div>

      {/* Filter Chips / Dropdowns Row */}
      <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
        {/* Preparation Stage Filter */}
        <div className="w-40 sm:w-44">
          <Select
            value={preparationStage}
            onChange={(e) => onPreparationStageChange(e.target.value as PreparationStage | 'all')}
            options={[
              { value: 'all', label: 'כל שלבי הכנת קו״ח' },
              { value: 'intake', label: 'קליטת משרה' },
              { value: 'analysis', label: 'ניתוח דרישות' },
              { value: 'content_selection', label: 'בחירת עובדות' },
              { value: 'verification', label: 'אימות והתאמה' },
              { value: 'draft_ready', label: 'טיוטה מוכנה' },
              { value: 'completed', label: 'הכנה הושלמה' },
            ]}
          />
        </div>

        {/* Recruitment Stage Filter */}
        <div className="w-40 sm:w-44">
          <Select
            value={recruitmentStage}
            onChange={(e) => onRecruitmentStageChange(e.target.value as RecruitmentStage | 'all')}
            options={[
              { value: 'all', label: 'כל שלבי הגיוס' },
              { value: 'draft', label: 'טרם הוגש (טיוטה)' },
              { value: 'applied', label: 'הוגשה מועמדות' },
              { value: 'screening', label: 'סינון טלפוני / HR' },
              { value: 'interviewing', label: 'תהליך ראיונות' },
              { value: 'offer', label: 'הצעת שכר' },
              { value: 'rejected', label: 'לא התקבל' },
              { value: 'withdrawn', label: 'הוסרה מועמדות' },
            ]}
          />
        </div>

        {/* Sort Filter */}
        <div className="w-36 sm:w-40">
          <Select
            value={sortBy}
            onChange={(e) =>
              onSortChange(e.target.value as 'updatedAt' | 'createdAt' | 'companyName' | 'needsAttention')
            }
            options={[
              { value: 'updatedAt', label: 'מיון: עדכון אחרון' },
              { value: 'needsAttention', label: 'מיון: דחיפות וטיפול' },
              { value: 'companyName', label: 'מיון: שם חברה (א-ת)' },
              { value: 'createdAt', label: 'מיון: מועד הוספה' },
            ]}
          />
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="inline-flex items-center gap-1 px-2.5 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span>איפוס סינונים</span>
          </button>
        )}
      </div>
    </div>
  );
};
