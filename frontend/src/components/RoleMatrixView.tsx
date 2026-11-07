import React, { useState } from 'react';
import { UserRole, ROLE_PERMISSIONS } from '../domain/rules.ts';
import {
  Grid3X3,
  ShieldCheck,
  Check,
  X,
  RotateCcw,
  Save,
  CheckCheck,
  XCircle,
  Search,
  Sliders,
  AlertCircle,
} from 'lucide-react';

interface Props {
  matrix: Record<UserRole, string[]>;
  onUpdateMatrix: (newMatrix: Record<UserRole, string[]>) => void;
}

export const RoleMatrixView: React.FC<Props> = ({ matrix, onUpdateMatrix }) => {
  const [localMatrix, setLocalMatrix] = useState<Record<UserRole, string[]>>(matrix);
  const [searchModule, setSearchModule] = useState('');
  const [saveBanner, setSaveBanner] = useState<string | null>(null);

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

  const filteredModules = MODULES.filter((m) => m.name.includes(searchModule) || m.id.includes(searchModule));

  // Toggle single cell
  const handleToggleCell = (roleId: UserRole, moduleId: string) => {
    const currentList = localMatrix[roleId] || [];
    const hasAccess = currentList.includes(moduleId);
    const updated = hasAccess ? currentList.filter((m) => m !== moduleId) : [...currentList, moduleId];

    const next = { ...localMatrix, [roleId]: updated };
    setLocalMatrix(next);
    onUpdateMatrix(next);
  };

  // Grant all modules to role
  const handleGrantAll = (roleId: UserRole) => {
    const allModuleIds = MODULES.map((m) => m.id);
    const next = { ...localMatrix, [roleId]: allModuleIds };
    setLocalMatrix(next);
    onUpdateMatrix(next);
    setSaveBanner(`تمام دسترسی‌ها به نقش «${ROLES.find((r) => r.id === roleId)?.title}» اعطا گردید.`);
  };

  // Revoke all modules from role (except dashboard)
  const handleRevokeAll = (roleId: UserRole) => {
    const next = { ...localMatrix, [roleId]: ['dashboard'] };
    setLocalMatrix(next);
    onUpdateMatrix(next);
    setSaveBanner(`دسترسی‌های نقش «${ROLES.find((r) => r.id === roleId)?.title}» سلب شد (فقط داشبورد).`);
  };

  // Reset to Ministry of Health defaults
  const handleResetDefaults = () => {
    setLocalMatrix(ROLE_PERMISSIONS);
    onUpdateMatrix(ROLE_PERMISSIONS);
    setSaveBanner('ماتریس دسترسی‌ها به مقادیر پیش‌فرض استاندارد وزارت بهداشت بازنشانی گردید.');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
            <Grid3X3 className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <span>ماتریس پویای دسترسی نقش‌ها (Interactive RBAC Matrix)</span>
              <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded">
                قابلیت ویرایش آنی فعال است
              </span>
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              روی هر خانه کلیک کنید تا دسترسی فوراً تغییر کند. تغییرات بلافاصله بر روی منوی سایدبار و کاربران اعمال می‌شود.
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleResetDefaults}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-bold transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>بازنشانی به پیش‌فرض قانونی</span>
          </button>
        </div>
      </div>

      {saveBanner && (
        <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold animate-in fade-in flex items-center justify-between">
          <span>{saveBanner}</span>
          <button onClick={() => setSaveBanner(null)} className="text-emerald-700 font-black">
            ✕
          </button>
        </div>
      )}

      {/* Search & Help Bar */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <div className="relative">
            <input
              type="text"
              placeholder="فیلتر نام زیرسیستم یا ماژول..."
              value={searchModule}
              onChange={(e) => setSearchModule(e.target.value)}
              className="border border-slate-300 rounded-lg pr-8 pl-3 py-1.5 text-xs w-64 focus:ring-2 focus:ring-indigo-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute right-2.5 top-2" />
          </div>
          <span className="text-slate-400 text-[11px]">
            نمایش {filteredModules.length} از {MODULES.length} ماژول
          </span>
        </div>

        <div className="flex items-center gap-4 text-[11px] text-slate-600">
          <span className="flex items-center gap-1">
            <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-black">
              ✓
            </span>
            <span>دسترسی مجاز (کلیک جهت سلب)</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center font-black">
              ✕
            </span>
            <span>عدم دسترسی (کلیک جهت اعطا)</span>
          </span>
        </div>
      </div>

      {/* Matrix Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3 border-l border-slate-200 min-w-[220px]">ماژول / زیرسیستم</th>
                {ROLES.map((role) => (
                  <th key={role.id} className="p-3 text-center border-l border-slate-200 last:border-none min-w-[110px]">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold block mb-1.5 ${role.color}`}>
                      {role.title}
                    </span>
                    <div className="flex items-center justify-center gap-1">
                      <button
                        title="اعطای دسترسی به تمام ماژول‌ها"
                        onClick={() => handleGrantAll(role.id)}
                        className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition"
                      >
                        همه +
                      </button>
                      <button
                        title="سلب دسترسی‌ها"
                        onClick={() => handleRevokeAll(role.id)}
                        className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 transition"
                      >
                        سلب -
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredModules.map((mod) => (
                <tr key={mod.id} className="hover:bg-slate-50 transition">
                  <td className="p-3 font-semibold text-slate-900 border-l border-slate-200">
                    <div>{mod.name}</div>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">{mod.id}</div>
                  </td>
                  {ROLES.map((role) => {
                    const hasAccess = (localMatrix[role.id] || []).includes(mod.id);
                    return (
                      <td
                        key={role.id}
                        className={`p-2 text-center border-l border-slate-200 last:border-none transition ${
                          hasAccess ? 'bg-emerald-50/30' : 'bg-slate-50/20'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => handleToggleCell(role.id, mod.id)}
                          className={`inline-flex items-center justify-center w-7 h-7 rounded-xl font-bold transition transform active:scale-90 ${
                            hasAccess
                              ? 'bg-emerald-500 text-white shadow-xs hover:bg-rose-600 hover:text-white'
                              : 'bg-slate-100 text-slate-400 hover:bg-emerald-100 hover:text-emerald-700'
                          }`}
                          title={hasAccess ? 'کلیک جهت سلب دسترسی' : 'کلیک جهت اعطای دسترسی'}
                        >
                          {hasAccess ? <Check className="w-4 h-4" /> : <X className="w-3.5 h-3.5" />}
                        </button>
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
