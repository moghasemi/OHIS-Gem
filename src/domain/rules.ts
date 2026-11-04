/**
 * Domain rules and logic for OHIS (Occupational Health Information System)
 * Pure, decoupled functions for clinical workflow, validations, calculations, and RBAC.
 */

export type WorkflowStatus =
  | 'RECEPTION'
  | 'LAB_PENDING'
  | 'LAB_COMPLETED'
  | 'PARACLINIC_PENDING'
  | 'PARACLINIC_COMPLETED'
  | 'HSE_PENDING'
  | 'HSE_COMPLETED'
  | 'DOCTOR_REVIEW'
  | 'AWAITING_REFERRAL'
  | 'COMPLETED_LOCKED';

export type UserRole =
  | 'reception'
  | 'lab'
  | 'para'
  | 'hse'
  | 'doctor'
  | 'org'
  | 'clinic_admin'
  | 'superadmin';

export type DoctorDecision = 'balamaneh' | 'mashroot' | 'adam_salahiyat';

export interface WorkflowContext {
  doctorOpinion?: DoctorDecision;
  hasUnresolvedReferrals?: boolean;
  isLocked?: boolean;
}

/**
 * Validates if a workflow state transition is legally and clinically allowed.
 * Rule: Final Opinion & Locking is strictly blocked if there are pending specialist referrals.
 */
export function canTransitionWorkflow(
  current: WorkflowStatus,
  target: WorkflowStatus,
  context: WorkflowContext
): { allowed: boolean; reason?: string } {
  if (context.isLocked && target !== 'COMPLETED_LOCKED') {
    return {
      allowed: false,
      reason: 'پرونده قفل شده است و تغییر وضعیت مستقیم بدون الحاقیه مجاز نیست.',
    };
  }

  if (target === 'COMPLETED_LOCKED') {
    if (!context.doctorOpinion) {
      return {
        allowed: false,
        reason: 'ثبت نظر نهایی پزشک (بلامانع، مشروط یا عدم صلاحیت) قبل از قفل پرونده الزامی است.',
      };
    }
    if (context.hasUnresolvedReferrals) {
      return {
        allowed: false,
        reason: 'در صورت وجود ارجاع تخصصی در انتظار، اعلام نظریه نهایی منوط به دریافت نتیجه ارجاع است.',
      };
    }
    return { allowed: true };
  }

  // Any non-locked transition is generally allowed forward in workflow
  return { allowed: true };
}

/**
 * Iranian 10-digit National ID checksum validation
 */
export function validateNationalId(code: string): boolean {
  const cleaned = code.trim();
  if (!/^\d{10}$/.test(cleaned)) return false;

  // Check repeating digits like '1111111111'
  if (/^(\d)\1{9}$/.test(cleaned)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleaned[i], 10) * (10 - i);
  }

  const remainder = sum % 11;
  const checkDigit = parseInt(cleaned[9], 10);

  if (remainder < 2) {
    return checkDigit === remainder;
  }
  return checkDigit === 11 - remainder;
}

/**
 * Calculate Body Mass Index (BMI) and Persian medical classification
 */
export function calculateBMI(weightKg: number, heightCm: number): {
  bmi: number;
  category: 'کمبود وزن' | 'طبیعی' | 'اضافه وزن' | 'چاقی';
} {
  if (weightKg <= 0 || heightCm <= 0) {
    return { bmi: 0, category: 'طبیعی' };
  }
  const heightM = heightCm / 100;
  const bmi = Math.round((weightKg / (heightM * heightM)) * 10) / 10;

  let category: 'کمبود وزن' | 'طبیعی' | 'اضافه وزن' | 'چاقی' = 'طبیعی';
  if (bmi < 18.5) category = 'کمبود وزن';
  else if (bmi < 25) category = 'طبیعی';
  else if (bmi < 30) category = 'اضافه وزن';
  else category = 'چاقی';

  return { bmi, category };
}

/**
 * Pure Tone Average (PTA) calculation for Occupational Audiometry (500, 1000, 2000, 3000, 4000 Hz)
 */
export function calculatePTA(frequencies: Record<number, number>): number {
  const relevantFreqs = [500, 1000, 2000, 3000, 4000];
  let sum = 0;
  let count = 0;
  for (const f of relevantFreqs) {
    if (typeof frequencies[f] === 'number') {
      sum += frequencies[f];
      count++;
    }
  }
  if (count === 0) return 0;
  return Math.round((sum / count) * 10) / 10;
}

/**
 * Check RBAC access for a given role against a system resource/tab
 */
export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  reception: ['dashboard', 'reception', 'self', 'profile', 'change-password', 'tickets', 'official-form'],
  lab: ['dashboard', 'lab', 'profile', 'change-password', 'tickets', 'official-form'],
  para: ['dashboard', 'para', 'profile', 'change-password', 'tickets', 'official-form'],
  hse: ['dashboard', 'hse', 'profile', 'change-password', 'tickets', 'official-form'],
  doctor: ['dashboard', 'doctor', 'templates', 'profile', 'change-password', 'tickets', 'official-form'],
  org: ['dashboard', 'org', 'self', 'patients', 'finance', 'services', 'profile', 'calendar', 'change-password', 'tickets', 'official-form'],
  clinic_admin: [
    'dashboard', 'reception', 'lab', 'para', 'hse', 'doctor', 'org', 'self',
    'patients', 'finance', 'profile', 'calendar', 'services', 'settings',
    'inventory', 'timeline', 'templates', 'documents', 'feedback', 'change-password',
    'tickets', 'role-matrix', 'official-form', 'backend-hub'
  ],
  superadmin: [
    'dashboard', 'reception', 'lab', 'para', 'hse', 'doctor', 'org', 'self',
    'patients', 'finance', 'profile', 'calendar', 'services', 'settings',
    'inventory', 'timeline', 'templates', 'documents', 'feedback', 'change-password',
    'superadmin', 'tickets', 'role-matrix', 'official-form', 'backend-hub'
  ],
};

export function hasPermission(role: UserRole, tabId: string): boolean {
  const allowed = ROLE_PERMISSIONS[role] || [];
  return allowed.includes(tabId);
}
