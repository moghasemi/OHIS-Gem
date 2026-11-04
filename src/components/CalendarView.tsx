import React, { useState } from 'react';
import { Patient } from '../types/index.ts';
import { Calendar, ChevronRight, ChevronLeft, Clock, User } from 'lucide-react';

interface Props {
  patients: Patient[];
  onSelectPatient: (patient: Patient) => void;
  onNavigateTab: (tabId: string) => void;
}

export const CalendarView: React.FC<Props> = ({ patients, onSelectPatient, onNavigateTab }) => {
  const [currentDayOffset, setCurrentDayOffset] = useState(0);

  const DAYS = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه'];
  const HOURS = ['۰۸:۰۰', '۰۹:۰۰', '۱۰:۰۰', '۱۱:۰۰', '۱۲:۰۰', '۱۳:۰۰', '۱۴:۰۰', '۱۵:۰۰', '۱۶:۰۰'];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-slate-900 text-sm">
              تقویم نوبت‌ها و زمان‌بندی معاینات پزشک و ایستگاه‌ها
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              مدیریت هوشمند تداخل، ظرفیت روزانه و پیش‌گیری از ازدحام مراجعین
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentDayOffset((prev) => prev - 1)}
            className="p-1.5 border border-slate-300 rounded-lg hover:bg-slate-100 transition"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <span className="font-bold text-xs text-slate-800 px-2">هفته اول تیرماه ۱۴۰۵</span>
          <button
            onClick={() => setCurrentDayOffset((prev) => prev + 1)}
            className="p-1.5 border border-slate-300 rounded-lg hover:bg-slate-100 transition"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Days Header */}
        <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50 text-center text-xs font-bold divide-x divide-x-reverse divide-slate-200">
          {DAYS.map((d, idx) => (
            <div key={d} className={`p-3 ${idx === 6 ? 'text-rose-600 bg-rose-50/50' : 'text-slate-800'}`}>
              <div>{d}</div>
              <div className="text-[10px] text-slate-400 font-normal mt-0.5">
                {idx === 0 ? '۳۱ خرداد' : `${idx} تیر`}
              </div>
            </div>
          ))}
        </div>

        {/* Time Rows */}
        <div className="divide-y divide-slate-100 text-xs">
          {HOURS.map((hour, hIdx) => (
            <div key={hour} className="grid grid-cols-7 divide-x divide-x-reverse divide-slate-100 min-h-[60px]">
              {DAYS.map((day, dIdx) => {
                // Seed appointments
                const hasAppt1 = dIdx === 0 && hour === '۱۰:۰۰';
                const hasAppt2 = dIdx === 1 && hour === '۰۹:۰۰';
                const hasAppt3 = dIdx === 3 && hour === '۱۱:۰۰';

                return (
                  <div key={day} className="p-1.5 hover:bg-slate-50/60 transition relative">
                    <span className="text-[9px] text-slate-400 font-mono block mb-1">{hour}</span>

                    {hasAppt1 && (
                      <div
                        onClick={() => {
                          onSelectPatient(patients[0]);
                          onNavigateTab('doctor');
                        }}
                        className="bg-blue-100 text-blue-900 border border-blue-300 p-1.5 rounded-lg text-[10px] cursor-pointer hover:shadow transition"
                      >
                        <div className="font-bold truncate">حسن کریمی</div>
                        <div className="text-[9px] text-blue-700">معاینات دوره‌ای پرس</div>
                      </div>
                    )}

                    {hasAppt2 && (
                      <div
                        onClick={() => {
                          onSelectPatient(patients[1]);
                          onNavigateTab('para');
                        }}
                        className="bg-amber-100 text-amber-900 border border-amber-300 p-1.5 rounded-lg text-[10px] cursor-pointer hover:shadow transition"
                      >
                        <div className="font-bold truncate">مهدی رضوانی</div>
                        <div className="text-[9px] text-amber-700">پاراکلینیک / شنوایی</div>
                      </div>
                    )}

                    {hasAppt3 && (
                      <div
                        onClick={() => {
                          onSelectPatient(patients[2]);
                          onNavigateTab('doctor');
                        }}
                        className="bg-emerald-100 text-emerald-900 border border-emerald-300 p-1.5 rounded-lg text-[10px] cursor-pointer hover:shadow transition"
                      >
                        <div className="font-bold truncate">سارا محمدی</div>
                        <div className="text-[9px] text-emerald-700">تکمیل و نظر نهایی</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
