import React from 'react';
import { cx } from '@/ui/cx';

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
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 text-xs text-cv-text-muted select-none">
      {/* Item count text */}
      <div className="flex items-center gap-1.5 tabular-nums">
        <span>מציג</span>
        <strong className="font-semibold text-cv-text">
          {startItem}-{endItem}
        </strong>
        <span>מתוך</span>
        <strong className="font-semibold text-cv-text">{totalItems}</strong>
        <span>משרות</span>
      </div>

      {/* Page controls */}
      <div className="flex items-center gap-1">
        {/* Next (in RTL, next goes leftward or follows arrows) */}
        <button
          type="button"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="p-1.5 rounded-lg border border-cv-border bg-cv-surface text-cv-text hover:bg-cv-surface-muted disabled:opacity-40 disabled:pointer-events-none transition-colors"
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
                  ? 'bg-cv-accent text-cv-on-accent font-bold'
                  : 'bg-cv-surface  border border-cv-border  text-cv-text  hover:bg-cv-surface-muted'
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
          className="p-1.5 rounded-lg border border-cv-border bg-cv-surface text-cv-text hover:bg-cv-surface-muted disabled:opacity-40 disabled:pointer-events-none transition-colors"
          aria-label="עמוד הבא"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {onPageSizeChange && (
          <div className="mr-3 flex items-center gap-1">
            <span className="text-cv-text-muted text-[11px]">לדף:</span>
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="bg-cv-surface border border-cv-border rounded-md py-1 px-1.5 text-xs text-cv-text"
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
