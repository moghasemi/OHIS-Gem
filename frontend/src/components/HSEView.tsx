import React, { useState } from 'react';
import { Patient } from '../types/index.ts';
import { HardHat, Save, CheckCircle2, AlertOctagon, Volume2 } from 'lucide-react';

interface Props {
  patient: Patient;
  onUpdatePatient: (updated: Patient) => void;
  onNavigateTab: (tabId: string) => void;
}

export const HSEView: React.FC<Props> = ({ patient, onUpdatePatient, onNavigateTab }) => {
  const [hazards, setHazards] = useState(patient.hseHazards);
  const [isSaved, setIsSaved] = useState(false);

  const toggleHazard = (category: keyof typeof hazards, item: string) => {
    const list = (hazards[category] as string[]) || [];
    const exists = list.includes(item);
    setHazards({
      ...hazards,
      [category]: exists ? list.filter((x) => x !== item) : [...list, item],
    });
  };

  const handleSave = () => {
    const updated: Patient = {
      ...patient,
      hseHazards: hazards,
      status: patient.status === 'HSE_PENDING' ? 'DOCTOR_REVIEW' : patient.status,
    };
    onUpdatePatient(updated);
    setIsSaved(true);
    setTimeout(() => {
      onNavigateTab('doctor');
    }, 1000);
  };

  const PHYSICAL_LIST = ['سر و صدا', 'ارتعاش', 'اشعه غیر یونیزان', 'اشعه یونیزان', 'استرس حرارتی', 'روشنایی نامناسب'];
  const CHEMICAL_LIST = ['گردوغبار', 'دمه فلزات', 'حلال‌ها', 'آفت‌کش‌ها', 'اسید و بازها', 'گازها و بخارات'];
  const BIOLOGICAL_LIST = ['گزش حشرات', 'باکتری', 'ویروس', 'انگل و قارچ'];
  const ERGONOMIC_LIST = ['ایستادن یا نشستن طولانی مدت', 'کار تکراری', 'حمل و نقل بار سنگین', 'وضعیت نامناسب بدن', 'حرکات ناگهانی'];
  const PSYCHOLOGICAL_LIST = ['نوبت‌کاری', 'استرسورهای شغلی', 'اضافه کاری بالا', 'عدم امنیت شغلی'];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <HardHat className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-slate-900 text-sm">
              ارزیابی عوامل زیان‌آور شغلی محیط کار (جدول ۳ فرم رسمی) — شاغل: {patient.firstName} {patient.lastName}
            </div>
            <div className="text-xs text-slate-500 font-mono mt-0.5">
              شرکت: {patient.companyName} | عنوان شغلی: {patient.jobTitle}
            </div>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg text-xs font-bold shadow transition"
        >
          <Save className="w-4 h-4" />
          <span>تأیید نظریه HSE و ارسال پرونده به پزشک طب کار</span>
        </button>
      </div>

      {isSaved && (
        <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>ارزیابی بهداشت حرفه‌ای ثبت شد و پرونده در کارتابل پزشک متخصص طب کار قرار گرفت.</span>
        </div>
      )}

      {/* Hazard Categories Grid */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs space-y-6 text-xs">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {/* Physical */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <span className="font-bold text-blue-900 text-xs block border-b border-slate-200 pb-1">
              ۱. عوامل فیزیکی
            </span>
            <div className="space-y-1.5">
              {PHYSICAL_LIST.map((item) => (
                <label key={item} className="flex items-center gap-2 cursor-pointer text-slate-700">
                  <input
                    type="checkbox"
                    checked={hazards.physical.includes(item)}
                    onChange={() => toggleHazard('physical', item)}
                    className="rounded text-blue-600"
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Chemical */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <span className="font-bold text-blue-900 text-xs block border-b border-slate-200 pb-1">
              ۲. عوامل شیمیایی
            </span>
            <div className="space-y-1.5">
              {CHEMICAL_LIST.map((item) => (
                <label key={item} className="flex items-center gap-2 cursor-pointer text-slate-700">
                  <input
                    type="checkbox"
                    checked={hazards.chemical.includes(item)}
                    onChange={() => toggleHazard('chemical', item)}
                    className="rounded text-blue-600"
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Biological */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <span className="font-bold text-blue-900 text-xs block border-b border-slate-200 pb-1">
              ۳. عوامل بیولوژیک
            </span>
            <div className="space-y-1.5">
              {BIOLOGICAL_LIST.map((item) => (
                <label key={item} className="flex items-center gap-2 cursor-pointer text-slate-700">
                  <input
                    type="checkbox"
                    checked={hazards.biological.includes(item)}
                    onChange={() => toggleHazard('biological', item)}
                    className="rounded text-blue-600"
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Ergonomic */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <span className="font-bold text-blue-900 text-xs block border-b border-slate-200 pb-1">
              ۴. عوامل ارگونومی
            </span>
            <div className="space-y-1.5">
              {ERGONOMIC_LIST.map((item) => (
                <label key={item} className="flex items-center gap-2 cursor-pointer text-slate-700">
                  <input
                    type="checkbox"
                    checked={hazards.ergonomic.includes(item)}
                    onChange={() => toggleHazard('ergonomic', item)}
                    className="rounded text-blue-600"
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Psychological */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <span className="font-bold text-blue-900 text-xs block border-b border-slate-200 pb-1">
              ۵. عوامل روانی
            </span>
            <div className="space-y-1.5">
              {PSYCHOLOGICAL_LIST.map((item) => (
                <label key={item} className="flex items-center gap-2 cursor-pointer text-slate-700">
                  <input
                    type="checkbox"
                    checked={hazards.psychological.includes(item)}
                    onChange={() => toggleHazard('psychological', item)}
                    className="rounded text-blue-600"
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Measurements and Notes */}
        <div className="space-y-4 pt-2">
          <div>
            <label className="block text-slate-800 font-bold mb-1">
              توضیحات لازم در خصوص موارد ثبت شده در جدول و ثبت نتایج اندازه‌گیری‌ها:
            </label>
            <textarea
              rows={3}
              value={hazards.measurementNotes}
              onChange={(e) => setHazards({ ...hazards, measurementNotes: e.target.value })}
              className="w-full border border-slate-300 rounded-lg p-2.5 bg-slate-50"
            />
          </div>

          <div>
            <label className="block text-slate-800 font-bold mb-1">
              نظریه کارشناسی بهداشت حرفه‌ای در خصوص شرایط محیط کار و اقدامات کنترلی:
            </label>
            <textarea
              rows={3}
              value={hazards.expertOpinion}
              onChange={(e) => setHazards({ ...hazards, expertOpinion: e.target.value })}
              className="w-full border border-slate-300 rounded-lg p-2.5 bg-slate-50"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-100">
            <div>
              <label className="block text-slate-700 font-bold mb-1">نام کارشناس بهداشت حرفه‌ای</label>
              <input
                type="text"
                value={hazards.expertName}
                onChange={(e) => setHazards({ ...hazards, expertName: e.target.value })}
                className="w-full border border-slate-300 rounded p-2"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-bold mb-1">تاریخ تکمیل ارزیابی</label>
              <input
                type="text"
                value={hazards.expertDate}
                onChange={(e) => setHazards({ ...hazards, expertDate: e.target.value })}
                className="w-full border border-slate-300 rounded p-2 font-mono"
              />
            </div>
            <div className="flex items-end">
              <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-lg font-bold w-full text-center">
                مهر و امضای دیجیتال کارشناس تایید شد
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
