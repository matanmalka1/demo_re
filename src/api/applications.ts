import {
  ApplicationRecord,
  ApplicationListFilterParams,
  ApplicationListResponse,
  ApplicationPresetCounts,
  RecruitmentUpdatePayload,
  CloseApplicationPayload,
  CloseApplicationResult,
} from './contracts';

const STORAGE_KEY = 'cv_tailor_applications_v1';
const UNDO_STORE_KEY = 'cv_tailor_undo_store_v1';

// Initial rich seed data with realistic applications
const INITIAL_APPLICATIONS: ApplicationRecord[] = [
  {
    id: 'app-wiz-01',
    companyName: 'Wiz',
    roleTitle: 'Senior Full Stack Engineer',
    location: 'תל אביב (היברידי)',
    jobUrl: 'https://wiz.io/careers/fullstack',
    createdAt: '2026-09-18T09:30:00Z',
    updatedAt: '2026-09-22T14:15:00Z',
    status: 'open',
    preparationStage: 'draft_ready',
    recruitmentStage: 'interviewing',
    needsAttention: true,
    attentionReason: 'ראיון מקצועי נקבע למחר ב-14:00 (דורש חזרה על System Design)',
    nextInterviewDate: '2026-09-24T14:00:00',
    matchScore: 94,
    tailoredCvVersion: 'גרסה 3.1 - מותאם אבטחת ענן',
    contactPerson: 'מאיה לוי (HR)',
    contactEmailOrPhone: 'maya.l@wiz.io',
    salaryTarget: '45,000 - 48,000 ₪',
    notes: 'ראיון טלפוני עבר בהצלחה. לשים דגש על שירותי AWS ו-React Server Components.',
    nextAction: {
      id: 'act-wiz-1',
      title: 'הכנה לראיון טכני מחר',
      description: 'סקירת פרויקט ה-Microservices בקורות החיים והתאמת דוגמאות',
      actionType: 'interview_prep',
      isDismissible: true,
    },
    activeOperation: {
      type: 'none',
      status: 'idle',
    },
  },
  {
    id: 'app-monday-02',
    companyName: 'monday.com',
    roleTitle: 'Product Engineer - Platform',
    location: 'תל אביב',
    jobUrl: 'https://monday.com/careers',
    createdAt: '2026-09-15T11:00:00Z',
    updatedAt: '2026-09-21T18:00:00Z',
    status: 'open',
    preparationStage: 'verification',
    recruitmentStage: 'applied',
    needsAttention: true,
    attentionReason: 'טיוטת קורות החיים עברה ניתוח, דרוש אישור התאמות אחרון',
    matchScore: 88,
    tailoredCvVersion: 'גרסה 2.0',
    contactPerson: 'דניאל כהן',
    salaryTarget: '42,000 ₪',
    notes: 'הגשה דרך חבר מביא חבר (גיא מהאוניברסיטה).',
    nextAction: {
      id: 'act-monday-1',
      title: 'אישור טיוטת קורות חיים',
      description: 'בדיקת 3 עובדות נבחרות ואישור לפני עדכון',
      actionType: 'review_draft',
      isDismissible: true,
    },
    activeOperation: {
      type: 'content_matching',
      status: 'completed',
      progress: 100,
      message: 'התאמת תוכן הסתיימה בהצלחה',
    },
  },
  {
    id: 'app-appsflyer-03',
    companyName: 'AppsFlyer',
    roleTitle: 'Backend Tech Lead',
    location: 'הרצליה פיתוח',
    jobUrl: 'https://appsflyer.com/careers',
    createdAt: '2026-09-20T08:00:00Z',
    updatedAt: '2026-09-22T16:45:00Z',
    status: 'open',
    preparationStage: 'analysis',
    recruitmentStage: 'draft',
    needsAttention: false,
    matchScore: 91,
    activeOperation: {
      type: 'job_analysis',
      status: 'running',
      progress: 68,
      message: 'מנתח דרישות משרה וחלוקה לקטגוריות טכנולוגיות...',
    },
    nextAction: {
      id: 'act-af-1',
      title: 'המתן לסיום ניתוח המשרה',
      description: 'אלגוריתם הניתוח מעבד את דרישות המשרה',
      actionType: 'resume_workflow',
      isDismissible: false,
    },
  },
  {
    id: 'app-lemonade-04',
    companyName: 'Lemonade',
    roleTitle: 'Senior Frontend Developer',
    location: 'תל אביב',
    jobUrl: 'https://lemonade.com/jobs',
    createdAt: '2026-09-10T12:00:00Z',
    updatedAt: '2026-09-22T10:30:00Z',
    status: 'open',
    preparationStage: 'completed',
    recruitmentStage: 'offer',
    needsAttention: true,
    attentionReason: 'התקבלה הצעת שכר! נדרשת בחינה והחלטה עד יום חמישי',
    salaryTarget: '46,000 ₪ + ESOP',
    matchScore: 96,
    tailoredCvVersion: 'גרסה סופית - נשלח',
    contactPerson: 'שירה רוט (VP R&D)',
    contactEmailOrPhone: 'shira@lemonade.com',
    notes: 'התרשמו במיוחד מפתרון ה-UI למערכת התביעות. חוזה נשלח למייל.',
    nextAction: {
      id: 'act-lemonade-1',
      title: 'בחינת הצעת השכר ושיחת מו״מ',
      description: 'בדיקת תנאי האופציות וקרן ההשתלמות',
      actionType: 'update_recruitment',
      isDismissible: false,
    },
  },
  {
    id: 'app-checkpoint-05',
    companyName: 'Check Point',
    roleTitle: 'Security Software Architect',
    location: 'תל אביב',
    jobUrl: 'https://checkpoint.com/careers',
    createdAt: '2026-09-05T14:20:00Z',
    updatedAt: '2026-09-19T11:00:00Z',
    status: 'open',
    preparationStage: 'content_selection',
    recruitmentStage: 'applied',
    needsAttention: false,
    matchScore: 84,
    tailoredCvVersion: 'גרסה 1.2',
    notes: 'הוגש ישירות באתר החברה.',
    nextAction: {
      id: 'act-cp-1',
      title: 'המשך בחירת עובדות לקו״ח',
      description: 'הוספת שתי עובדות רלוונטיות מתחום הרשתות',
      actionType: 'resume_workflow',
      isDismissible: true,
    },
  },
  {
    id: 'app-cybereason-06',
    companyName: 'Cybereason',
    roleTitle: 'Core Platform Engineer',
    location: 'תל אביב',
    jobUrl: 'https://cybereason.com/jobs',
    createdAt: '2026-08-25T10:00:00Z',
    updatedAt: '2026-09-12T09:00:00Z',
    status: 'closed',
    closedAt: '2026-09-12T09:00:00Z',
    closeReason: 'התקבלה הודעת דחייה לאחר ראיון טכני',
    closeNotes: 'ביקשו ניסיון מעמיק יותר ב-C++ kernel-level.',
    preparationStage: 'completed',
    recruitmentStage: 'rejected',
    needsAttention: false,
    matchScore: 78,
  },
  {
    id: 'app-mobileye-07',
    companyName: 'Mobileye',
    roleTitle: 'Infrastructure Team Lead',
    location: 'ירושלים (היברידי)',
    jobUrl: 'https://mobileye.com/careers',
    createdAt: '2026-09-02T13:00:00Z',
    updatedAt: '2026-09-15T15:30:00Z',
    status: 'closed',
    closedAt: '2026-09-15T15:30:00Z',
    closeReason: 'הוסרה מועמדות על ידי המועמד',
    closeNotes: 'דרישה להגעה יומיומית לירושלים לא התאימה.',
    preparationStage: 'draft_ready',
    recruitmentStage: 'withdrawn',
    needsAttention: false,
    matchScore: 89,
  },
];

interface UndoRecord {
  undoEventId: string;
  applicationId: string;
  previousStatus: 'open' | 'closed';
  previousRecruitmentStage: any;
  timestamp: string;
}

// Helper to get all applications from localStorage or seed
function loadStoredApplications(): ApplicationRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_APPLICATIONS));
      return INITIAL_APPLICATIONS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to load applications from localStorage:', err);
    return INITIAL_APPLICATIONS;
  }
}

function saveApplications(apps: ApplicationRecord[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(apps));
  } catch (err) {
    console.error('Failed to save applications to localStorage:', err);
  }
}

function loadUndoStore(): Record<string, UndoRecord> {
  try {
    const raw = localStorage.getItem(UNDO_STORE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveUndoRecord(undoEventId: string, record: UndoRecord): void {
  try {
    const store = loadUndoStore();
    store[undoEventId] = record;
    localStorage.setItem(UNDO_STORE_KEY, JSON.stringify(store));
  } catch (err) {
    console.error('Failed to save undo record:', err);
  }
}

/**
 * Fetch applications with full filtering, preset tabs counts, sorting and pagination
 */
export async function fetchApplications(
  params: ApplicationListFilterParams = {}
): Promise<ApplicationListResponse> {
  // Simulate natural brief async transition (60ms) for UI responsiveness
  await new Promise((r) => setTimeout(r, 60));

  let apps = loadStoredApplications();

  // Compute preset counts on unfiltered total pool
  const counts: ApplicationPresetCounts = {
    all: apps.length,
    attention: apps.filter((a) => a.needsAttention && a.status === 'open').length,
    open: apps.filter((a) => a.status === 'open').length,
    preparation: apps.filter(
      (a) => a.status === 'open' && a.preparationStage !== 'completed'
    ).length,
    recruitment: apps.filter(
      (a) =>
        a.status === 'open' &&
        ['applied', 'screening', 'interviewing', 'offer'].includes(a.recruitmentStage)
    ).length,
    closed: apps.filter((a) => a.status === 'closed').length,
  };

  // 1. Preset filter
  const preset = params.preset || 'all';
  if (preset === 'attention') {
    apps = apps.filter((a) => a.needsAttention && a.status === 'open');
  } else if (preset === 'open') {
    apps = apps.filter((a) => a.status === 'open');
  } else if (preset === 'preparation') {
    apps = apps.filter((a) => a.status === 'open' && a.preparationStage !== 'completed');
  } else if (preset === 'recruitment') {
    apps = apps.filter(
      (a) =>
        a.status === 'open' &&
        ['applied', 'screening', 'interviewing', 'offer'].includes(a.recruitmentStage)
    );
  } else if (preset === 'closed') {
    apps = apps.filter((a) => a.status === 'closed');
  }

  // 2. Status filter
  if (params.status && params.status !== 'all') {
    apps = apps.filter((a) => a.status === params.status);
  }

  // 3. Search query
  if (params.search && params.search.trim()) {
    const query = params.search.trim().toLowerCase();
    apps = apps.filter(
      (a) =>
        a.companyName.toLowerCase().includes(query) ||
        a.roleTitle.toLowerCase().includes(query) ||
        (a.location && a.location.toLowerCase().includes(query)) ||
        (a.notes && a.notes.toLowerCase().includes(query)) ||
        (a.attentionReason && a.attentionReason.toLowerCase().includes(query))
    );
  }

  // 4. Preparation stage filter
  if (params.preparationStage && params.preparationStage !== 'all') {
    apps = apps.filter((a) => a.preparationStage === params.preparationStage);
  }

  // 5. Recruitment stage filter
  if (params.recruitmentStage && params.recruitmentStage !== 'all') {
    apps = apps.filter((a) => a.recruitmentStage === params.recruitmentStage);
  }

  // 6. Sorting
  const sortBy = params.sortBy || 'updatedAt';
  const sortOrder = params.sortOrder || 'desc';

  apps.sort((a, b) => {
    let comparison = 0;
    if (sortBy === 'needsAttention') {
      comparison = (a.needsAttention === b.needsAttention ? 0 : a.needsAttention ? -1 : 1);
    } else if (sortBy === 'companyName') {
      comparison = a.companyName.localeCompare(b.companyName, 'he');
    } else if (sortBy === 'createdAt') {
      comparison = new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else {
      // updatedAt default
      comparison = new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    }
    return sortOrder === 'desc' ? comparison : -comparison;
  });

  const total = apps.length;
  const page = Math.max(1, params.page || 1);
  const pageSize = params.pageSize || 10;
  const totalPages = Math.ceil(total / pageSize) || 1;

  const startIndex = (page - 1) * pageSize;
  const items = apps.slice(startIndex, startIndex + pageSize);

  return {
    items,
    total,
    page,
    pageSize,
    totalPages,
    counts,
  };
}

/**
 * Clear next action on an application
 */
export async function clearNextAction(applicationId: string): Promise<ApplicationRecord> {
  const apps = loadStoredApplications();
  const index = apps.findIndex((a) => a.id === applicationId);
  if (index === -1) throw new Error('משרה לא נמצאה');

  apps[index] = {
    ...apps[index],
    nextAction: null,
    updatedAt: new Date().toISOString(),
  };

  saveApplications(apps);
  return apps[index];
}

/**
 * Update recruitment details
 */
export async function updateRecruitmentDetails(
  applicationId: string,
  payload: RecruitmentUpdatePayload
): Promise<ApplicationRecord> {
  const apps = loadStoredApplications();
  const index = apps.findIndex((a) => a.id === applicationId);
  if (index === -1) throw new Error('משרה לא נמצאה');

  apps[index] = {
    ...apps[index],
    recruitmentStage: payload.recruitmentStage,
    nextInterviewDate: payload.nextInterviewDate ?? apps[index].nextInterviewDate,
    contactPerson: payload.contactPerson ?? apps[index].contactPerson,
    contactEmailOrPhone: payload.contactEmailOrPhone ?? apps[index].contactEmailOrPhone,
    salaryTarget: payload.salaryTarget ?? apps[index].salaryTarget,
    notes: payload.notes ?? apps[index].notes,
    updatedAt: new Date().toISOString(),
  };

  saveApplications(apps);
  return apps[index];
}

/**
 * Close an application with reason, returns undoEventId
 */
export async function closeApplication(
  applicationId: string,
  payload: CloseApplicationPayload
): Promise<CloseApplicationResult> {
  const apps = loadStoredApplications();
  const index = apps.findIndex((a) => a.id === applicationId);
  if (index === -1) throw new Error('משרה לא נמצאה');

  const prev = apps[index];
  const undoEventId = `undo-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

  // Store undo record
  saveUndoRecord(undoEventId, {
    undoEventId,
    applicationId,
    previousStatus: prev.status,
    previousRecruitmentStage: prev.recruitmentStage,
    timestamp: new Date().toISOString(),
  });

  apps[index] = {
    ...prev,
    status: 'closed',
    closedAt: new Date().toISOString(),
    closeReason: payload.closeReason,
    closeNotes: payload.closeNotes,
    needsAttention: false,
    updatedAt: new Date().toISOString(),
  };

  saveApplications(apps);
  return { success: true, undoEventId };
}

/**
 * Undo close application using undoEventId
 */
export async function undoCloseApplication(undoEventId: string): Promise<ApplicationRecord> {
  const undoStore = loadUndoStore();
  const record = undoStore[undoEventId];
  if (!record) throw new Error('אירוע הביטול פג תוקף או אינו קיים');

  const apps = loadStoredApplications();
  const index = apps.findIndex((a) => a.id === record.applicationId);
  if (index === -1) throw new Error('משרה לא נמצאה');

  apps[index] = {
    ...apps[index],
    status: record.previousStatus,
    recruitmentStage: record.previousRecruitmentStage,
    closedAt: undefined,
    closeReason: undefined,
    closeNotes: undefined,
    updatedAt: new Date().toISOString(),
  };

  delete undoStore[undoEventId];
  try {
    localStorage.setItem(UNDO_STORE_KEY, JSON.stringify(undoStore));
  } catch {}

  saveApplications(apps);
  return apps[index];
}

/**
 * Delete an application with confirmation
 */
export async function deleteApplication(applicationId: string): Promise<boolean> {
  let apps = loadStoredApplications();
  const countBefore = apps.length;
  apps = apps.filter((a) => a.id !== applicationId);
  if (apps.length === countBefore) throw new Error('משרה לא נמצאה למחיקה');

  saveApplications(apps);
  return true;
}

/**
 * Create a new application
 */
export async function createApplication(data: {
  companyName: string;
  roleTitle: string;
  location?: string;
  jobUrl?: string;
  notes?: string;
}): Promise<ApplicationRecord> {
  const apps = loadStoredApplications();
  const newApp: ApplicationRecord = {
    id: `app-${Date.now()}`,
    companyName: data.companyName,
    roleTitle: data.roleTitle,
    location: data.location || 'מרכז / היברידי',
    jobUrl: data.jobUrl,
    notes: data.notes,
    status: 'open',
    preparationStage: 'intake',
    recruitmentStage: 'draft',
    needsAttention: true,
    attentionReason: 'משרה חדשה נקלטה - דרוש ניתוח דרישות ראשוני',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    nextAction: {
      id: `act-${Date.now()}`,
      title: 'התחל ניתוח דרישות משרה',
      description: 'חילוץ מיומנויות, תחומי אחריות ודרישות חובה',
      actionType: 'resume_workflow',
      isDismissible: false,
    },
    activeOperation: {
      type: 'none',
      status: 'idle',
    },
  };

  apps.unshift(newApp);
  saveApplications(apps);
  return newApp;
}

/**
 * Reset database to initial seed data (for testing / empty state demonstration)
 */
export function resetDatabase(clearAll = false): void {
  if (clearAll) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
  } else {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_APPLICATIONS));
  }
}
