import React from 'react';
import { UserRole, ROLE_PERMISSIONS } from '../domain/rules.ts';
import { Grid3X3, ShieldCheck, Check, X } from 'lucide-react';

export const RoleMatrixView: React.FC = () => {
  const ROLES: { id: UserRole; title: string; color: string }[] = [
    { id: 'reception', title: 'کارشناس پذیرش', color: 'bg-blue-100 text-blue-800' },
    { id: 'lab', title: 'تکنسین آزمایشگاه', color: 'bg-emerald-100 text-emerald-800' },
    { id: 'para', title: 'تکنسین پاراکلینیک', color: 'bg-cyan-100 text-cyan-800' },
    { id: 'hse', title: 'کارشناس HSE', color: 'bg-amber-100 text-amber-800' },
    { id: 'doctor', title: 'پزشک متخصص طب کار', color: 'bg-indigo-100 text-indigo-800' },
    { id: 'org', title: 'نماینده کارفرما / سازمان', color: 'bg-purple-100 text-purple-800' },
    { id: 'clinic_admin', title: 'مدیر مرکز طب کار', color: 'bg-rose-100 text-rose-800' },
    { id: 'superadmin', title: 'مدیر ارشد پلتفرم', color: 'bg-slate-800 text-white' },
  ];

  const MODULES = [
    { id: 'dashboard', name: 'داشبورد سلامت شغلی' },
    { id: 'reception', name: 'پذیرش و تشکیل پرونده (جداول ۱، ۲، ۴)' },
    { id: 'lab', name: 'آزمایشگاه بیوشیمی و خون (جدول ۶)' },
    { id: 'para', name: 'پاراکلینیک: شنوایی، ریه، بینایی (جدول ۷)' },
    { id: 'hse', name: 'بهداشت حرفه‌ای و مخاطرات ۵گانه (جدول ۳)' },
    { id: 'doctor', name: 'پزشک طب کار: معاینه، ارجاع، نظر و قفل (۵، ۸، ۹)' },
    { id: 'official-form', name: 'فرم ۵ صفحه‌ای رسمی وزارت بهداشت' },
    { id: 'org', name: 'پرتال کارفرما، قراردادها و ورود اکسل' },
    { id: 'staff', name: 'پرسنل و کادر درمان مرکز (پزشکان و کارشناسان)' },
    { id: 'self', name: 'پرتال مراجعه‌کننده و نوبت اینترنتی' },
    { id: 'finance', name: 'صندوق مالی، کارتخوان POS و گزارشات' },
    { id: 'tickets', name: 'سیستم تیکتینگ و پشتیبانی' },
    { id: 'calendar', name: 'تقویم نوبت‌دهی و زمان‌بندی' },
    { id: 'role-matrix', name: 'ماتریس دسترسی نقش‌ها' },
    { id: 'backend-hub', name: 'هاب معماری Django، PostgreSQL و داکر' },
    { id: 'settings', name: 'تنظیمات کلینیک و مرکز' },
    { id: 'superadmin', name: 'مدیریت کلان پلتفرم و مستأجرین' },
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center font-bold">
          <Grid3X3 className="w-5 h-5" />
        </div>
        <div>
          <div className="font-bold text-slate-900 text-sm">
            ماتریس دسترسی نقش‌ها (RBAC Security & Authorization Matrix)
          </div>
          <div className="text-xs text-slate-500 mt-0.5">
            اعمال تفکیک وظایف بر اساس اصل Least Privilege و استانداردهای حریم خصوصی پرونده‌های پزشکی
          </div>
        </div>
      </div>

      {/* Matrix Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3 border-l border-slate-200 min-w-[200px]">ماژول / زیرسیستم</th>
                {ROLES.map((role) => (
                  <th key={role.id} className="p-3 text-center border-l border-slate-200 last:border-none min-w-[100px]">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold block ${role.color}`}>
                      {role.title}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MODULES.map((mod) => (
                <tr key={mod.id} className="hover:bg-slate-50 transition">
                  <td className="p-3 font-semibold text-slate-900 border-l border-slate-200">
                    {mod.name}
                  </td>
                  {ROLES.map((role) => {
                    const hasAccess = (ROLE_PERMISSIONS[role.id] || []).includes(mod.id);
                    return (
                      <td
                        key={role.id}
                        className={`p-3 text-center border-l border-slate-200 last:border-none ${
                          hasAccess ? 'bg-emerald-50/40' : 'bg-slate-50/30'
                        }`}
                      >
                        {hasAccess ? (
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs">
                            <Check className="w-3.5 h-3.5" />
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-slate-400 text-xs">
                            <X className="w-3 h-3" />
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
