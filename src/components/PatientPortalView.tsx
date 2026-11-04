import React, { useState } from 'react';
import { Patient } from '../types/index.ts';
import { CalendarCheck, Clock, CheckCircle2, FileText, Download, ShieldCheck, User } from 'lucide-react';

interface Props {
  patient: Patient;
  onOpenOfficialForm: (patient: Patient) => void;
}

export const PatientPortalView: React.FC<Props> = ({ patient, onOpenOfficialForm }) => {
  const [bookingDate, setBookingDate] = useState('۱۴۰۵/۰۴/۱۰');
  const [bookingShift, setBookingShift] = useState('صبح (۸:۰۰ الی ۱۱:۰۰)');
  const [bookingType, setBookingType] = useState('معاینات دوره‌ای سالانه');
  const [bookedSuccess, setBookedSuccess] = useState(false);

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    setBookedSuccess(true);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header Profile Card */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 rounded-2xl p-6 text-white shadow-md flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/20 flex items-center justify-center text-2xl font-black">
            👤
          </div>
          <div>
            <div className="text-xl font-bold">{patient.firstName} {patient.lastName}</div>
            <div className="text-xs text-blue-200 mt-1">
              کد ملی: <span className="font-mono">{patient.nationalId}</span> | شماره پرونده سلامت: <span className="font-mono">{patient.dossierNumber}</span>
            </div>
            <div className="text-xs text-blue-100 mt-0.5">
              شرکت محل اشتغال: {patient.companyName} ({patient.jobTitle})
            </div>
          </div>
        </div>

        <div>
          <button
            onClick={() => onOpenOfficialForm(patient)}
            className="bg-white text-blue-900 hover:bg-blue-50 px-4 py-2 rounded-xl text-xs font-bold shadow transition flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>مشاهده و دانلود کارنامه سلامت شغلی</span>
          </button>
        </div>
      </div>

      {/* Online Appointment Booking Card */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <CalendarCheck className="w-5 h-5 text-blue-600" />
            <span>رزرو آنلاین نوبت معاینات طب کار (Online Appointment)</span>
          </h3>
          <span className="text-xs text-slate-500">پذیرش سریع بدون صف انتظار</span>
        </div>

        {bookedSuccess ? (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2 text-xs text-emerald-900 font-bold">
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>نوبت شما با موفقیت در سامانه نوبت‌دهی مرکزی ثبت شد!</span>
            </div>
            <p>تاریخ رزرو: {bookingDate} — نوبت: {bookingShift}</p>
            <p className="text-slate-600 font-normal">کد رهگیری پیامکی به شماره {patient.mobile} ارسال گردید. لطفا ناشتا مراجعه فرمایید.</p>
          </div>
        ) : (
          <form onSubmit={handleBook} className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block text-slate-700 font-bold mb-1">تاریخ مراجعه مورد نظر</label>
              <input
                type="text"
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                className="w-full border border-slate-300 rounded-lg p-2 font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">بازه زمانی ترجیحی</label>
              <select
                value={bookingShift}
                onChange={(e) => setBookingShift(e.target.value)}
                className="w-full border border-slate-300 rounded-lg p-2"
              >
                <option value="صبح (۸:۰۰ الی ۱۱:۰۰)">صبح (۸:۰۰ الی ۱۱:۰۰) — پذیرش ناشتا</option>
                <option value="ظهر (۱۱:۰۰ الی ۱۳:۰۰)">ظهر (۱۱:۰۰ الی ۱۳:۰۰)</option>
                <option value="عصر (۱۴:۰۰ الی ۱۷:۰۰)">عصر (۱۴:۰۰ الی ۱۷:۰۰)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">هدف از معاینه</label>
              <select
                value={bookingType}
                onChange={(e) => setBookingType(e.target.value)}
                className="w-full border border-slate-300 rounded-lg p-2 font-bold"
              >
                <option value="معاینات دوره‌ای سالانه">معاینات دوره‌ای سالانه</option>
                <option value="معاینات بدواستخدام">معاینات بدواستخدام</option>
                <option value="معاینات بازگشت به کار">معاینات بازگشت به کار پس از مرخصی استعلاجی</option>
              </select>
            </div>

            <div className="sm:col-span-3 pt-2">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl text-xs font-bold shadow transition"
              >
                تایید و ثبت نوبت اینترنتی
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Status of Current Dossier */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs space-y-4">
        <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-3">
          وضعیت کنونی پرونده سلامت شغلی شما در کلینیک
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-center">
            <span className="font-bold text-emerald-900 block">پذیرش و تشکیل پرونده</span>
            <span className="text-emerald-700 text-[10px] mt-1 block">تکمیل شده ✓</span>
          </div>

          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-center">
            <span className="font-bold text-emerald-900 block">آزمایشگاه بیوشیمی و خون</span>
            <span className="text-emerald-700 text-[10px] mt-1 block">پاسخ آماده ✓</span>
          </div>

          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-center">
            <span className="font-bold text-emerald-900 block">شنوایی و اسپیرومتری</span>
            <span className="text-emerald-700 text-[10px] mt-1 block">تست انجام شد ✓</span>
          </div>

          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-center">
            <span className="font-bold text-blue-900 block">نظریه پزشک طب کار</span>
            <span className="text-blue-700 text-[10px] mt-1 block font-bold">
              {patient.doctorDecision ? 'ثبت شده (مشروط)' : 'در انتظار ویزیت'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
