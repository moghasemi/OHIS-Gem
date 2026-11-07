import React, { useState } from 'react';
import { Settings, Save, CheckCircle2, Building, Clock, Printer } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const [centerName, setCenterName] = useState('مرکز تخصصی طب کار و سلامت شغلی البرز');
  const [centerCode, setCenterCode] = useState('OHIS-1405-TEH-01');
  const [phone, setPhone] = useState('۰۲۱-۴۴۳۳۲۲۱۱');
  const [address, setAddress] = useState('تهران، جاده مخصوص کرج، جنب شهرک سینمایی، مجتمع پزشکی سلامت');
  const [workStart, setWorkStart] = useState('07:30');
  const [workEnd, setWorkEnd] = useState('16:00');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto text-xs">
      {/* Header Banner */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center font-bold">
          <Settings className="w-5 h-5" />
        </div>
        <div>
          <div className="font-bold text-slate-900 text-sm">
            تنظیمات اختصاصی مرکز طب کار
          </div>
          <div className="text-xs text-slate-500 mt-0.5">
            پیکربندی سربرگ، ساعات کاری، الگوی چاپ رسمی ۵ صفحه‌ای و پارامترهای پایگاه داده
          </div>
        </div>
      </div>

      {isSaved && (
        <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>تنظیمات مرکز با موفقیت ذخیره شد.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs space-y-4">
        <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2 flex items-center gap-2">
          <Building className="w-4 h-4 text-blue-600" />
          <span>مشخصات هویتی و ثبتی مرکز</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-700 font-bold mb-1">نام رسمی مرکز طب کار</label>
            <input
              type="text"
              value={centerName}
              onChange={(e) => setCenterName(e.target.value)}
              className="w-full border border-slate-300 rounded-lg p-2 font-bold text-slate-800"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1">کد اختصاصی مرکز در وزارت بهداشت</label>
            <input
              type="text"
              value={centerCode}
              onChange={(e) => setCenterCode(e.target.value)}
              className="w-full border border-slate-300 rounded-lg p-2 font-mono"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1">تلفن تماس مرکز</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border border-slate-300 rounded-lg p-2 font-mono"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1">آدرس پستی مرکز</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border border-slate-300 rounded-lg p-2"
            />
          </div>
        </div>

        <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pt-4 pb-2 flex items-center gap-2">
          <Clock className="w-4 h-4 text-blue-600" />
          <span>ساعات پذیرش و شیفت‌های کاری</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-700 font-bold mb-1">ساعت شروع پذیرش</label>
            <input
              type="time"
              value={workStart}
              onChange={(e) => setWorkStart(e.target.value)}
              className="w-full border border-slate-300 rounded-lg p-2 font-mono"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1">ساعت پایان پذیرش</label>
            <input
              type="time"
              value={workEnd}
              onChange={(e) => setWorkEnd(e.target.value)}
              className="w-full border border-slate-300 rounded-lg p-2 font-mono"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-bold shadow transition"
          >
            <Save className="w-4 h-4" />
            <span>ذخیره تنظیمات</span>
          </button>
        </div>
      </form>
    </div>
  );
};
