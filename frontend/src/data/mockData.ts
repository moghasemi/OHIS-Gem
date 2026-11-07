import { Patient, Ticket, CompanyContract, ClinicStaff } from '../types/index.ts';

// Empty synthetic placeholder only. No plausible worker, staff or medical data.
export const INITIAL_PATIENTS: Patient[] = [{
  id: 'demo-empty-record', dossierNumber: '', nationalId: '', firstName: 'نمونه',
  lastName: 'آزمایشی', fatherName: '', birthYear: '', gender: 'مرد',
  maritalStatus: 'مجرد', childrenCount: 0, militaryStatus: 'غیرمشمول',
  phone: '', mobile: '', workAddress: '', homeAddress: '', companyName: '',
  jobTitle: '', duty: '', examinationType: 'دوره‌ای', examinationDate: '',
  status: 'RECEPTION', isLocked: false, jobHistories: [],
  hseHazards: { physical: [], chemical: [], biological: [], ergonomic: [], psychological: [],
    measurementNotes: '', expertOpinion: '', expertName: '', expertDate: '' },
  medicalHistory: {}, vitals: { heightCm: 0, weightKg: 0, bpSystolic: 0, bpDiastolic: 0, pulseRate: 0 },
  systemExams: {},
  labResults: { date: '', cbc: { wbc: '', rbc: '', hb: '', hct: '', plt: '' },
    ua: { prot: '', glu: '', rbc: '', wbc: '', bact: '' },
    biochemistry: { fbs: '', chol: '', ldl: '', hdl: '', tg: '', bun: '', cr: '', alt: '', ast: '', alkPh: '', psa: '', hbsAg: '', seOb: '', ppd: '' },
    specialTests: [] },
  paraclinic: {
    optometry: { date: '', vaRightNoCorr: '', vaLeftNoCorr: '', vaRightWithCorr: '', vaLeftWithCorr: '', colorVisionRight: 'غیرطبیعی', colorVisionLeft: 'غیرطبیعی', visualFieldRight: '', visualFieldLeft: '', depthArcSeconds: '' },
    audiometry: { date: '', rightAC: {}, rightBC: {}, leftAC: {}, leftBC: {}, srtRight: 0, sdsRight: '', srtLeft: 0, sdsLeft: '', interpretationRight: '', interpretationLeft: '' },
    spirometry: { date: '', fev1: '', fvc: '', fev1FvcRatio: '', fef2575: '', pef: '', vext: '', interpretation: '' },
    other: { cxrFindings: '', cxrDate: '', ecgFindings: '', ecgDate: '', ultrasoundFindings: '', otherRadiology: '' },
  },
  referrals: [], packageName: '', packagePrice: 0, paymentStatus: 'PENDING',
}];
export const CONTRACTS_DATA: CompanyContract[] = [];
export const TICKETS_DATA: Ticket[] = [];
export const INITIAL_STAFF_DATA: ClinicStaff[] = [];
