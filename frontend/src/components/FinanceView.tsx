import React from 'react';
import { Patient } from '../types/index.ts';
import { Receipt, TrendingUp, CreditCard, DollarSign, Download, Filter } from 'lucide-react';

interface Props {
  patients: Patient[];
}

export const FinanceView: React.FC<Props> = ({ patients }) => {
  const totalRevenue = 485000000;
  const posRevenue = 295000000;
  const corporateInvoices = 190000000;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <Receipt className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-slate-900 text-sm">
              گزارشات مالی، صندوق، تراکنش‌های POS و صورتحساب‌های شرکتی
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              گردش مالی یکپارچه متصل به پذیرش و قراردادهای سازمانی
            </div>
          </div>
        </div>

        <button
          onClick={() => alert('خروجی اکسل گردش وجوه صندوق طب کار صادر شد.')}
          className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-2 rounded-lg text-xs font-bold transition shadow"
        >
          <Download className="w-4 h-4" />
          <span>خروجی اکسل مالی</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-bold block mb-1">کل درآمد سال جاری</span>
          <div className="text-2xl font-black text-slate-900">
            {totalRevenue.toLocaleString('fa-IR')} <span className="text-xs font-normal text-slate-500">ریال</span>
          </div>
          <div className="text-xs text-emerald-600 font-bold mt-2 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+۲۲٪ رشد نسبت به سال گذشته</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-bold block mb-1">پرداخت‌های نقدی و کارتخوان (POS)</span>
          <div className="text-2xl font-black text-blue-700">
            {posRevenue.toLocaleString('fa-IR')} <span className="text-xs font-normal text-slate-500">ریال</span>
          </div>
          <div className="text-xs text-slate-500 mt-2">تسویه آنی متصل به شبای مرکز</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-bold block mb-1">مطالبات قراردادهای شرکتی</span>
          <div className="text-2xl font-black text-indigo-700">
            {corporateInvoices.toLocaleString('fa-IR')} <span className="text-xs font-normal text-slate-500">ریال</span>
          </div>
          <div className="text-xs text-slate-500 mt-2">۳ شرکت طرف قرارداد</div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 font-bold text-slate-900 text-sm">
          ریز تراکنش‌های اخیر صندوق و کارتخوان
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3">شماره پیگیری</th>
                <th className="p-3">شاغل / شرکت</th>
                <th className="p-3">پکیج خدمات</th>
                <th className="p-3">مبلغ (ریال)</th>
                <th className="p-3">روش پرداخت</th>
                <th className="p-3">تاریخ و ساعت</th>
                <th className="p-3">وضعیت</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {patients.map((p, idx) => (
                <tr key={p.id} className="hover:bg-slate-50">
                  <td className="p-3 font-mono font-bold text-blue-700">{p.transactionCode || `TXN-1405-0${idx + 1}`}</td>
                  <td className="p-3 font-semibold text-slate-900">{p.firstName} {p.lastName} ({p.companyName})</td>
                  <td className="p-3 text-slate-700">{p.packageName}</td>
                  <td className="p-3 font-bold font-mono text-slate-900">{p.packagePrice.toLocaleString('fa-IR')}</td>
                  <td className="p-3">
                    <span className="bg-slate-100 px-2 py-0.5 rounded text-[11px] font-medium">
                      {p.paymentStatus === 'CORPORATE_INVOICE' ? 'حساب اعتباری شرکت' : 'کارتخوان POS'}
                    </span>
                  </td>
                  <td className="p-3 font-mono text-slate-500">{p.examinationDate} ۱۰:۳۰</td>
                  <td className="p-3">
                    <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[11px] font-bold">
                      موفق
                    </span>
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
