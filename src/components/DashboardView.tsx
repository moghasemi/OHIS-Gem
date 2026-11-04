import React from 'react';
import { Patient } from '../types/index.ts';
import {
  Users,
  FileCheck,
  Stethoscope,
  AlertTriangle,
  Clock,
  TrendingUp,
  FlaskConical,
  Eye,
  ArrowUpRight,
  Printer,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

interface Props {
  patients: Patient[];
  onSelectPatient: (patient: Patient) => void;
  onNavigateTab: (tabId: string) => void;
  onOpenOfficialForm: (patient: Patient) => void;
}

export const DashboardView: React.FC<Props> = ({
  patients,
  onSelectPatient,
  onNavigateTab,
  onOpenOfficialForm,
}) => {
  const totalCount = 145;
  const completedCount = 92;
  const inProgressCount = 48;
  const unfitCount = 5;

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-l from-blue-700 via-indigo-700 to-slate-900 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 bg-blue-500/30 backdrop-blur-xs text-blue-200 text-xs px-3 py-1 rounded-full font-medium mb-3 border border-blue-400/20">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>سامانه سلامت شغلی و مدیریت پرونده‌های الکترونیک طب کار</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            میز کار یکپارچه مرکز طب کار و بهداشت حرفه‌ای
          </h1>
          <p className="mt-2 text-blue-100 text-xs sm:text-sm leading-relaxed">
            گردش کار پیوسته از پذیرش، آزمایشگاه، پاراکلینیک، ارزیابی HSE، تا معاینات بالینی، ثبت نظر نهایی پزشک، قفل پرونده و خروجی رسمی ۵ صفحه‌ای وزارت بهداشت.
          </p>
          <div className="mt-4 flex flex-wrap gap-2.5">
            <button
              onClick={() => onNavigateTab('reception')}
              className="bg-white text-blue-900 hover:bg-blue-50 px-4 py-2 rounded-xl text-xs font-bold shadow transition flex items-center gap-1.5"
            >
              <span>➕ پذیرش شاغل جدید</span>
            </button>
            <button
              onClick={() => onNavigateTab('doctor')}
              className="bg-blue-600/80 hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold border border-blue-400/30 transition flex items-center gap-1.5"
            >
              <Stethoscope className="w-4 h-4" />
              <span>صف معاینات پزشک</span>
            </button>
            <button
              onClick={() => onNavigateTab('backend-hub')}
              className="bg-indigo-900/60 hover:bg-indigo-900 text-indigo-200 px-4 py-2 rounded-xl text-xs font-bold border border-indigo-400/30 transition flex items-center gap-1.5"
            >
              <span>⚙️ مستندات جنگو و داکر</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>کل مراجعین سال جاری</span>
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-800">{totalCount}</span>
            <span className="text-xs text-emerald-600 font-bold flex items-center">
              <TrendingUp className="w-3 h-3 inline ml-0.5" />
              +۱۴٪
            </span>
          </div>
          <div className="mt-2 pt-2 border-t border-slate-100 flex justify-between text-[11px] text-slate-500">
            <span>امروز: ۴ نفر</span>
            <span>ماه جاری: ۳۸ نفر</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>پرونده‌های فعال در چرخه</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-amber-600">{inProgressCount}</span>
            <span className="text-xs text-slate-500">پرونده در صف</span>
          </div>
          <div className="mt-2 pt-2 border-t border-slate-100 flex justify-between text-[11px] text-slate-500">
            <span>آزمایشگاه: ۸</span>
            <span>پاراکلینیک: ۱۲</span>
            <span>پزشک: ۱۸</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>پرونده‌های نهایی و قفل شده</span>
            <FileCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-emerald-600">{completedCount}</span>
            <span className="text-xs text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-bold">
              ۶۳٪ تکمیل
            </span>
          </div>
          <div className="mt-2 pt-2 border-t border-slate-100 flex justify-between text-[11px] text-slate-500">
            <span>بلامانع: ۷۸</span>
            <span>مشروط: ۱۴</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>عدم صلاحیت یا ارجاع باز</span>
            <AlertTriangle className="w-4 h-4 text-rose-600" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-rose-600">{unfitCount}</span>
            <span className="text-xs text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded font-bold">
              ۳.۴٪ موارد
            </span>
          </div>
          <div className="mt-2 pt-2 border-t border-slate-100 flex justify-between text-[11px] text-slate-500">
            <span>عدم صلاحیت: ۲</span>
            <span>ارجاع تخصصی معلق: ۳</span>
          </div>
        </div>
      </div>

      {/* Workflow Stages Roadmap */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-slate-800 text-sm flex items-center gap-2">
            <span>🔄 وضعیت زنجیره فرآیندهای بالینی طب کار (Workflow Pipeline)</span>
          </h2>
          <span className="text-xs text-slate-500">طبق استاندارد پروتکل ملی سلامت شغلی</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { step: '۱. پذیرش', desc: 'مشخصات، پکیج، سوابق ۴ و ۱', tab: 'reception', count: '۳ شاغل', color: 'border-blue-300 bg-blue-50/50' },
            { step: '۲. آزمایشگاه', desc: 'جدول ۶ (CBC, بیوشیمی، ادرار)', tab: 'lab', count: '۵ نمونه', color: 'border-emerald-300 bg-emerald-50/50' },
            { step: '۳. پاراکلینیک', desc: 'جدول ۷ (شنوایی، ریه، بینایی)', tab: 'para', count: '۷ تست', color: 'border-cyan-300 bg-cyan-50/50' },
            { step: '۴. بهداشت HSE', desc: 'جدول ۳ (مخاطرات ۵ گانه)', tab: 'hse', count: '۴ بررسی', color: 'border-amber-300 bg-amber-50/50' },
            { step: '۵. پزشک طب کار', desc: 'جداول ۵ و ۸ (معاینات و ارجاع)', tab: 'doctor', count: '۹ در انتظار', color: 'border-indigo-300 bg-indigo-50/50' },
            { step: '۶. تایید و قفل', desc: 'جدول ۹ و چاپ ۵ صفحه‌ای', tab: 'official-form', count: '۹۲ قفل', color: 'border-slate-300 bg-slate-50/50' },
          ].map((s, idx) => (
            <div
              key={idx}
              onClick={() => onNavigateTab(s.tab)}
              className={`p-3 rounded-xl border text-right cursor-pointer hover:shadow-md transition ${s.color}`}
            >
              <div className="font-bold text-xs text-slate-900">{s.step}</div>
              <div className="text-[10px] text-slate-600 mt-1">{s.desc}</div>
              <div className="mt-2 text-xs font-black text-blue-700 flex items-center justify-between">
                <span>{s.count}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Patient Queue & Clinical Cases Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-bold text-slate-800 text-sm">لیست پرونده‌های جاری مرکز</h2>
            <p className="text-xs text-slate-500 mt-0.5">برای مشاهده یا ویرایش هر پرونده روی دکمه عملیات کلیک کنید</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onNavigateTab('reception')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition"
            >
              ثبت شاغل جدید
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
              <tr>
                <th className="p-3">شماره پرونده</th>
                <th className="p-3">نام و نام خانوادگی</th>
                <th className="p-3">کد ملی</th>
                <th className="p-3">شرکت / کارفرما</th>
                <th className="p-3">نوع معاینه</th>
                <th className="p-3">وضعیت گردش کار</th>
                <th className="p-3">نظر نهایی پزشک</th>
                <th className="p-3 text-center">عملیات بالینی</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {patients.map((p) => {
                const isLocked = p.isLocked;
                return (
                  <tr key={p.id} className="hover:bg-slate-50/70 transition">
                    <td className="p-3 font-mono font-bold text-blue-700">{p.dossierNumber}</td>
                    <td className="p-3 font-semibold text-slate-900">{p.firstName} {p.lastName}</td>
                    <td className="p-3 font-mono text-slate-600">{p.nationalId}</td>
                    <td className="p-3 text-slate-700">{p.companyName}</td>
                    <td className="p-3">
                      <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px] font-medium">
                        {p.examinationType}
                      </span>
                    </td>
                    <td className="p-3">
                      {isLocked ? (
                        <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full text-[11px] font-bold">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>تکمیل و قفل شده</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full text-[11px] font-bold">
                          <Clock className="w-3 h-3" />
                          <span>در حال انجام</span>
                        </span>
                      )}
                    </td>
                    <td className="p-3">
                      {p.doctorDecision ? (
                        <span
                          className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                            p.doctorDecision.opinion === 'balamaneh'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : p.doctorDecision.opinion === 'mashroot'
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : 'bg-rose-50 text-rose-700 border border-rose-200'
                          }`}
                        >
                          {p.doctorDecision.opinion === 'balamaneh' && 'الف- بلامانع'}
                          {p.doctorDecision.opinion === 'mashroot' && 'ب- مشروط'}
                          {p.doctorDecision.opinion === 'adam_salahiyat' && 'ج- عدم صلاحیت'}
                        </span>
                      ) : (
                        <span className="text-slate-400 italic text-[11px]">در انتظار معاینه</span>
                      )}
                    </td>
                    <td className="p-3 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => {
                            onSelectPatient(p);
                            onOpenOfficialForm(p);
                          }}
                          className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 p-1.5 rounded-lg border border-emerald-200 transition"
                          title="چاپ فرم رسمی ۵ صفحه‌ای وزارت بهداشت"
                        >
                          <Printer className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            onSelectPatient(p);
                            onNavigateTab('doctor');
                          }}
                          className="bg-blue-50 hover:bg-blue-100 text-blue-700 px-2.5 py-1 rounded-lg border border-blue-200 font-bold transition text-[11px]"
                        >
                          ورود به پرونده
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
