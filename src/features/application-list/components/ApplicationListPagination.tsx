import React from 'react';
import { cx } from '@/src/ui/cx';

export interface ApplicationListPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
}

export const ApplicationListPagination: React.FC<ApplicationListPaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
}) => {
  if (totalItems === 0) return null;

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  // Generate page numbers
  const pages: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 text-xs text-slate-500 dark:text-slate-400 select-none">
      {/* Item count text */}
      <div className="flex items-center gap-1.5 tabular-nums">
        <span>מציג</span>
        <strong className="font-semibold text-slate-700 dark:text-slate-200">
          {startItem}-{endItem}
        </strong>
        <span>מתוך</span>
        <strong className="font-semibold text-slate-700 dark:text-slate-200">{totalItems}</strong>
        <span>משרות</span>
      </div>

      {/* Page controls */}
      <div className="flex items-center gap-1">
        {/* Next (in RTL, next goes leftward or follows arrows) */}
        <button
          type="button"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none transition-colors"
          aria-label="עמוד קודם"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {pages.map((p) => {
          const isCurrent = p === currentPage;
          return (
            <button
              key={p}
              type="button"
              onClick={() => onPageChange(p)}
              className={cx(
                'w-8 h-8 rounded-lg font-medium text-xs flex items-center justify-center transition-colors tabular-nums',
                isCurrent
                  ? 'bg-indigo-600 text-white font-bold'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
              )}
              aria-current={isCurrent ? 'page' : undefined}
            >
              {p}
            </button>
          );
        })}

        <button
          type="button"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none transition-colors"
          aria-label="עמוד הבא"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {onPageSizeChange && (
          <div className="mr-3 flex items-center gap-1">
            <span className="text-slate-400 text-[11px]">לדף:</span>
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md py-1 px-1.5 text-xs text-slate-700 dark:text-slate-300"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
        )}
      </div>
    </div>
  );
};
