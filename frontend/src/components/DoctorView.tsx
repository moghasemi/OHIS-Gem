import React, { useState } from 'react';
import { Patient } from '../types/index.ts';
import { DoctorDecision } from '../domain/rules.ts';
import {
  Stethoscope,
  Lock,
  CheckCircle2,
  AlertTriangle,
  Printer,
  ChevronDown,
  ChevronUp,
  FileCheck2,
  ShieldAlert,
  ArrowRight,
  ArrowLeft,
  Plus,
  Trash2,
} from 'lucide-react';

interface Props {
  patient: Patient;
  onUpdatePatient: (updated: Patient) => void;
  onOpenOfficialForm: (patient: Patient) => void;
}

export const DoctorView: React.FC<Props> = ({ patient, onOpenOfficialForm }) => {
  const [activeStep, setActiveStep] = useState(1);
  const [decision, setDecision] = useState<DoctorDecision>(
    patient.doctorDecision?.opinion || ''
  );
  const [conditions, setConditions] = useState(
    patient.doctorDecision?.conditions || ''
  );
  const [unfitReasons, setUnfitReasons] = useState(patient.doctorDecision?.unfitReasons || '');
  const [recommendations, setRecommendations] = useState(
    patient.doctorDecision?.recommendations || ''
  );

  // Referrals
  const [referrals, setReferrals] = useState(patient.referrals);
  const [newSpecialty, setNewSpecialty] = useState('');
  const [newReason, setNewReason] = useState('');

  // Lock notification
  const [lockFeedback, setLockFeedback] = useState<string | null>(null);

  // Accordion open states for 12 systems
  const [openSystems, setOpenSystems] = useState<Record<string, boolean>>({
    عمومی: false,
    چشم: false,
    'پوست، مو و ناخن': false,
    'گوش، حلق، بینی و دهان': true,
    'سر و گردن': false,
    ریه: false,
    'قلب و عروق': false,
    'شکم و لگن': false,
    'کلیه و مجاری ادراری': false,
    'اسکلتی و عضلانی': true,
    'سیستم عصبی': false,
    'اعصاب و روان': false,
  });

  const toggleSystem = (sys: string) => {
    setOpenSystems((prev) => ({ ...prev, [sys]: !prev[sys] }));
  };

  const handleAddReferral = () => {
    if (!newSpecialty || !newReason) return;
    const newRef = {
      id: 'ref-' + Date.now(),
      specialty: newSpecialty,
      reason: newReason,
      date: '۱۴۰۵/۰۴/۰۲',
      result: '',
      status: 'PENDING' as const,
    };
    setReferrals([...referrals, newRef]);
    setNewSpecialty('');
    setNewReason('');
  };

  const handleResolveReferral = (id: string, resultText: string) => {
    setReferrals(
      referrals.map((r) =>
        r.id === id ? { ...r, result: resultText, status: 'RESOLVED' as const } : r
      )
    );
  };

  const handleDeleteReferral = (id: string) => {
    setReferrals(referrals.filter((r) => r.id !== id));
  };

  const handleFinalizeAndLock = () => {
    const message = 'قفل پرونده غیرفعال است؛ ابتدا باید هویت پزشک از حساب معتبر سرور تأیید و امضای دیجیتال قابل راستی‌آزمایی پیاده‌سازی شود.';
    setLockFeedback(message);
    alert(message);
  };

  const SYSTEMS = [
    { name: 'عمومی', symp: ['کاهش وزن', 'کاهش اشتها', 'خستگی مزمن', 'اختلال خواب', 'تعریق زیاد', 'تب'], signs: ['وضعیت ill/toxic', 'مخاطات رنگ‌پریده'] },
    { name: 'چشم', symp: ['کاهش حدت بینایی', 'تاری دید', 'خستگی چشم', 'دوبینی', 'سوزش/خارش'], signs: ['رفلکس غیرطبیعی مردمک', 'قرمزی چشم', 'نیستاگموس'] },
    { name: 'پوست، مو و ناخن', symp: ['خارش پوست', 'ریزش مو', 'قرمزی', 'زخم مزمن', 'پوسته‌ریزی'], signs: ['ماکول', 'پاپول', 'ندول', 'وزیکول', 'کهیر', 'کلابینگ'] },
    { name: 'گوش، حلق، بینی و دهان', symp: ['کاهش شنوایی', 'وزوز گوش', 'سرگیجه', 'درد گوش', 'گرفتگی صدا'], signs: ['التهاب پرده تمپان', 'پارگی پرده', 'Lead Line', 'التهاب لثه'] },
    { name: 'سر و گردن', symp: ['درد گردن', 'توده گردنی'], signs: ['بزرگی تیروئید', 'لنفادنوپاتی گردنی'] },
    { name: 'ریه', symp: ['سرفه', 'خلط', 'تنگی نفس کوششی', 'خس‌خس سینه'], signs: ['ویزینگ', 'کراکل', 'تاکی‌پنه', 'کاهش صداهای ریوی'] },
    { name: 'قلب و عروق', symp: ['درد قفسه سینه', 'تپش قلب', 'تنگی نفس شبانه', 'سیانوز'], signs: ['S1/S2 غیرطبیعی', 'سوفل قلبی', 'آریتمی', 'ادم اندام'] },
    { name: 'شکم و لگن', symp: ['بی‌اشتهایی', 'تهوع/استفراغ', 'درد شکم', 'سوزش سردل'], signs: ['تندرنس شکمی', 'ریباند', 'هپاتومگالی', 'توده'] },
    { name: 'کلیه و مجاری ادراری', symp: ['سوزش ادرار', 'تکرر ادرار', 'هماچوری', 'درد پهلو'], signs: ['CVA تندرنس', 'واریکوسل'] },
    { name: 'اسکلتی و عضلانی', symp: ['خشکی مفصل', 'کمردرد', 'درد زانو', 'درد شانه'], signs: ['محدودیت حرکتی', 'کاهش قدرت عضلانی', 'تست SLR مثبت'] },
    { name: 'سیستم عصبی', symp: ['سردرد', 'گیجی', 'لرزش', 'گزگز انگشتان'], signs: ['رفلکس غیرطبیعی', 'رومبرگ مختل', 'ترمور', 'تینل/فالن مثبت'] },
    { name: 'اعصاب و روان', symp: ['عصبانیت', 'پرخاشگری', 'اضطراب', 'خلق پایین'], signs: ['هذیان', 'توهم', 'اختلال اوریانتاسیون'] },
  ];

  return (
    <div className="space-y-6">
      {/* Patient Header Banner */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
            <Stethoscope className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <span>کارتابل پزشک متخصص طب کار — شاغل: {patient.firstName} {patient.lastName}</span>
              {patient.isLocked && (
                <span className="text-xs bg-slate-800 text-white px-2 py-0.5 rounded-full flex items-center gap-1 font-bold">
                  <Lock className="w-3 h-3" />
                  <span>پرونده قفل شده</span>
                </span>
              )}
            </div>
            <div className="text-xs text-slate-500 font-mono mt-0.5">
              پرونده: {patient.dossierNumber} | کد ملی: {patient.nationalId} | شرکت: {patient.companyName}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onOpenOfficialForm(patient)}
            className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition shadow"
          >
            <Printer className="w-4 h-4" />
            <span>چاپ فرم ۵ صفحه‌ای</span>
          </button>
        </div>
      </div>

      {lockFeedback && (
        <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{lockFeedback}</span>
        </div>
      )}

      {/* Stepper Tabs */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs">
        <div className="flex bg-slate-100 p-1 rounded-lg gap-1 max-w-2xl text-xs font-bold">
          {[
            { num: 1, label: '۱. خلاصه کل یافته‌ها' },
            { num: 2, label: '۲. جدول ۵: معاینه ۱۲ سیستم' },
            { num: 3, label: '۳. جدول ۸: ارجاعات تخصصی' },
            { num: 4, label: '۴. جدول ۹: نظر نهایی و قفل' },
          ].map((s) => (
            <button
              key={s.num}
              onClick={() => setActiveStep(s.num)}
              className={`flex-1 py-2 rounded-md transition text-center ${
                activeStep === s.num
                  ? 'bg-white shadow text-blue-700 font-extrabold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* STEP 1: SUMMARY */}
        {activeStep === 1 && (
          <div className="mt-6 space-y-4 text-xs">
            <h4 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">
              مرور تجمیعی یافته‌های شاغل پیش از معاینه نهایی
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <span className="font-bold text-blue-900">مشخصات و سوابق شغلی</span>
                <p><strong>شغل:</strong> {patient.jobTitle}</p>
                <p><strong>وظیفه:</strong> {patient.duty}</p>
                <p><strong>عوامل زیان‌آور HSE:</strong> {patient.hseHazards.physical.join('، ') || 'ندارد'}</p>
                <p><strong>تراز صدا:</strong> {patient.hseHazards.measurementNotes}</p>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <span className="font-bold text-blue-900">علائم حیاتی و سوابق پزشکی</span>
                <p><strong>فشار خون:</strong> {patient.vitals.bpSystolic}/{patient.vitals.bpDiastolic} mmHg</p>
                <p><strong>قد / وزن:</strong> {patient.vitals.heightCm} cm / {patient.vitals.weightKg} kg</p>
                <p><strong>سابقه سیگار:</strong> قبلاً داشته (ترک کرده)</p>
                <p><strong>ورزش:</strong> منظم</p>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <span className="font-bold text-blue-900">آزمایشگاه و پاراکلینیک</span>
                <p><strong>Hb / HCT:</strong> {patient.labResults.cbc.hb} / {patient.labResults.cbc.hct}</p>
                <p><strong>FBS / Chol:</strong> {patient.labResults.biochemistry.fbs} / {patient.labResults.biochemistry.chol}</p>
                <p><strong>شنوایی:</strong> افت نویز در ۴۰۰۰ هرتز (Noise Notch)</p>
                <p><strong>ریه:</strong> الگوی اسپیرومتری نرمال (FEV1/FVC: 80.7%)</p>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: TABLE 5 - 12 SYSTEMS ACCORDION */}
        {activeStep === 2 && (
          <div className="mt-6 space-y-4 text-xs">
            <div className="flex flex-wrap items-center justify-between border-b border-slate-100 pb-2">
              <h4 className="font-bold text-slate-900 text-sm">
                جدول ۵: معاینات بالینی و بررسی ۱۲ ارگان بدن شاغل
              </h4>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    const allTrue: Record<string, boolean> = {};
                    SYSTEMS.forEach((s) => (allTrue[s.name] = true));
                    setOpenSystems(allTrue);
                  }}
                  className="text-blue-600 hover:underline text-[11px]"
                >
                  باز کردن همه
                </button>
                <span className="text-slate-300">|</span>
                <button
                  onClick={() => setOpenSystems({})}
                  className="text-blue-600 hover:underline text-[11px]"
                >
                  بستن همه
                </button>
              </div>
            </div>

            <div className="space-y-2">
              {SYSTEMS.map((sys, idx) => {
                const isOpen = openSystems[sys.name];
                return (
                  <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                    <button
                      type="button"
                      onClick={() => toggleSystem(sys.name)}
                      className="w-full flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 transition text-right"
                    >
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <span className="text-blue-600">{idx + 1}.</span>
                        <span>{sys.name}</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-500">
                        <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full">
                          {sys.symp.length} علامت / {sys.signs.length} نشانه
                        </span>
                        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="p-4 border-t border-slate-200 space-y-4 bg-white animate-in fade-in">
                        {/* Master Toggles */}
                        <div className="flex gap-6 p-2.5 bg-blue-50/70 border border-blue-200 rounded-lg text-xs font-bold text-blue-900">
                          <label className="flex items-center gap-1.5 cursor-pointer">
                            <input type="checkbox" defaultChecked className="rounded text-blue-600" />
                            <span>بدون علامت بالینی (No Symptoms)</span>
                          </label>
                          <label className="flex items-center gap-1.5 cursor-pointer">
                            <input type="checkbox" defaultChecked className="rounded text-blue-600" />
                            <span>بدون نشانه فیزیکی (No Signs)</span>
                          </label>
                        </div>

                        {/* Symptoms */}
                        <div>
                          <span className="font-bold text-slate-800 block mb-1.5">علائم بیانی (Symptoms):</span>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {sys.symp.map((item) => (
                              <label key={item} className="flex items-center gap-1.5 text-slate-700 cursor-pointer">
                                <input type="checkbox" className="rounded text-blue-600" />
                                <span>{item}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Signs */}
                        <div>
                          <span className="font-bold text-slate-800 block mb-1.5">نشانه‌های بالینی فیزیکی (Signs):</span>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {sys.signs.map((item) => (
                              <label key={item} className="flex items-center gap-1.5 text-slate-700 cursor-pointer">
                                <input type="checkbox" className="rounded text-blue-600" />
                                <span>{item}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Notes */}
                        <div>
                          <label className="block text-slate-600 font-bold mb-1">توضیحات و خصوصیات بالینی:</label>
                          <input
                            type="text"
                            placeholder="یافته‌های اختصاصی معاینه پزشک..."
                            className="w-full border border-slate-300 rounded p-1.5 bg-slate-50"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 3: TABLE 8 - REFERRALS */}
        {activeStep === 3 && (
          <div className="mt-6 space-y-4 text-xs">
            <h4 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">
              جدول ۸: ارجاعات و مشاوره‌های تخصصی پزشکی
            </h4>

            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs font-bold flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
              <span>
                تذکر قانونی وزارت بهداشت: در صورت ثبت ارجاع، تا زمان ثبت نتیجه نهایی توسط پزشک مشاور، پرونده قابل قفل و صدور نظریه نهایی نخواهد بود.
              </span>
            </div>

            {/* Existing Referrals List */}
            <div className="space-y-3">
              {referrals.map((ref) => (
                <div key={ref.id} className="p-4 border border-slate-200 rounded-xl bg-slate-50/60 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-bold text-blue-900 text-sm">{ref.specialty}</span>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        ref.status === 'RESOLVED' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {ref.status === 'RESOLVED' ? 'نتیجه دریافت شد' : 'در انتظار مشاور'}
                      </span>
                      <button
                        onClick={() => handleDeleteReferral(ref.id)}
                        className="text-slate-400 hover:text-rose-600 p-1"
                        title="حذف ارجاع"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div><strong>علت ارجاع:</strong> {ref.reason}</div>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">نتیجه ارجاع تخصصی مشاور:</label>
                    <input
                      type="text"
                      value={ref.result}
                      placeholder="درج نظر پزشک متخصص مشاور..."
                      onChange={(e) => handleResolveReferral(ref.id, e.target.value)}
                      className="w-full border border-slate-300 rounded p-1.5 bg-white font-medium"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Add New Referral */}
            <div className="p-4 border-2 border-dashed border-slate-300 rounded-xl bg-slate-50 space-y-3">
              <span className="font-bold text-slate-800 flex items-center gap-1.5">
                <Plus className="w-4 h-4 text-blue-600" />
                <span>ثبت ارجاع جدید به متخصص (مثلاً ادیولوژیست، ارتوپد، چشم‌پزشک، قلب)</span>
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 mb-1">نوع تخصص</label>
                  <input
                    type="text"
                    value={newSpecialty}
                    onChange={(e) => setNewSpecialty(e.target.value)}
                    placeholder="مثلاً: متخصص گوش و حلق و بینی"
                    className="w-full border border-slate-300 rounded p-1.5 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 mb-1">علت ارجاع بالینی</label>
                  <input
                    type="text"
                    value={newReason}
                    onChange={(e) => setNewReason(e.target.value)}
                    placeholder="مثلاً: بررسی تکمیلی وزوز گوش و ادیومتری مجدد"
                    className="w-full border border-slate-300 rounded p-1.5 bg-white"
                  />
                </div>
              </div>
              <button
                onClick={handleAddReferral}
                disabled={!newSpecialty || !newReason}
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white px-4 py-1.5 rounded-lg text-xs font-bold transition"
              >
                افزودن ارجاع به جدول ۸
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: TABLE 9 - FINAL OPINION & LOCK */}
        {activeStep === 4 && (
          <div className="mt-6 space-y-5 text-xs">
            <h4 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">
              جدول ۹: نظریه نهایی پزشک متخصص طب کار / سلامت شغلی در خصوص تناسب کاری شاغل
            </h4>

            {/* Decision Radio Selector */}
            <div className="space-y-3">
              <label
                className={`p-3 rounded-xl border-2 flex items-center gap-3 cursor-pointer transition ${
                  decision === 'balamaneh' ? 'border-emerald-600 bg-emerald-50/60 shadow-xs' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <input
                  type="radio"
                  name="doctorDecision"
                  checked={decision === 'balamaneh'}
                  onChange={() => setDecision('balamaneh')}
                  className="w-4 h-4 text-emerald-600"
                />
                <div>
                  <div className="font-bold text-slate-900 text-sm text-emerald-900">الف- بلامانع</div>
                  <div className="text-[11px] text-slate-500">شاغل از نظر جسمی و روانی برای انجام وظایف شغل محوله صلاحیت کامل دارد.</div>
                </div>
              </label>

              <label
                className={`p-3 rounded-xl border-2 flex items-start gap-3 cursor-pointer transition ${
                  decision === 'mashroot' ? 'border-amber-600 bg-amber-50/60 shadow-xs' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <input
                  type="radio"
                  name="doctorDecision"
                  checked={decision === 'mashroot'}
                  onChange={() => setDecision('mashroot')}
                  className="w-4 h-4 text-amber-600 mt-1"
                />
                <div className="flex-1 space-y-2">
                  <div className="font-bold text-slate-900 text-sm text-amber-900">ب- مشروط (ذکر شروط پزشکی و ارگونومیک)</div>
                  <div className="text-[11px] text-slate-500">اشتغال به کار منوط به رعایت شروط حفاظتی و مراقبت‌های ویژه است.</div>
                  {decision === 'mashroot' && (
                    <textarea
                      rows={2}
                      value={conditions}
                      onChange={(e) => setConditions(e.target.value)}
                      placeholder="ذکر شروط دقیق (مثلاً: استفاده از گوشی حفاظتی دوبل، محدودیت بار، پایش ۶ ماهه)..."
                      className="w-full border border-amber-300 rounded p-2 bg-white text-xs"
                    />
                  )}
                </div>
              </label>

              <label
                className={`p-3 rounded-xl border-2 flex items-start gap-3 cursor-pointer transition ${
                  decision === 'adam_salahiyat' ? 'border-rose-600 bg-rose-50/60 shadow-xs' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <input
                  type="radio"
                  name="doctorDecision"
                  checked={decision === 'adam_salahiyat'}
                  onChange={() => setDecision('adam_salahiyat')}
                  className="w-4 h-4 text-rose-600 mt-1"
                />
                <div className="flex-1 space-y-2">
                  <div className="font-bold text-slate-900 text-sm text-rose-900">ج- عدم صلاحیت / تناسب پزشکی جهت شغل مورد نظر</div>
                  <div className="text-[11px] text-slate-500">به علت خطرات جدی سلامتی برای شاغل یا دیگران، ادامه این شغل ممنوع است.</div>
                  {decision === 'adam_salahiyat' && (
                    <textarea
                      rows={2}
                      value={unfitReasons}
                      onChange={(e) => setUnfitReasons(e.target.value)}
                      placeholder="ذکر علت یا علل رد صلاحیت پزشکی..."
                      className="w-full border border-rose-300 rounded p-2 bg-white text-xs"
                    />
                  )}
                </div>
              </label>
            </div>

            {/* Medical Recommendations */}
            <div>
              <label className="block text-slate-800 font-bold mb-1">توصیه‌های پزشکی و بهداشتی لازم به کارفرما و شاغل:</label>
              <textarea
                rows={3}
                value={recommendations}
                onChange={(e) => setRecommendations(e.target.value)}
                className="w-full border border-slate-300 rounded-lg p-2.5 bg-slate-50"
              />
            </div>

            {/* Digital Stamp & Lock Button */}
            <div className="p-4 bg-slate-900 text-white rounded-2xl flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="font-bold text-sm flex items-center gap-2">
                  <Lock className="w-4 h-4 text-amber-400" />
                  <span>قفل امنیتی قطعی پرونده پزشکی (Cryptographic Seal)</span>
                </div>
                <div className="text-[11px] text-slate-400 max-w-lg">
                  پس از قفل، هرگونه تغییر در پرونده نیازمند ایجاد الحاقیه (Amendment) با ردپای حسابرسی (Audit Trail) خواهد بود.
                </div>
              </div>

              <button
                onClick={handleFinalizeAndLock}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-6 py-2.5 rounded-xl font-extrabold text-sm shadow-md transition transform hover:scale-[1.02] flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>ثبت قطعی و قفل امنیتی پرونده</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
