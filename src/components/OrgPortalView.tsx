import React, { useState } from 'react';
import { CompanyContract, Patient } from '../types/index.ts';
import { CONTRACTS_DATA } from '../data/mockData.ts';
import { Building2, FileSpreadsheet, Users, Calendar, CheckCircle2, Upload, Search, Download } from 'lucide-react';

interface Props {
  patients: Patient[];
}

export const OrgPortalView: React.FC<Props> = ({ patients }) => {
  const [contracts, setContracts] = useState<CompanyContract[]>(CONTRACTS_DATA);
  const [selectedContract, setSelectedContract] = useState<CompanyContract>(CONTRACTS_DATA[0]);
  const [searchRoster, setSearchRoster] = useState('');
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  const handleSimulateExcelUpload = () => {
    setUploadStatus('در حال پردازش فایل اکسل پرسنلی ( اعتبارسنجی کد ملی، شماره پرسنلی، تاریخ تولد)...');
    setTimeout(() => {
      setUploadStatus('✅ فایل با موفقیت پردازش شد: ۲۴ پرسنل جدید به لیست معاینات دوره‌ای ۱۴۰۵ اضافه شدند.');
    }, 1500);
  };

  const companyEmployees = patients.filter((p) => p.companyName === selectedContract.companyName);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-slate-900 text-sm">
              پرتال سازمانی کارفرما — مدیریت قراردادها و سلامت پرسنل
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              شرکت طرف قرارداد: {selectedContract.companyName} | کد قرارداد: {selectedContract.code}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSimulateExcelUpload}
            className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2 rounded-lg text-xs font-bold shadow transition"
          >
            <Upload className="w-4 h-4" />
            <span>بارگذاری اکسل پرسنلی (Bulk Excel)</span>
          </button>
        </div>
      </div>

      {uploadStatus && (
        <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold animate-in fade-in">
          {uploadStatus}
        </div>
      )}

      {/* Contract Details & Progress */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2 text-xs">
          <span className="font-bold text-slate-500">مشخصات قرارداد جاری</span>
          <div className="text-base font-extrabold text-slate-900">{selectedContract.companyName}</div>
          <div className="text-slate-600">پکیج توافق شده: {selectedContract.packageType}</div>
          <div className="text-slate-500 pt-2 border-t border-slate-100 flex justify-between">
            <span>مدت اعتبار: {selectedContract.startDate} تا {selectedContract.endDate}</span>
            <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">فعال</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2 text-xs">
          <span className="font-bold text-slate-500">پیشرفت انجام معاینات پرسنل</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-blue-700">
              {selectedContract.completedCount} / {selectedContract.employeeCount}
            </span>
            <span className="font-bold text-emerald-600">
              {Math.round((selectedContract.completedCount / selectedContract.employeeCount) * 100)}٪ تکمیل
            </span>
          </div>
          {/* Progress Bar */}
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mt-1">
            <div
              className="bg-blue-600 h-full rounded-full transition-all"
              style={{ width: `${(selectedContract.completedCount / selectedContract.employeeCount) * 100}%` }}
            />
          </div>
          <div className="text-[11px] text-slate-400">
            ۴۵ شاغل در صف انجام آزمایشات و پاراکلینیک قرار دارند.
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2 text-xs">
          <span className="font-bold text-slate-500">امور مالی و صورتحساب</span>
          <div className="text-xl font-black text-slate-900">
            {selectedContract.totalAmount.toLocaleString('fa-IR')} <span className="text-xs font-normal text-slate-500">ریال</span>
          </div>
          <div className="text-emerald-700 font-bold flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>تسویه پیش‌پرداخت ۶۰٪ انجام گردیده است</span>
          </div>
          <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-100">
            صورتحساب نهایی پس از اتمام معاینات کل پرسنل صادر خواهد شد.
          </div>
        </div>
      </div>

      {/* Employees Roster */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="font-bold text-slate-900 text-sm">
            فهرست پرسنل معرفی‌شده سازمان جهت معاینات طب کار
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <input
                type="text"
                placeholder="جستجو با نام یا کد ملی..."
                value={searchRoster}
                onChange={(e) => setSearchRoster(e.target.value)}
                className="border border-slate-300 rounded-lg pr-8 pl-3 py-1.5 text-xs w-60"
              />
              <Search className="w-4 h-4 text-slate-400 absolute right-2.5 top-2" />
            </div>
            <button
              onClick={() => alert('دانلود گزارش جامع تناسب شغلی پرسنل در قالب فایل اکسل')}
              className="flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-bold transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>خروجی اکسل</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3">شماره پرسنلی</th>
                <th className="p-3">نام و نام خانوادگی</th>
                <th className="p-3">کد ملی</th>
                <th className="p-3">سمت سازمانی</th>
                <th className="p-3">وضعیت پرونده</th>
                <th className="p-3">نتیجه صلاحیت شغلی</th>
                <th className="p-3">شروط کاری</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {companyEmployees.map((emp) => (
                <tr key={emp.id} className="hover:bg-slate-50">
                  <td className="p-3 font-mono font-bold text-slate-700">EMP-1024</td>
                  <td className="p-3 font-semibold text-slate-900">{emp.firstName} {emp.lastName}</td>
                  <td className="p-3 font-mono text-slate-600">{emp.nationalId}</td>
                  <td className="p-3 text-slate-700">{emp.jobTitle}</td>
                  <td className="p-3">
                    {emp.isLocked ? (
                      <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px] font-bold">
                        تکمیل شده
                      </span>
                    ) : (
                      <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded text-[11px] font-bold">
                        در جریان معاینه
                      </span>
                    )}
                  </td>
                  <td className="p-3">
                    {emp.doctorDecision ? (
                      <span className="font-bold text-blue-700">
                        {emp.doctorDecision.opinion === 'balamaneh' && 'بلامانع'}
                        {emp.doctorDecision.opinion === 'mashroot' && 'مشروط'}
                        {emp.doctorDecision.opinion === 'adam_salahiyat' && 'عدم صلاحیت'}
                      </span>
                    ) : (
                      <span className="text-slate-400 italic">در انتظار</span>
                    )}
                  </td>
                  <td className="p-3 text-slate-600 max-w-xs truncate">
                    {emp.doctorDecision?.conditions || '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
