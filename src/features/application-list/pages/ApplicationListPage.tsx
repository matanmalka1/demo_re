import React, { useState, useEffect, useCallback } from 'react';
import {
  ApplicationRecord,
  PreparationStage,
  RecruitmentStage,
  ApplicationPresetCounts,
  RecruitmentUpdatePayload,
} from '@/src/api/contracts';
import {
  fetchApplications,
  clearNextAction,
  updateRecruitmentDetails,
  closeApplication,
  undoCloseApplication,
  deleteApplication,
  createApplication,
  resetDatabase,
} from '@/src/api/applications';
import { ApplicationViewType } from '@/src/ui/ViewSwitch';
import { ApplicationAttentionSummary } from '../components/ApplicationAttentionSummary';
import { ApplicationPresetTabs, PresetTabKey } from '../components/ApplicationPresetTabs';
import { ApplicationListToolbar } from '../components/ApplicationListToolbar';
import { ApplicationListTable } from '../components/ApplicationListTable';
import { ApplicationCardsView } from '../components/ApplicationCardsView';
import { ApplicationPipelineView } from '../components/ApplicationPipelineView';
import { ApplicationListPagination } from '../components/ApplicationListPagination';
import { CloseApplicationDialog } from '../components/CloseApplicationDialog';
import { DeleteApplicationDialog } from '../components/DeleteApplicationDialog';
import { RecruitmentUpdateDialog } from '../components/RecruitmentUpdateDialog';
import { NewApplicationDialog } from '../components/NewApplicationDialog';
import { EmptyState } from '@/src/ui/EmptyState';
import { Skeleton } from '@/src/ui/Skeleton';
import { LiveRegion } from '@/src/ui/LiveRegion';
import { ErrorCallout } from '@/src/ui/ErrorCallout';
import { Dialog } from '@/src/ui/Dialog';
import { Button } from '@/src/ui/Button';
import { LtrText } from '@/src/ui/LtrText';
import { formatDateTimeHebrew } from '../model/applicationListPresentation';

const VIEW_STORAGE_KEY = 'cv_tailor_view_preference';

export const ApplicationListPage: React.FC = () => {
  // 1. View state & storage
  const [view, setView] = useState<ApplicationViewType>(() => {
    try {
      const saved = localStorage.getItem(VIEW_STORAGE_KEY);
      if (saved === 'table' || saved === 'cards' || saved === 'pipeline') {
        return saved;
      }
    } catch {}
    return 'table';
  });

  const handleViewChange = (newView: ApplicationViewType) => {
    setView(newView);
    try {
      localStorage.setItem(VIEW_STORAGE_KEY, newView);
    } catch {}
  };

  // 2. Filters & pagination state
  const [preset, setPreset] = useState<PresetTabKey>('all');
  const [search, setSearch] = useState('');
  const [prepStage, setPrepStage] = useState<PreparationStage | 'all'>('all');
  const [recStage, setRecStage] = useState<RecruitmentStage | 'all'>('all');
  const [sortBy, setSortBy] = useState<'updatedAt' | 'createdAt' | 'companyName' | 'needsAttention'>('updatedAt');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // 3. Query results state
  const [applications, setApplications] = useState<ApplicationRecord[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [counts, setCounts] = useState<ApplicationPresetCounts>({
    all: 0,
    attention: 0,
    open: 0,
    preparation: 0,
    recruitment: 0,
    closed: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [liveAnnouncement, setLiveAnnouncement] = useState('');

  // 4. Modals and drawers state
  const [isNewAppOpen, setIsNewAppOpen] = useState(false);
  const [closeTargetApp, setCloseTargetApp] = useState<ApplicationRecord | null>(null);
  const [deleteTargetApp, setDeleteTargetApp] = useState<ApplicationRecord | null>(null);
  const [recruitmentTargetApp, setRecruitmentTargetApp] = useState<ApplicationRecord | null>(null);
  const [viewDetailsApp, setViewDetailsApp] = useState<ApplicationRecord | null>(null);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  // 5. Undo close state
  const [undoToast, setUndoToast] = useState<{
    undoEventId: string;
    appName: string;
    timer: number;
  } | null>(null);

  // Load applications
  const loadData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetchApplications({
        preset,
        search,
        preparationStage: prepStage,
        recruitmentStage: recStage,
        sortBy,
        page,
        pageSize,
      });

      setApplications(res.items);
      setTotalItems(res.total);
      setTotalPages(res.totalPages);
      setCounts(res.counts);
      setLiveAnnouncement(`נטענו ${res.total} משרות לפי הסינון הנוכחי`);
    } catch (err: any) {
      setError(err.message || 'שגיאה בטעינת נתוני המשרות');
    } finally {
      setIsLoading(false);
    }
  }, [preset, search, prepStage, recStage, sortBy, page, pageSize]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Reset filters
  const handleResetFilters = () => {
    setSearch('');
    setPrepStage('all');
    setRecStage('all');
    setSortBy('updatedAt');
    setPreset('all');
    setPage(1);
  };

  const hasActiveFilters =
    search !== '' || prepStage !== 'all' || recStage !== 'all' || preset !== 'all' || sortBy !== 'updatedAt';

  // Handle clearing next action
  const handleClearNextAction = async (appId: string) => {
    try {
      await clearNextAction(appId);
      setActionNotice('הפעולה המומלצת נוקתה בהצלחה');
      loadData();
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Handle executing next action / opening application
  const handleExecuteNextAction = (app: ApplicationRecord) => {
    setViewDetailsApp(app);
  };

  // Handle closing application
  const handleConfirmClose = async (reason: string, notes?: string) => {
    if (!closeTargetApp) return;
    try {
      const res = await closeApplication(closeTargetApp.id, {
        closeReason: reason,
        closeNotes: notes,
      });
      const closedName = closeTargetApp.companyName;
      setCloseTargetApp(null);
      loadData();

      if (res.undoEventId) {
        setUndoToast({
          undoEventId: res.undoEventId,
          appName: closedName,
          timer: 10,
        });
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Handle undo close
  const handleUndoClose = async () => {
    if (!undoToast) return;
    try {
      await undoCloseApplication(undoToast.undoEventId);
      setUndoToast(null);
      setActionNotice('סגירת המועמדות בוטלה בהצלחה');
      loadData();
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Auto-dismiss undo toast countdown
  useEffect(() => {
    if (!undoToast) return;
    const interval = setInterval(() => {
      setUndoToast((prev) => {
        if (!prev || prev.timer <= 1) return null;
        return { ...prev, timer: prev.timer - 1 };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [undoToast]);

  // Handle delete application
  const handleConfirmDelete = async () => {
    if (!deleteTargetApp) return;
    try {
      await deleteApplication(deleteTargetApp.id);
      setDeleteTargetApp(null);
      setActionNotice('המשרה נמחקה לצמיתות');
      loadData();
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Handle update recruitment details
  const handleSaveRecruitment = async (appId: string, payload: RecruitmentUpdatePayload) => {
    try {
      await updateRecruitmentDetails(appId, payload);
      setRecruitmentTargetApp(null);
      setActionNotice('פרטי הגיוס עודכנו בהצלחה');
      loadData();
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Handle create application
  const handleCreateApplication = async (data: {
    companyName: string;
    roleTitle: string;
    location?: string;
    jobUrl?: string;
    notes?: string;
  }) => {
    try {
      await createApplication(data);
      setIsNewAppOpen(false);
      setActionNotice('המשרה נוספה בהצלחה וניתוח ראשוני החל');
      loadData();
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Filter urgent attention items for the command center
  const attentionItems = applications.filter((a) => a.needsAttention && a.status === 'open');

  return (
    <div className="page-gutter page-frame py-section-gap space-y-section-gap">
      <LiveRegion message={liveAnnouncement} />

      {/* Action Notification Banner */}
      {actionNotice && (
        <div className="bg-cv-accent-soft border border-cv-accent text-cv-accent text-xs px-4 py-2.5 rounded-xl flex items-center justify-between shadow-2xs">
          <span>{actionNotice}</span>
          <button
            type="button"
            onClick={() => setActionNotice(null)}
            className="text-cv-accent hover:text-cv-accent-hover text-sm font-bold"
          >
            ✕
          </button>
        </div>
      )}

      {/* Floating Undo Toast */}
      {undoToast && (
        <div
          role="status"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-cv-brand-deep text-cv-on-accent px-5 py-3 rounded-2xl shadow-xl border border-cv-border flex items-center gap-4 text-xs sm:text-sm animate-bounce-subtle"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cv-success" />
            <span>המועמדות עבור {undoToast.appName} נסגרה.</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleUndoClose}
              className="px-3 py-1 bg-cv-accent hover:bg-cv-accent-hover font-bold rounded-lg text-cv-on-accent transition-colors"
            >
              בטל סגירה ({undoToast.timer} ש')
            </button>
            <button
              type="button"
              onClick={() => setUndoToast(null)}
              className="text-cv-text-muted hover:text-cv-on-accent"
              aria-label="סגור הודעה"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Header & Overview */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-cv-border/80">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-cv-text font-display">
            לוח משרות והתאמת קורות חיים
          </h1>
          <p className="text-xs sm:text-sm text-cv-text-muted mt-1">
            מעקב תהליכי גיוס, שלבי הכנת קורות חיים ופעולות מומלצות לקידום מועמדות
          </p>
        </div>

        {/* Action button & quick reset tools */}
        <div className="flex items-center gap-2 self-start md:self-center">
          <Button
            variant="primary"
            onClick={() => setIsNewAppOpen(true)}
            startIcon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            }
          >
            הוספת משרה חדשה
          </Button>

          {/* Seed/Reset DB menu for test/empty state demonstration */}
          <button
            type="button"
            onClick={() => {
              if (confirm('לאפס את הנתונים למצב הדגמה ראשוני?')) {
                resetDatabase(false);
                loadData();
              }
            }}
            title="איפוס נתוני הדגמה"
            className="p-2 rounded-lg border border-cv-border text-cv-text-muted hover:text-cv-text transition-colors text-xs"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>

      {/* 1. Attention & Urgent Action Center */}
      <ApplicationAttentionSummary
        attentionItems={attentionItems}
        onSelectApplication={(app) => setViewDetailsApp(app)}
        onFilterToAttention={() => {
          setPreset('attention');
          setPage(1);
        }}
        isFilterActive={preset === 'attention'}
        onDismissAction={(appId) => handleClearNextAction(appId)}
      />

      {/* 2. Preset Tabs */}
      <ApplicationPresetTabs
        activePreset={preset}
        onChange={(newPreset) => {
          setPreset(newPreset);
          setPage(1);
        }}
        counts={counts}
      />

      {/* 3. Toolbar & Filters */}
      <ApplicationListToolbar
        search={search}
        onSearchChange={(q) => {
          setSearch(q);
          setPage(1);
        }}
        preparationStage={prepStage}
        onPreparationStageChange={(st) => {
          setPrepStage(st);
          setPage(1);
        }}
        recruitmentStage={recStage}
        onRecruitmentStageChange={(st) => {
          setRecStage(st);
          setPage(1);
        }}
        sortBy={sortBy}
        onSortChange={(s) => setSortBy(s)}
        view={view}
        onViewChange={handleViewChange}
        onNewApplication={() => setIsNewAppOpen(true)}
        onResetFilters={handleResetFilters}
        hasActiveFilters={hasActiveFilters}
      />

      {/* 4. Content Area: Loading / Error / Empty / Views */}
      {error && <ErrorCallout error={error} onRetry={loadData} />}

      {isLoading ? (
        <div className="space-y-3">
          <Skeleton height={52} />
          <Skeleton height={68} />
          <Skeleton height={68} />
          <Skeleton height={68} />
        </div>
      ) : applications.length === 0 ? (
        <EmptyState
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          }
          title={hasActiveFilters ? 'לא נמצאו משרות התואמות את הסינון' : 'אין עדיין משרות בלוח'}
          description={
            hasActiveFilters
              ? 'נסה לשנות את מונחי החיפוש או לאפס את הסינונים כדי לצפות בכל המשרות.'
              : 'הוסף משרה חדשה כדי להתחיל לנתח דרישות ולהתאים קורות חיים בצורה מקצועית.'
          }
          action={
            hasActiveFilters ? (
              <Button variant="secondary" onClick={handleResetFilters}>
                נקה את כל הסינונים
              </Button>
            ) : (
              <Button variant="primary" onClick={() => setIsNewAppOpen(true)}>
                הוסף משרה ראשונה
              </Button>
            )
          }
        />
      ) : (
        <>
          {view === 'table' && (
            <ApplicationListTable
              applications={applications}
              onOpenApplication={(app) => setViewDetailsApp(app)}
              onExecuteNextAction={handleExecuteNextAction}
              onClearNextAction={handleClearNextAction}
              onUpdateRecruitment={(app) => setRecruitmentTargetApp(app)}
              onCloseApplication={(app) => setCloseTargetApp(app)}
              onDeleteApplication={(app) => setDeleteTargetApp(app)}
            />
          )}

          {view === 'cards' && (
            <ApplicationCardsView
              applications={applications}
              onOpenApplication={(app) => setViewDetailsApp(app)}
              onExecuteNextAction={handleExecuteNextAction}
              onClearNextAction={handleClearNextAction}
              onUpdateRecruitment={(app) => setRecruitmentTargetApp(app)}
              onCloseApplication={(app) => setCloseTargetApp(app)}
              onDeleteApplication={(app) => setDeleteTargetApp(app)}
            />
          )}

          {view === 'pipeline' && (
            <ApplicationPipelineView
              applications={applications}
              onOpenApplication={(app) => setViewDetailsApp(app)}
              onExecuteNextAction={handleExecuteNextAction}
              onUpdateRecruitment={(app) => setRecruitmentTargetApp(app)}
            />
          )}

          {/* 5. Pagination (for table and cards) */}
          {view !== 'pipeline' && (
            <ApplicationListPagination
              currentPage={page}
              totalPages={totalPages}
              totalItems={totalItems}
              pageSize={pageSize}
              onPageChange={(p) => setPage(p)}
              onPageSizeChange={(s) => {
                setPageSize(s);
                setPage(1);
              }}
            />
          )}
        </>
      )}

      {/* Dialogs */}
      <NewApplicationDialog
        isOpen={isNewAppOpen}
        onClose={() => setIsNewAppOpen(false)}
        onCreate={handleCreateApplication}
      />

      <CloseApplicationDialog
        application={closeTargetApp}
        isOpen={Boolean(closeTargetApp)}
        onClose={() => setCloseTargetApp(null)}
        onConfirm={handleConfirmClose}
      />

      <DeleteApplicationDialog
        application={deleteTargetApp}
        isOpen={Boolean(deleteTargetApp)}
        onClose={() => setDeleteTargetApp(null)}
        onConfirm={handleConfirmDelete}
      />

      <RecruitmentUpdateDialog
        application={recruitmentTargetApp}
        isOpen={Boolean(recruitmentTargetApp)}
        onClose={() => setRecruitmentTargetApp(null)}
        onSave={handleSaveRecruitment}
      />

      {/* Application Quick Detail / Workflow Dialog */}
      {viewDetailsApp && (
        <Dialog
          isOpen={Boolean(viewDetailsApp)}
          onClose={() => setViewDetailsApp(null)}
          title={`פרטי משרה: ${viewDetailsApp.companyName}`}
          description={viewDetailsApp.roleTitle}
          size="lg"
          footer={
            <div className="flex items-center justify-between w-full">
              <Button
                variant="outline"
                onClick={() => {
                  setRecruitmentTargetApp(viewDetailsApp);
                  setViewDetailsApp(null);
                }}
              >
                עדכון סטטוס גיוס
              </Button>
              <Button variant="primary" onClick={() => setViewDetailsApp(null)}>
                סגור
              </Button>
            </div>
          }
        >
          <div className="space-y-4 text-xs sm:text-sm">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-cv-surface-muted p-3.5 rounded-xl border border-cv-border">
              <div>
                <span className="text-cv-text-muted block text-[11px]">סטטוס משרה:</span>
                <span className="font-semibold">{viewDetailsApp.status === 'open' ? 'פתוחה' : 'סגורה'}</span>
              </div>
              <div>
                <span className="text-cv-text-muted block text-[11px]">שלב הכנת קו״ח:</span>
                <span className="font-semibold">{viewDetailsApp.preparationStage}</span>
              </div>
              <div>
                <span className="text-cv-text-muted block text-[11px]">שלב גיוס:</span>
                <span className="font-semibold">{viewDetailsApp.recruitmentStage}</span>
              </div>
              <div>
                <span className="text-cv-text-muted block text-[11px]">ציון התאמה:</span>
                <span className="font-bold text-cv-accent">{viewDetailsApp.matchScore || '—'}%</span>
              </div>
            </div>

            {viewDetailsApp.nextAction && (
              <div className="bg-cv-accent-soft border border-cv-accent/80 rounded-xl p-4">
                <span className="text-[11px] font-bold text-cv-accent block mb-1">
                  פעולה מומלצת הבאה
                </span>
                <h4 className="font-bold text-cv-text text-sm">
                  {viewDetailsApp.nextAction.title}
                </h4>
                {viewDetailsApp.nextAction.description && (
                  <p className="text-xs text-cv-text-muted mt-1">
                    {viewDetailsApp.nextAction.description}
                  </p>
                )}
              </div>
            )}

            {viewDetailsApp.tailoredCvVersion && (
              <div className="border border-cv-border rounded-xl p-3.5 flex items-center justify-between">
                <div>
                  <span className="text-cv-text-muted text-xs block">גרסת קורות חיים מקושרת:</span>
                  <span className="font-semibold">{viewDetailsApp.tailoredCvVersion}</span>
                </div>
                <Button size="sm" variant="secondary">
                  הורד קו״ח מותאמים
                </Button>
              </div>
            )}

            {viewDetailsApp.notes && (
              <div className="border border-cv-border rounded-xl p-3.5">
                <span className="text-cv-text-muted text-xs block mb-1">הערות:</span>
                <p className="text-cv-text leading-relaxed whitespace-pre-wrap">
                  {viewDetailsApp.notes}
                </p>
              </div>
            )}

            <div className="text-[11px] text-cv-text-muted pt-2 border-t border-cv-border">
              נוצר: {formatDateTimeHebrew(viewDetailsApp.createdAt)} · עודכן: {formatDateTimeHebrew(viewDetailsApp.updatedAt)}
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
};
