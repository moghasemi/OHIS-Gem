import React, { useState } from 'react';
import { Patient } from '../types/index.ts';
import {
  User,
  CreditCard,
  Camera,
  Briefcase,
  ClipboardList,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Smartphone,
  Printer,
  Shield,
  FileCheck,
} from 'lucide-react';

interface Props {
  patients: Patient[];
  onAddPatient: (newPatient: Patient) => void;
  onSelectPatient: (patient: Patient) => void;
}

export const ReceptionView: React.FC<Props> = ({ patients, onAddPatient, onSelectPatient }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [nationalId, setNationalId] = useState('0029871234');
  const [firstName, setFirstName] = useState('علیرضا');
  const [lastName, setLastName] = useState('مرادی');
  const [fatherName, setFatherName] = useState('محمد');
  const [birthYear, setBirthYear] = useState('۱۳۷۴');
  const [gender, setGender] = useState<'مرد' | 'زن'>('مرد');
  const [maritalStatus, setMaritalStatus] = useState<'متاهل' | 'مجرد'>('متاهل');
  const [childrenCount, setChildrenCount] = useState(1);
  const [militaryStatus, setMilitaryStatus] = useState<'خدمت کرده' | 'معافیت پزشکی' | 'غیرمشمول'>('خدمت کرده');
  const [militaryBranch, setMilitaryBranch] = useState('پدافند هوایی');
  const [mobile, setMobile] = useState('09121112233');
  const [workAddress, setWorkAddress] = useState('تهران، جاده مخصوص، صنایع خودرو');
  const [homeAddress, setHomeAddress] = useState('تهران، میدان ونک، خیابان گاندی، کوچه هشتم');
  const [companyName, setCompanyName] = useState('صنایع فلزی البرز');
  const [jobTitle, setJobTitle] = useState('مونتاژکار قطعات صنعتی');
  const [duty, setDuty] = useState('مونتاژ مکانیکی و سنگ‌زنی قطعات');
  const [examinationType, setExaminationType] = useState<'بدواستخدام' | 'دوره‌ای' | 'موردی'>('دوره‌ای');

  // Package & Payment
  const [selectedPackage, setSelectedPackage] = useState('پکیج کامل صنعتی و سلامت شغلی');
  const [packagePrice, setPackagePrice] = useState(3850000);
  const [posStatus, setPosStatus] = useState<'IDLE' | 'PROCESSING' | 'PAID'>('IDLE');
  const [transactionCode, setTransactionCode] = useState('');

  // 16 Medical Questions
  const [medicalAnswers, setMedicalAnswers] = useState<Record<number, { answer: 'بلی' | 'خیر'; details: string }>>({
    1: { answer: 'خیر', details: '' },
    2: { answer: 'خیر', details: '' },
    3: { answer: 'خیر', details: '' },
    4: { answer: 'خیر', details: '' },
    5: { answer: 'خیر', details: '' },
    6: { answer: 'خیر', details: '' },
    7: { answer: 'خیر', details: '' },
    8: { answer: 'خیر', details: '' },
    9: { answer: 'خیر', details: '' },
    10: { answer: 'خیر', details: '' },
    11: { answer: 'خیر', details: '' },
    12: { answer: 'بلی', details: 'ورزش فوتسال هفتگی' },
    13: { answer: 'خیر', details: '' },
    14: { answer: 'خیر', details: '' },
    15: { answer: 'خیر', details: '' },
    16: { answer: 'خیر', details: '' },
  });

  // SMS Verification
  const [otpCode, setOtpCode] = useState('');
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [completedDossierNumber, setCompletedDossierNumber] = useState('');

  const simulatePosPayment = () => {
    setPosStatus('PROCESSING');
    setTimeout(() => {
      const code = 'POS-' + Math.floor(100000 + Math.random() * 900000);
      setTransactionCode(code);
      setPosStatus('PAID');
    }, 1200);
  };

  const handleVerifyOtp = () => {
    if (otpCode.length >= 4) {
      setIsOtpVerified(true);
      const newDossier = 'OHIS-1405-' + Math.floor(1000 + Math.random() * 9000).toString(16).toUpperCase();
      setCompletedDossierNumber(newDossier);

      // Create new patient record
      const newPatient: Patient = {
        id: 'pat-' + Date.now(),
        dossierNumber: newDossier,
        nationalId,
        firstName,
        lastName,
        fatherName,
        birthYear,
        gender,
        maritalStatus,
        childrenCount,
        militaryStatus,
        militaryBranch,
        phone: '02166554433',
        mobile,
        workAddress,
        homeAddress,
        companyName,
        jobTitle,
        duty,
        examinationType,
        examinationDate: '۱۴۰۵/۰۴/۰۲',
        status: 'LAB_PENDING',
        isLocked: false,
        jobHistories: [
          {
            title: jobTitle,
            duty,
            startDate: '۱۴۰۱/۰۱/۱۵',
            endDate: 'اکنون',
            changeReason: 'شغل فعلی',
            isCurrent: true,
          },
        ],
        hseHazards: {
          physical: ['سر و صدا', 'ارتعاش'],
          chemical: ['گردوغبار'],
          biological: [],
          ergonomic: ['ایستادن طولانی مدت', 'کار تکراری'],
          psychological: ['استرسورهای شغلی'],
          measurementNotes: 'اندازه‌گیری صدا در محدوده ۸۴ dBA.',
          expertOpinion: 'گوشی حفاظتی و کفش ارگونومیک الزامی است.',
          expertName: 'مهندس وحید کاظمی',
          expertDate: '۱۴۰۵/۰۴/۰۲',
        },
        medicalHistory: medicalAnswers,
        vitals: {
          heightCm: 176,
          weightKg: 77,
          bpSystolic: 120,
          bpDiastolic: 80,
          pulseRate: 72,
        },
        systemExams: {},
        labResults: {
          date: '۱۴۰۵/۰۴/۰۲',
          cbc: { wbc: '7.1', rbc: '4.8', hb: '14.5', hct: '42', plt: '235' },
          ua: { prot: 'Neg', glu: 'Neg', rbc: '0-1', wbc: '0-1', bact: 'Neg' },
          biochemistry: {
            fbs: '91',
            chol: '180',
            ldl: '110',
            hdl: '48',
            tg: '130',
            bun: '14',
            cr: '1.0',
            alt: '22',
            ast: '24',
            alkPh: '150',
            psa: '0.8',
            hbsAg: 'Negative',
            seOb: 'Negative',
            ppd: 'Neg',
          },
          specialTests: [],
        },
        paraclinic: {
          optometry: {
            date: '۱۴۰۵/۰۴/۰۲',
            vaRightNoCorr: '10/10',
            vaLeftNoCorr: '10/10',
            vaRightWithCorr: '10/10',
            vaLeftWithCorr: '10/10',
            colorVisionRight: 'طبیعی',
            colorVisionLeft: 'طبیعی',
            visualFieldRight: 'طبیعی',
            visualFieldLeft: 'طبیعی',
            depthArcSeconds: '30',
          },
          audiometry: {
            date: '',
            rightAC: { 500: 15, 1000: 15, 2000: 15, 3000: 20, 4000: 25, 6000: 20, 8000: 20 },
            rightBC: { 500: 15, 1000: 15, 2000: 15, 3000: 20, 4000: 25, 6000: 20, 8000: 20 },
            leftAC: { 500: 15, 1000: 15, 2000: 15, 3000: 20, 4000: 25, 6000: 20, 8000: 20 },
            leftBC: { 500: 15, 1000: 15, 2000: 15, 3000: 20, 4000: 25, 6000: 20, 8000: 20 },
            srtRight: 15,
            sdsRight: '98%',
            srtLeft: 15,
            sdsLeft: '98%',
            interpretationRight: 'طبیعی',
            interpretationLeft: 'طبیعی',
          },
          spirometry: {
            date: '',
            fev1: '3.4 L',
            fvc: '4.2 L',
            fev1FvcRatio: '81%',
            fef2575: '3.5 L/s',
            pef: '540 L/min',
            vext: '0.06 L',
            interpretation: 'نرمال',
          },
          other: {
            cxrFindings: 'نرمال',
            cxrDate: '۱۴۰۵/۰۴/۰۲',
            ecgFindings: 'نرمال',
            ecgDate: '۱۴۰۵/۰۴/۰۲',
            ultrasoundFindings: '',
            otherRadiology: '',
          },
        },
        referrals: [],
        packageName: selectedPackage,
        packagePrice,
        paymentStatus: 'PAID',
        transactionCode,
      };

      onAddPatient(newPatient);
      onSelectPatient(newPatient);
    }
  };

  const STEPS = [
    { num: 1, label: 'مشخصات فردی (جدول ۱)', icon: User },
    { num: 2, label: 'پکیج خدمات', icon: ClipboardList },
    { num: 3, label: 'پرداخت و پوز', icon: CreditCard },
    { num: 4, label: 'عکس وب‌کم', icon: Camera },
    { num: 5, label: 'سوابق شغلی (جدول ۲)', icon: Briefcase },
    { num: 6, label: 'سوابق پزشکی (جدول ۴)', icon: FileCheck },
    { num: 7, label: 'تایید پیامکی و چاپ', icon: Smartphone },
  ];

  return (
    <div className="space-y-6">
      {/* Header Wizard Stepper */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-2 overflow-x-auto pb-2">
          {STEPS.map((s) => {
            const Icon = s.icon;
            const isPassed = currentStep > s.num;
            const isCurrent = currentStep === s.num;

            return (
              <button
                key={s.num}
                onClick={() => setCurrentStep(s.num)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition whitespace-nowrap ${
                  isCurrent
                    ? 'bg-blue-600 text-white shadow-sm'
                    : isPassed
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                  isCurrent ? 'bg-white text-blue-600 font-extrabold' : isPassed ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
                }`}>
                  {isPassed ? '✓' : s.num}
                </span>
                <span>{s.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs">
        {/* STEP 1: PERSONAL DETAILS */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 text-base border-b border-slate-100 pb-2 flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" />
              <span>جدول ۱: مشخصات فردی شاغل (مطابق فرم رسمی وزارت بهداشت)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">کد ملی شاغل *</label>
                <input
                  type="text"
                  value={nationalId}
                  onChange={(e) => setNationalId(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2 font-mono"
                  placeholder="۱۰ رقم کد ملی"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">نام</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">نام خانوادگی</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">نام پدر</label>
                <input
                  type="text"
                  value={fatherName}
                  onChange={(e) => setFatherName(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">سال تولد</label>
                <input
                  type="text"
                  value={birthYear}
                  onChange={(e) => setBirthYear(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">جنسیت</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value as any)}
                  className="w-full border border-slate-300 rounded-lg p-2"
                >
                  <option value="مرد">مرد</option>
                  <option value="زن">زن</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">وضعیت تاهل</label>
                <select
                  value={maritalStatus}
                  onChange={(e) => setMaritalStatus(e.target.value as any)}
                  className="w-full border border-slate-300 rounded-lg p-2"
                >
                  <option value="متاهل">متاهل</option>
                  <option value="مجرد">مجرد</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">تعداد فرزندان</label>
                <input
                  type="number"
                  value={childrenCount}
                  onChange={(e) => setChildrenCount(Number(e.target.value))}
                  className="w-full border border-slate-300 rounded-lg p-2 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">وضعیت نظام وظیفه</label>
                <select
                  value={militaryStatus}
                  onChange={(e) => setMilitaryStatus(e.target.value as any)}
                  className="w-full border border-slate-300 rounded-lg p-2"
                  disabled={gender === 'زن'}
                >
                  <option value="خدمت کرده">خدمت کرده</option>
                  <option value="معافیت پزشکی">معافیت پزشکی</option>
                  <option value="غیرمشمول">غیرمشمول</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">رسته خدمت / علت معافیت</label>
                <input
                  type="text"
                  value={militaryBranch}
                  onChange={(e) => setMilitaryBranch(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2"
                  disabled={gender === 'زن'}
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">شماره موبایل (جهت OTP)</label>
                <input
                  type="text"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">نوع معاینات سلامت شغلی</label>
                <select
                  value={examinationType}
                  onChange={(e) => setExaminationType(e.target.value as any)}
                  className="w-full border border-slate-300 rounded-lg p-2 font-bold text-blue-700"
                >
                  <option value="دوره‌ای">معاینات دوره‌ای (سالانه)</option>
                  <option value="بدواستخدام">معاینات بدواستخدام</option>
                  <option value="موردی">معاینات موردی / بازگشت به کار</option>
                </select>
              </div>

              <div className="col-span-1 sm:col-span-2">
                <label className="block text-slate-700 font-bold mb-1">شرکت و آدرس محل کار</label>
                <input
                  type="text"
                  value={workAddress}
                  onChange={(e) => setWorkAddress(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2"
                />
              </div>

              <div className="col-span-1 sm:col-span-2">
                <label className="block text-slate-700 font-bold mb-1">آدرس منزل شاغل</label>
                <input
                  type="text"
                  value={homeAddress}
                  onChange={(e) => setHomeAddress(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: PACKAGES */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 text-base border-b border-slate-100 pb-2">
              مرحله ۲: انتخاب پکیج خدمات تشخیصی و سلامت شغلی
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  title: 'پکیج پایه سلامت اداری',
                  price: 2100000,
                  tests: ['CBC کامل خونی', 'قند خون ناشتا (FBS)', 'آنالیز ادرار (U/A)', 'اپتومتری و دید رنگی', 'معاینه عمومی پزشک طب کار'],
                },
                {
                  title: 'پکیج کامل صنعتی و سلامت شغلی',
                  price: 3850000,
                  isRecommended: true,
                  tests: [
                    'CBC کامل خونی',
                    'پروفایل کامل چربی و قند (Lipid + FBS)',
                    'آنالیز ادرار',
                    'اودیومتری ۸ فرکانس (AC/BC)',
                    'اسپیرومتری کامل با تفسیر',
                    'اپتومتری و دید عمق',
                    'ارزیابی ۵ گانه مخاطرات HSE',
                    'معاینه جامع ۱۲ ارگان پزشک طب کار',
                  ],
                },
                {
                  title: 'پکیج ویژه مواجهه شیمیایی و پرتو',
                  price: 5200000,
                  tests: [
                    'کلیه موارد پکیج صنعتی',
                    'تست‌های عملکرد کبد و کلیه (SGOT/SGPT/BUN/Cr)',
                    'بیومارکر اختصاصی سرب یا حلال',
                    'گرافی قفسه سینه CXR PA',
                    'الکتروکاردیوگرام ECG',
                  ],
                },
              ].map((pkg, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setSelectedPackage(pkg.title);
                    setPackagePrice(pkg.price);
                  }}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition text-right relative ${
                    selectedPackage === pkg.title
                      ? 'border-blue-600 bg-blue-50/50 shadow-md'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {pkg.isRecommended && (
                    <span className="absolute top-2 left-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      پیشنهادی صنایع
                    </span>
                  )}
                  <h4 className="font-bold text-slate-900 text-sm">{pkg.title}</h4>
                  <div className="mt-2 text-lg font-black text-blue-700">
                    {pkg.price.toLocaleString('fa-IR')} <span className="text-xs font-normal text-slate-600">ریال</span>
                  </div>
                  <ul className="mt-3 space-y-1.5 text-xs text-slate-700">
                    {pkg.tests.map((t, tidx) => (
                      <li key={tidx} className="flex items-center gap-1.5">
                        <span className="text-emerald-500 font-bold">✓</span>
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: POS PAYMENT */}
        {currentStep === 3 && (
          <div className="space-y-4 max-w-xl mx-auto text-center">
            <h3 className="font-bold text-slate-900 text-base">
              مرحله ۳: تسویه حساب و اتصال به درگاه کارتخوان (POS)
            </h3>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex justify-between items-center text-sm border-b border-slate-200 pb-3">
                <span className="text-slate-600">پکیج انتخابی:</span>
                <span className="font-bold text-slate-900">{selectedPackage}</span>
              </div>
              <div className="flex justify-between items-center text-base border-b border-slate-200 pb-3">
                <span className="text-slate-600">مبلغ قابل پرداخت:</span>
                <span className="font-extrabold text-blue-700 text-xl">{packagePrice.toLocaleString('fa-IR')} ریال</span>
              </div>

              {posStatus === 'IDLE' && (
                <button
                  onClick={simulatePosPayment}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-bold text-sm shadow transition flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-5 h-5" />
                  <span>ارسال مبلغ به دستگاه کارتخوان (POS سداد / به‌پرداخت)</span>
                </button>
              )}

              {posStatus === 'PROCESSING' && (
                <div className="p-4 bg-amber-50 text-amber-800 rounded-xl border border-amber-200 text-xs font-bold animate-pulse">
                  در حال انتظار برای کشیدن کارت و ورود رمز در پایانه POS...
                </div>
              )}

              {posStatus === 'PAID' && (
                <div className="p-4 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200 text-xs space-y-2">
                  <div className="font-bold flex items-center justify-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>تراکنش با موفقیت انجام شد</span>
                  </div>
                  <div className="font-mono text-slate-700">کد رهگیری بانکی: {transactionCode}</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 4: PHOTO WEBCAM */}
        {currentStep === 4 && (
          <div className="space-y-4 max-w-lg mx-auto text-center">
            <h3 className="font-bold text-slate-900 text-base">مرحله ۴: الصاق تصویر چهره شاغل به پرونده</h3>
            <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 bg-slate-50 flex flex-col items-center justify-center gap-3">
              <div className="w-32 h-40 bg-slate-200 rounded-lg flex items-center justify-center text-slate-400 border border-slate-300">
                <Camera className="w-10 h-10" />
              </div>
              <div className="text-xs text-slate-600">تصویر وب‌کم زنده یا بارگذاری فایل عکس پرسنلی ۴×۳</div>
              <div className="flex gap-2">
                <button
                  onClick={() => alert('وب‌کم فعال و عکس شاغل با موفقیت ذخیره گردید.')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-bold transition"
                >
                  گرفتن عکس زنده
                </button>
                <button
                  onClick={() => alert('فایل عکس پرسنلی بارگذاری شد.')}
                  className="bg-slate-200 hover:bg-slate-300 text-slate-800 px-4 py-2 rounded-lg text-xs font-bold transition"
                >
                  انتخاب فایل از سیستم
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: JOB HISTORY */}
        {currentStep === 5 && (
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 text-base border-b border-slate-100 pb-2">
              جدول ۲: سوابق شغلی (مشاغل فعلی و قبلی شاغل)
            </h3>
            <div className="space-y-3 text-xs">
              <div className="p-3 border border-slate-200 rounded-xl bg-slate-50 space-y-2">
                <span className="font-bold text-blue-900">شغل فعلی در سازمان:</span>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-slate-600 mb-1">عنوان / سمت شغلی</label>
                    <input
                      type="text"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      className="w-full border border-slate-300 rounded p-1.5 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 mb-1">وظیفه محوله</label>
                    <input
                      type="text"
                      value={duty}
                      onChange={(e) => setDuty(e.target.value)}
                      className="w-full border border-slate-300 rounded p-1.5 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 mb-1">تاریخ شروع اشتغال</label>
                    <input
                      type="text"
                      defaultValue="۱۴۰۱/۰۱/۱۵"
                      className="w-full border border-slate-300 rounded p-1.5 bg-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 mb-1">علت تغییر شغل قبلی</label>
                    <input
                      type="text"
                      defaultValue="شغل فعلی"
                      className="w-full border border-slate-300 rounded p-1.5 bg-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 6: MEDICAL QUESTIONS (TABLE 4) */}
        {currentStep === 6 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="font-bold text-slate-900 text-base">
                جدول ۴: سابقه شخصی، خانوادگی و پزشکی (۱۶ سؤال استاندارد وزارت بهداشت)
              </h3>
              <span className="text-xs text-slate-500">بر اساس خوداظهاری شاغل تکمیل گردد</span>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto pr-1 text-xs">
              {[
                { id: 1, q: '۱. آیا سابقه بیماری دارید؟ ذکر نمائید.' },
                { id: 2, q: '۲. درصورت ابتلا به بیماری آیا علایم شما در محیط کار تغییر می‌کند؟' },
                { id: 3, q: '۳. درصورت ابتلا به بیماری آیا همکاران شما علایم مشابه در محل کار دارند؟' },
                { id: 4, q: '۴. درصورت ابتلا به بیماری آیا علایم شما در زمان تعطیلات و مرخصی‌ها تغییر می‌کند؟' },
                { id: 5, q: '۵. آیا به غذا، دارو یا ماده خاصی حساسیت دارید؟' },
                { id: 6, q: '۶. آیا سابقه بستری در بیمارستان دارید؟ به چه دلیل؟' },
                { id: 7, q: '۷. آیا سابقه عمل جراحی دارید؟ ذکر نمایید.' },
                { id: 8, q: '۸. آیا سابقه سرطان یا بیماری مزمن در فامیل دارید؟ ذکر نمایید.' },
                { id: 9, q: '۹. آیا داروی خاصی مصرف می‌کنید؟ ذکر نمایید.' },
                { id: 10, q: '۱۰. آیا اکنون سیگار می‌کشید؟ (تعداد نخ و مدت استعمال)' },
                { id: 11, q: '۱۱. آیا سابقه قبلی مصرف سیگار دارید؟' },
                { id: 12, q: '۱۲. آیا در اوقات فراغت به ورزش یا سرگرمی خاصی مشغول هستید؟' },
                { id: 13, q: '۱۳. آیا تاکنون به حادثه شغلی دچار شده‌اید؟ نوع آسیب و علت' },
                { id: 14, q: '۱۴. آیا سابقه غیبت از کار به دلیل بیماری بیش از ۳ روز دارید؟' },
                { id: 15, q: '۱۵. آیا منزل شما در مجاورت مرکز صنعتی قرار دارد؟' },
                { id: 16, q: '۱۶. آیا سابقه معرفی به کمیسیون پزشکی را دارید؟' },
              ].map((row) => (
                <div key={row.id} className="p-2.5 rounded-lg border border-slate-200 bg-slate-50/60 flex flex-wrap items-center justify-between gap-3">
                  <span className="font-semibold text-slate-800 flex-1 min-w-[240px]">{row.q}</span>
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="radio"
                        name={`q-${row.id}`}
                        checked={medicalAnswers[row.id]?.answer === 'خیر'}
                        onChange={() =>
                          setMedicalAnswers({
                            ...medicalAnswers,
                            [row.id]: { answer: 'خیر', details: '' },
                          })
                        }
                      />
                      <span>خیر</span>
                    </label>
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="radio"
                        name={`q-${row.id}`}
                        checked={medicalAnswers[row.id]?.answer === 'بلی'}
                        onChange={() =>
                          setMedicalAnswers({
                            ...medicalAnswers,
                            [row.id]: { answer: 'بلی', details: medicalAnswers[row.id]?.details || '' },
                          })
                        }
                      />
                      <span>بلی</span>
                    </label>
                    <input
                      type="text"
                      placeholder="توضیحات در صورت بلی..."
                      value={medicalAnswers[row.id]?.details || ''}
                      onChange={(e) =>
                        setMedicalAnswers({
                          ...medicalAnswers,
                          [row.id]: { answer: medicalAnswers[row.id]?.answer || 'بلی', details: e.target.value },
                        })
                      }
                      className="border border-slate-300 rounded p-1 w-44 bg-white"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 7: OTP & FINISH */}
        {currentStep === 7 && (
          <div className="space-y-4 max-w-md mx-auto text-center">
            <h3 className="font-bold text-slate-900 text-base">مرحله ۷: تایید پیامکی (OTP) و صدور برگه نوبت پذیرش</h3>
            <p className="text-xs text-slate-600">
              کد ۶ رقمی احراز هویت و رضایت به شماره موبایل {mobile} پیامک شد.
            </p>

            <div className="space-y-3">
              <input
                type="text"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                placeholder="کد ۶ رقمی (مثلاً ۱۲۳۴۵۶)"
                className="w-full text-center text-lg font-mono tracking-widest border-2 border-blue-400 rounded-xl p-3"
              />

              {!isOtpVerified ? (
                <button
                  onClick={handleVerifyOtp}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-bold text-sm shadow transition"
                >
                  تایید کد و تشکیل نهایی پرونده در پایگاه داده
                </button>
              ) : (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-3">
                  <div className="text-emerald-800 font-bold text-sm flex items-center justify-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                    <span>پرونده با موفقیت ثبت شد</span>
                  </div>
                  <div className="text-xs text-slate-700">
                    شماره پرونده سلامت شغلی: <strong className="font-mono text-blue-700">{completedDossierNumber}</strong>
                  </div>
                  <button
                    onClick={() => alert(`🖨️ برگه ورود به ایستگاه‌های بالینی چاپ شد. شاغل به آزمایشگاه و پاراکلینیک هدایت گردد.`)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-2"
                  >
                    <Printer className="w-4 h-4" />
                    <span>چاپ کارت گردش کار بیمار (پذیرش تا پزشک)</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Stepper Navigation Buttons */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center">
          <button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-100 disabled:opacity-40 transition"
          >
            <ArrowRight className="w-4 h-4" />
            <span>مرحله قبل</span>
          </button>

          {currentStep < 7 ? (
            <button
              onClick={() => setCurrentStep(Math.min(7, currentStep + 1))}
              className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-xs font-bold transition"
            >
              <span>مرحله بعد</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          ) : (
            <span className="text-xs text-emerald-600 font-bold">پایان مراحل پذیرش</span>
          )}
        </div>
      </div>
    </div>
  );
};
