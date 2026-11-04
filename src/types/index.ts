import { UserRole, WorkflowStatus, DoctorDecision } from '../domain/rules.ts';

export interface Patient {
  id: string;
  dossierNumber: string;
  nationalId: string;
  firstName: string;
  lastName: string;
  fatherName: string;
  birthYear: string;
  gender: 'مرد' | 'زن';
  maritalStatus: 'متاهل' | 'مجرد';
  childrenCount: number;
  militaryStatus: 'خدمت کرده' | 'معافیت پزشکی' | 'غیرمشمول';
  militaryBranch?: string;
  exemptionReason?: string;
  phone: string;
  mobile: string;
  workAddress: string;
  homeAddress: string;
  companyName: string;
  jobTitle: string;
  duty: string;
  examinationType: 'بدواستخدام' | 'دوره‌ای' | 'موردی';
  examinationDate: string;
  status: WorkflowStatus;
  isLocked: boolean;
  photoUrl?: string;

  // Job History (Table 2)
  jobHistories: {
    title: string;
    duty: string;
    startDate: string;
    endDate: string;
    changeReason: string;
    isCurrent: boolean;
  }[];

  // HSE Hazards (Table 3)
  hseHazards: {
    physical: string[];
    chemical: string[];
    biological: string[];
    ergonomic: string[];
    psychological: string[];
    measurementNotes: string;
    expertOpinion: string;
    expertName: string;
    expertDate: string;
  };

  // Past Medical History 16 Questions (Table 4)
  medicalHistory: Record<number, { answer: 'بلی' | 'خیر'; details: string }>;
  smokingDetails?: { currentDaily: number; currentYears: number; pastDaily: number; pastYears: number };
  occupationalInjury?: { injuryType: string; cause: string };

  // Physical Exams & Vitals (Table 5)
  vitals: {
    heightCm: number;
    weightKg: number;
    bpSystolic: number;
    bpDiastolic: number;
    pulseRate: number;
  };

  systemExams: Record<string, {
    symptoms: string[];
    signs: string[];
    otherSymptoms?: string;
    otherSigns?: string;
    notes?: string;
    noSymptoms: boolean;
    noSigns: boolean;
  }>;

  // Laboratory (Table 6)
  labResults: {
    date: string;
    cbc: { wbc: string; rbc: string; hb: string; hct: string; plt: string };
    ua: { prot: string; glu: string; rbc: string; wbc: string; bact: string };
    biochemistry: {
      fbs: string;
      chol: string;
      ldl: string;
      hdl: string;
      tg: string;
      bun: string;
      cr: string;
      alt: string;
      ast: string;
      alkPh: string;
      psa: string;
      hbsAg: string;
      seOb: string;
      ppd: string;
    };
    specialTests: { name: string; result: string; date: string }[];
  };

  // Paraclinic (Table 7)
  paraclinic: {
    optometry: {
      date: string;
      vaRightNoCorr: string;
      vaLeftNoCorr: string;
      vaRightWithCorr: string;
      vaLeftWithCorr: string;
      colorVisionRight: 'طبیعی' | 'غیرطبیعی';
      colorVisionLeft: 'طبیعی' | 'غیرطبیعی';
      visualFieldRight: string;
      visualFieldLeft: string;
      depthArcSeconds: string;
    };
    audiometry: {
      date: string;
      rightAC: Record<number, number>;
      rightBC: Record<number, number>;
      leftAC: Record<number, number>;
      leftBC: Record<number, number>;
      srtRight: number;
      sdsRight: string;
      srtLeft: number;
      sdsLeft: string;
      interpretationRight: string;
      interpretationLeft: string;
    };
    spirometry: {
      date: string;
      fev1: string;
      fvc: string;
      fev1FvcRatio: string;
      fef2575: string;
      pef: string;
      vext: string;
      interpretation: string;
    };
    other: {
      cxrFindings: string;
      cxrDate: string;
      ecgFindings: string;
      ecgDate: string;
      ultrasoundFindings: string;
      otherRadiology: string;
    };
  };

  // Referrals (Table 8)
  referrals: {
    id: string;
    specialty: string;
    reason: string;
    date: string;
    result: string;
    status: 'PENDING' | 'RESOLVED';
  }[];

  // Final Physician Opinion (Table 9)
  doctorDecision?: {
    opinion: DoctorDecision;
    conditions?: string;
    unfitReasons?: string;
    recommendations: string;
    doctorName: string;
    medicalCode: string;
    date: string;
    signed: boolean;
  };

  // Financial Package
  packageName: string;
  packagePrice: number;
  paymentStatus: 'PAID' | 'PENDING' | 'CORPORATE_INVOICE';
  transactionCode?: string;
}

export interface Ticket {
  id: string;
  ticketNumber: string;
  title: string;
  sender: string;
  date: string;
  priority: 'بالا' | 'متوسط' | 'پایین';
  status: 'باز' | 'در حال بررسی' | 'بسته شده';
  category: string;
  description: string;
}

export interface CompanyContract {
  id: string;
  code: string;
  companyName: string;
  startDate: string;
  endDate: string;
  status: 'فعال' | 'منقضی' | 'در حال بررسی';
  employeeCount: number;
  completedCount: number;
  packageType: string;
  totalAmount: number;
}

export interface ClinicStaff {
  id: string;
  personnelCode: string;
  firstName: string;
  lastName: string;
  nationalId: string;
  mobile: string;
  role: UserRole;
  roleTitle: string;
  department: string;
  medicalCouncilNumber?: string;
  hseLicenseNumber?: string;
  stampNumber?: string;
  shift: 'صبح' | 'عصر' | 'تمام‌وقت';
  status: 'ACTIVE' | 'LEAVE' | 'SUSPENDED';
  hireDate: string;
  email: string;
  lastLogin?: string;
}

