/**
 * Authoritative contracts for the CV Tailoring Application.
 */

export type ApplicationStatus = 'open' | 'closed';

export type PreparationStage =
  | 'intake'              // קליטת משרה
  | 'analysis'            // ניתוח דרישות
  | 'content_selection'   // בחירת עובדות
  | 'verification'        // אימות והתאמה
  | 'draft_ready'         // טיוטת קו״ח מוכנה
  | 'completed';          // הושלם

export type RecruitmentStage =
  | 'draft'         // טיוטה
  | 'applied'       // הוגשה מועמדות
  | 'screening'     // סינון טלפוני / HR
  | 'interviewing'  // ראיונות מקצועיים
  | 'offer'         // הצעת שכר
  | 'rejected'      // נדחה
  | 'withdrawn'     // הוסרה מועמדות
  | 'archived';     // בארכיון

export type ActionType =
  | 'resume_workflow'
  | 'review_draft'
  | 'update_recruitment'
  | 'interview_prep'
  | 'send_cv'
  | 'view_details'
  | 'custom';

export interface NextAction {
  id: string;
  title: string;
  description?: string;
  actionType: ActionType;
  targetRoute?: string;
  isDismissible?: boolean;
}

export type OperationType =
  | 'job_analysis'
  | 'draft_generation'
  | 'content_matching'
  | 'export_pdf'
  | 'none';

export type OperationState = 'idle' | 'running' | 'completed' | 'failed';

export interface OperationStatus {
  operationId?: string;
  type: OperationType;
  status: OperationState;
  progress?: number; // 0 - 100
  message?: string;
}

export interface ApplicationRecord {
  id: string;
  companyName: string;
  roleTitle: string;
  location?: string;
  jobUrl?: string;
  createdAt: string;
  updatedAt: string;
  status: ApplicationStatus;
  closedAt?: string;
  closeReason?: string;
  closeNotes?: string;
  preparationStage: PreparationStage;
  recruitmentStage: RecruitmentStage;
  needsAttention: boolean;
  attentionReason?: string;
  nextAction?: NextAction | null;
  activeOperation?: OperationStatus;
  salaryTarget?: string;
  contactPerson?: string;
  contactEmailOrPhone?: string;
  nextInterviewDate?: string;
  notes?: string;
  matchScore?: number;
  tailoredCvVersion?: string;
}

export interface ApplicationListFilterParams {
  search?: string;
  status?: 'all' | 'open' | 'closed';
  preset?: 'all' | 'attention' | 'open' | 'preparation' | 'recruitment' | 'closed';
  preparationStage?: PreparationStage | 'all';
  recruitmentStage?: RecruitmentStage | 'all';
  sortBy?: 'updatedAt' | 'createdAt' | 'companyName' | 'needsAttention';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  pageSize?: number;
}

export interface ApplicationPresetCounts {
  all: number;
  attention: number;
  open: number;
  preparation: number;
  recruitment: number;
  closed: number;
}

export interface ApplicationListResponse {
  items: ApplicationRecord[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  counts: ApplicationPresetCounts;
}

export interface RecruitmentUpdatePayload {
  recruitmentStage: RecruitmentStage;
  nextInterviewDate?: string;
  contactPerson?: string;
  contactEmailOrPhone?: string;
  salaryTarget?: string;
  notes?: string;
}

export interface CloseApplicationPayload {
  closeReason: string;
  closeNotes?: string;
}

export interface CloseApplicationResult {
  success: boolean;
  undoEventId?: string;
}
