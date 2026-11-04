import React, { useState } from 'react';
import { Patient } from '../types/index.ts';
import { FlaskConical, CheckCircle2, AlertCircle, Save, ArrowLeft, ShieldCheck } from 'lucide-react';

interface Props {
  patient: Patient;
  onUpdatePatient: (updated: Patient) => void;
  onNavigateTab: (tabId: string) => void;
}

export const LabView: React.FC<Props> = ({ patient, onUpdatePatient, onNavigateTab }) => {
  const [labData, setLabData] = useState(patient.labResults);
  const [isSaved, setIsSaved] = useState(false);

  const handleCbcChange = (field: keyof typeof labData.cbc, val: string) => {
    setLabData({
      ...labData,
      cbc: { ...labData.cbc, [field]: val },
    });
  };

  const handleBioChange = (field: keyof typeof labData.biochemistry, val: string) => {
    setLabData({
      ...labData,
      biochemistry: { ...labData.biochemistry, [field]: val },
    });
  };

  const handleSaveAndSend = () => {
    const updated: Patient = {
      ...patient,
      labResults: labData,
      status: patient.status === 'LAB_PENDING' ? 'PARACLINIC_PENDING' : patient.status,
    };
    onUpdatePatient(updated);
    setIsSaved(true);
    setTimeout(() => {
      onNavigateTab('para');
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Patient Header Card */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <FlaskConical className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-slate-900 text-sm">
              ثبت نتایج آزمایشگاه (جدول ۶ فرم رسمی) — شاغل: {patient.firstName} {patient.lastName}
            </div>
            <div className="text-xs text-slate-500 font-mono mt-0.5">
              شماره پرونده: {patient.dossierNumber} | کد ملی: {patient.nationalId} | شرکت: {patient.companyName}
            </div>
          </div>
        </div>

        <button
          onClick={handleSaveAndSend}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-xs font-bold shadow transition"
        >
          <Save className="w-4 h-4" />
          <span>تأیید نتایج و ارسال به پاراکلینیک</span>
        </button>
      </div>

      {isSaved && (
        <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>نتایج آزمایشگاه با موفقیت ثبت شد و به گردش کار پاراکلینیک ارسال گردید.</span>
        </div>
      )}

      {/* Lab Form Container */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs space-y-6 text-xs">
        {/* CBC */}
        <div className="space-y-3">
          <div className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2 flex items-center justify-between">
            <span className="text-blue-900">۱. شمارش کامل سلول‌های خونی (CBC / Complete Blood Count)</span>
            <span className="text-slate-400 font-normal text-[11px]">بازه رفرانس استاندارد</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
              <label className="block text-slate-600 font-bold mb-1">WBC (گلبول سفید)</label>
              <input
                type="text"
                value={labData.cbc.wbc}
                onChange={(e) => handleCbcChange('wbc', e.target.value)}
                className="w-full border border-slate-300 rounded p-1.5 font-mono text-center font-bold"
              />
              <span className="text-[10px] text-slate-400 mt-1 block text-center">4.0 - 10.0 ×10³/µL</span>
            </div>

            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
              <label className="block text-slate-600 font-bold mb-1">RBC (گلبول قرمز)</label>
              <input
                type="text"
                value={labData.cbc.rbc}
                onChange={(e) => handleCbcChange('rbc', e.target.value)}
                className="w-full border border-slate-300 rounded p-1.5 font-mono text-center font-bold"
              />
              <span className="text-[10px] text-slate-400 mt-1 block text-center">4.5 - 5.9 ×10⁶/µL</span>
            </div>

            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
              <label className="block text-slate-600 font-bold mb-1">Hb (هموگلوبین)</label>
              <input
                type="text"
                value={labData.cbc.hb}
                onChange={(e) => handleCbcChange('hb', e.target.value)}
                className="w-full border border-slate-300 rounded p-1.5 font-mono text-center font-bold text-blue-700"
              />
              <span className="text-[10px] text-slate-400 mt-1 block text-center">13.5 - 17.5 g/dL</span>
            </div>

            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
              <label className="block text-slate-600 font-bold mb-1">HCT (هماتوکریت)</label>
              <input
                type="text"
                value={labData.cbc.hct}
                onChange={(e) => handleCbcChange('hct', e.target.value)}
                className="w-full border border-slate-300 rounded p-1.5 font-mono text-center font-bold"
              />
              <span className="text-[10px] text-slate-400 mt-1 block text-center">41% - 50%</span>
            </div>

            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
              <label className="block text-slate-600 font-bold mb-1">Plt (پلاکت)</label>
              <input
                type="text"
                value={labData.cbc.plt}
                onChange={(e) => handleCbcChange('plt', e.target.value)}
                className="w-full border border-slate-300 rounded p-1.5 font-mono text-center font-bold"
              />
              <span className="text-[10px] text-slate-400 mt-1 block text-center">150 - 450 ×10³/µL</span>
            </div>
          </div>
        </div>

        {/* U/A */}
        <div className="space-y-3">
          <div className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2 text-blue-900">
            ۲. آنالیز و میکروسکوپی ادرار (Urinalysis / U/A)
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <div className="p-2 border border-slate-200 rounded-lg">
              <label className="block text-slate-600 mb-1">Protein</label>
              <input
                type="text"
                value={labData.ua.prot}
                onChange={(e) => setLabData({ ...labData, ua: { ...labData.ua, prot: e.target.value } })}
                className="w-full border border-slate-300 rounded p-1 text-center font-mono"
              />
            </div>
            <div className="p-2 border border-slate-200 rounded-lg">
              <label className="block text-slate-600 mb-1">Glucose</label>
              <input
                type="text"
                value={labData.ua.glu}
                onChange={(e) => setLabData({ ...labData, ua: { ...labData.ua, glu: e.target.value } })}
                className="w-full border border-slate-300 rounded p-1 text-center font-mono"
              />
            </div>
            <div className="p-2 border border-slate-200 rounded-lg">
              <label className="block text-slate-600 mb-1">RBC / HPF</label>
              <input
                type="text"
                value={labData.ua.rbc}
                onChange={(e) => setLabData({ ...labData, ua: { ...labData.ua, rbc: e.target.value } })}
                className="w-full border border-slate-300 rounded p-1 text-center font-mono"
              />
            </div>
            <div className="p-2 border border-slate-200 rounded-lg">
              <label className="block text-slate-600 mb-1">WBC / HPF</label>
              <input
                type="text"
                value={labData.ua.wbc}
                onChange={(e) => setLabData({ ...labData, ua: { ...labData.ua, wbc: e.target.value } })}
                className="w-full border border-slate-300 rounded p-1 text-center font-mono"
              />
            </div>
            <div className="p-2 border border-slate-200 rounded-lg">
              <label className="block text-slate-600 mb-1">Bacteria</label>
              <input
                type="text"
                value={labData.ua.bact}
                onChange={(e) => setLabData({ ...labData, ua: { ...labData.ua, bact: e.target.value } })}
                className="w-full border border-slate-300 rounded p-1 text-center font-mono"
              />
            </div>
          </div>
        </div>

        {/* BIOCHEMISTRY */}
        <div className="space-y-3">
          <div className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2 text-blue-900">
            ۳. بیوشیمی خون، چربی، کبد، کلیه و سرولوژی
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            <div className="p-2 border border-slate-200 rounded-lg bg-slate-50">
              <label className="block text-slate-700 font-bold mb-1">FBS (قند ناشتا)</label>
              <input
                type="text"
                value={labData.biochemistry.fbs}
                onChange={(e) => handleBioChange('fbs', e.target.value)}
                className="w-full border border-slate-300 rounded p-1 text-center font-mono font-bold"
              />
              <span className="text-[10px] text-slate-400 mt-1 block text-center">70 - 100 mg/dL</span>
            </div>

            <div className="p-2 border border-slate-200 rounded-lg bg-slate-50">
              <label className="block text-slate-700 font-bold mb-1">Total Chol</label>
              <input
                type="text"
                value={labData.biochemistry.chol}
                onChange={(e) => handleBioChange('chol', e.target.value)}
                className="w-full border border-slate-300 rounded p-1 text-center font-mono font-bold"
              />
              <span className="text-[10px] text-slate-400 mt-1 block text-center">&lt; 200 mg/dL</span>
            </div>

            <div className="p-2 border border-slate-200 rounded-lg bg-slate-50">
              <label className="block text-slate-700 font-bold mb-1">TG (تری‌گلیسرید)</label>
              <input
                type="text"
                value={labData.biochemistry.tg}
                onChange={(e) => handleBioChange('tg', e.target.value)}
                className="w-full border border-slate-300 rounded p-1 text-center font-mono"
              />
              <span className="text-[10px] text-slate-400 mt-1 block text-center">&lt; 150 mg/dL</span>
            </div>

            <div className="p-2 border border-slate-200 rounded-lg bg-slate-50">
              <label className="block text-slate-700 font-bold mb-1">BUN</label>
              <input
                type="text"
                value={labData.biochemistry.bun}
                onChange={(e) => handleBioChange('bun', e.target.value)}
                className="w-full border border-slate-300 rounded p-1 text-center font-mono"
              />
              <span className="text-[10px] text-slate-400 mt-1 block text-center">7 - 20 mg/dL</span>
            </div>

            <div className="p-2 border border-slate-200 rounded-lg bg-slate-50">
              <label className="block text-slate-700 font-bold mb-1">Cr (کراتینین)</label>
              <input
                type="text"
                value={labData.biochemistry.cr}
                onChange={(e) => handleBioChange('cr', e.target.value)}
                className="w-full border border-slate-300 rounded p-1 text-center font-mono font-bold"
              />
              <span className="text-[10px] text-slate-400 mt-1 block text-center">0.7 - 1.3 mg/dL</span>
            </div>

            <div className="p-2 border border-slate-200 rounded-lg bg-slate-50">
              <label className="block text-slate-700 font-bold mb-1">ALT (SGPT)</label>
              <input
                type="text"
                value={labData.biochemistry.alt}
                onChange={(e) => handleBioChange('alt', e.target.value)}
                className="w-full border border-slate-300 rounded p-1 text-center font-mono"
              />
              <span className="text-[10px] text-slate-400 mt-1 block text-center">&lt; 41 U/L</span>
            </div>

            <div className="p-2 border border-slate-200 rounded-lg bg-slate-50">
              <label className="block text-slate-700 font-bold mb-1">AST (SGOT)</label>
              <input
                type="text"
                value={labData.biochemistry.ast}
                onChange={(e) => handleBioChange('ast', e.target.value)}
                className="w-full border border-slate-300 rounded p-1 text-center font-mono"
              />
              <span className="text-[10px] text-slate-400 mt-1 block text-center">&lt; 38 U/L</span>
            </div>
          </div>
        </div>

        {/* Specialized Occupational Tests */}
        <div className="space-y-3">
          <div className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2 text-blue-900">
            ۴. بیومارکرهای شغلی و تست‌های تکمیلی
          </div>
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-center justify-between">
            <div>
              <span className="font-bold text-amber-900">سرب خون (Blood Lead Level / BLL):</span>
              <span className="text-slate-700 mr-2">14 mcg/dL (حد مجاز مواجهه شغلی: کمتر از 30 mcg/dL)</span>
            </div>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] px-2 py-0.5 rounded font-bold">
              در محدوده ایمن
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
