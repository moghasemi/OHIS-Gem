import React, { useState } from 'react';
import { UserRole } from '../domain/rules.ts';
import { Patient } from '../types/index.ts';
import {
  Bell,
  Printer,
  Menu,
  Shield,
  User,
  LogOut,
  FileText,
  Search,
  CheckCircle2,
  Clock,
  Lock,
} from 'lucide-react';

interface Props {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  selectedPatient: Patient;
  patients: Patient[];
  onSelectPatient: (patient: Patient) => void;
  onOpenOfficialForm: () => void;
  onToggleSidebar: () => void;
  currentUser?: { name: string; roleTitle: string; medicalCouncilNumber?: string } | null;
  onLogout?: () => void;
}

const ROLE_LABELS: Record<UserRole, { title: string; color: string; badge: string }> = {
  reception: { title: 'کارشناس پذیرش', color: 'bg-blue-600', badge: 'پذیرش' },
  lab: { title: 'تکنسین آزمایشگاه', color: 'bg-emerald-600', badge: 'آزمایشگاه' },
  para: { title: 'تکنسین پاراکلینیک', color: 'bg-cyan-600', badge: 'پاراکلینیک' },
  hse: { title: 'کارشناس بهداشت حرفه‌ای (HSE)', color: 'bg-amber-600', badge: 'HSE' },
  doctor: { title: 'پزشک متخصص طب کار', color: 'bg-indigo-600', badge: 'پزشک' },
  org: { title: 'نماینده کارفرما / سازمان', color: 'bg-purple-600', badge: 'سازمان' },
  clinic_admin: { title: 'مدیر مرکز طب کار', color: 'bg-rose-600', badge: 'مدیر مرکز' },
  superadmin: { title: 'مدیر کل پلتفرم (SuperAdmin)', color: 'bg-slate-900', badge: 'پلتفرم' },
};

export const Header: React.FC<Props> = ({
  currentRole,
  onRoleChange,
  selectedPatient,
  patients,
  onSelectPatient,
  onOpenOfficialForm,
  onToggleSidebar,
  currentUser,
  onLogout,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'پرونده حسن کریمی آماده بررسی و ثبت نظر نهایی پزشک است.', time: '۱۰ دقیقه قبل', read: false },
    { id: 2, text: 'نتایج آزمایشات خون و ادرار مهدی رضوانی ثبت گردید.', time: '۳۵ دقیقه قبل', read: false },
    { id: 3, text: 'قرارداد شرکت صنایع فلزی البرز با موفقیت تمدید شد.', time: '۲ ساعت قبل', read: true },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  return (
    <header className="no-print bg-white border-b border-slate-200 sticky top-0 z-30 px-4 py-2.5 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Right side: Sidebar toggle, Clinic title & Patient selector */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition"
            title="منوی ناوبری"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xl font-black bg-gradient-to-l from-blue-700 to-indigo-600 bg-clip-text text-transparent">
              OHIS
            </span>
            <span className="hidden sm:inline text-xs font-semibold text-slate-500 border-r border-slate-300 pr-2">
              سامانه سلامت شغلی و طب کار
            </span>
          </div>

          {/* Active Patient Switcher */}
          <div className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200/80 px-2.5 py-1.5 rounded-lg border border-slate-200 transition">
            <User className="w-4 h-4 text-blue-600" />
            <span className="text-xs text-slate-600 hidden md:inline">پرونده فعال:</span>
            <select
              value={selectedPatient.id}
              onChange={(e) => {
                const found = patients.find((p) => p.id === e.target.value);
                if (found) onSelectPatient(found);
              }}
              className="bg-transparent font-bold text-xs text-slate-800 outline-none cursor-pointer"
            >
              {patients.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.firstName} {p.lastName} ({p.dossierNumber})
                </option>
              ))}
            </select>
            {selectedPatient.isLocked && (
              <span className="text-[10px] bg-slate-800 text-white px-1.5 py-0.5 rounded flex items-center gap-0.5" title="پرونده نهایی و قفل شده">
                <Lock className="w-2.5 h-2.5" />
                <span>قفل</span>
              </span>
            )}
          </div>
        </div>

        {/* Center / Left: Official Form shortcut, Role Switcher, Notifications & Profile */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Quick Print Official Ministry of Health Dossier */}
          <button
            onClick={onOpenOfficialForm}
            className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-xs transition transform hover:scale-[1.02]"
            title="مشاهده و چاپ فرم رسمی پرونده پزشکی شاغل (وزارت بهداشت)"
          >
            <Printer className="w-4 h-4" />
            <span>فرم رسمی ۵ صفحه‌ای</span>
          </button>

          {/* Role Switcher (RBAC) */}
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-2 py-1 rounded-lg">
            <Shield className="w-3.5 h-3.5 text-indigo-600" />
            <span className="text-[11px] text-slate-500 hidden lg:inline">نقش جاری:</span>
            <select
              value={currentRole}
              onChange={(e) => onRoleChange(e.target.value as UserRole)}
              className="bg-transparent font-bold text-xs text-slate-800 outline-none cursor-pointer"
            >
              <option value="reception">کارشناس پذیرش</option>
              <option value="lab">تکنسین آزمایشگاه</option>
              <option value="para">تکنسین پاراکلینیک</option>
              <option value="hse">کارشناس HSE بهداشت حرفه‌ای</option>
              <option value="doctor">پزشک متخصص طب کار</option>
              <option value="org">نماینده سازمان / کارفرما</option>
              <option value="clinic_admin">مدیر مرکز طب کار</option>
              <option value="superadmin">مدیر ارشد پلتفرم</option>
            </select>
          </div>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full animate-ping" />
              )}
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full" />
              )}
            </button>

            {showNotifications && (
              <div className="absolute left-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 p-3 text-xs space-y-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="font-bold text-slate-800">اعلان‌های سامانه</span>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllRead}
                      className="text-blue-600 hover:underline text-[11px]"
                    >
                      خواندن همه
                    </button>
                  )}
                </div>
                <div className="space-y-1.5 max-h-60 overflow-y-auto">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`p-2 rounded-lg border transition ${n.read ? 'bg-slate-50 border-slate-100 text-slate-600' : 'bg-blue-50/70 border-blue-200 text-slate-900 font-medium'}`}
                    >
                      <p>{n.text}</p>
                      <span className="text-[10px] text-slate-400 mt-1 block">{n.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Badge & Logout */}
          <div className="flex items-center gap-2 border-r border-slate-200 pr-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-blue-600 text-white flex items-center justify-center text-xs font-black shadow-xs">
              {(currentUser?.name || ROLE_LABELS[currentRole].badge)[0]}
            </div>
            <div className="hidden sm:block text-right">
              <div className="text-xs font-bold text-slate-900 leading-tight">
                {currentUser?.name || 'کاربر سیستم طب کار'}
              </div>
              <div className="text-[10px] text-slate-500 font-medium">
                {currentUser?.roleTitle || ROLE_LABELS[currentRole].title}
              </div>
            </div>
            {onLogout && (
              <button
                type="button"
                onClick={onLogout}
                title="خروج از حساب کاربری (Sign Out)"
                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition mr-1 flex items-center gap-1 text-xs font-bold"
              >
                <LogOut className="w-4 h-4 text-rose-500" />
                <span className="hidden md:inline text-rose-600 text-[11px]">خروج</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
