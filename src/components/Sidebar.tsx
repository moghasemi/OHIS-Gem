import React from 'react';
import { UserRole, hasPermission } from '../domain/rules.ts';
import {
  LayoutDashboard,
  UserPlus,
  FlaskConical,
  Eye,
  HardHat,
  Stethoscope,
  Building2,
  CalendarCheck,
  Receipt,
  Ticket,
  Calendar,
  Settings,
  ShieldAlert,
  Grid3X3,
  FileCheck2,
  Terminal,
  Users,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';

interface Props {
  currentTab: string;
  onSelectTab: (tabId: string) => void;
  currentRole: UserRole;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  customMatrix?: Record<UserRole, string[]>;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: string;
  color?: string;
}

const MENU_ITEMS: MenuItem[] = [
  { id: 'dashboard', label: 'داشبورد سلامت شغلی', icon: LayoutDashboard },
  { id: 'reception', label: 'پذیرش و تشکیل پرونده', icon: UserPlus, badge: 'جدید' },
  { id: 'lab', label: 'آزمایشگاه (جدول ۶)', icon: FlaskConical },
  { id: 'para', label: 'پاراکلینیک (جدول ۷)', icon: Eye },
  { id: 'hse', label: 'بهداشت حرفه‌ای (جدول ۳)', icon: HardHat },
  { id: 'doctor', label: 'پزشک طب کار (جداول ۵، ۸، ۹)', icon: Stethoscope, badge: 'قفل پرونده' },
  { id: 'official-form', label: 'فرم ۵ صفحه‌ای وزارت بهداشت', icon: FileCheck2, color: 'text-emerald-500' },
  { id: 'org', label: 'پرتال کارفرما و قراردادها', icon: Building2 },
  { id: 'staff', label: 'پرسنل و کادر درمان مرکز', icon: Users, badge: 'پزشکان', color: 'text-indigo-500' },
  { id: 'self', label: 'پرتال مراجعه‌کننده و نوبت‌دهی', icon: CalendarCheck },
  { id: 'finance', label: 'گزارشات مالی و پوز', icon: Receipt },
  { id: 'tickets', label: 'سیستم تیکتینگ', icon: Ticket },
  { id: 'calendar', label: 'تقویم نوبت‌ها', icon: Calendar },
  { id: 'role-matrix', label: 'ماتریس دسترسی نقش‌ها', icon: Grid3X3 },
  { id: 'backend-hub', label: 'هاب Django، داکر و API', icon: Terminal, color: 'text-indigo-400', badge: 'REST/JWT' },
  { id: 'settings', label: 'تنظیمات مرکز', icon: Settings },
  { id: 'superadmin', label: 'مدیریت کلان پلتفرم', icon: ShieldAlert, color: 'text-rose-400' },
];

export const Sidebar: React.FC<Props> = ({
  currentTab,
  onSelectTab,
  currentRole,
  isCollapsed,
  onToggleCollapse,
  customMatrix,
}) => {
  const allowedItems = MENU_ITEMS.filter((item) => hasPermission(currentRole, item.id, customMatrix));

  return (
    <aside
      className={`no-print bg-slate-900 text-slate-100 flex flex-col transition-all duration-300 z-20 border-l border-slate-800 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        {!isCollapsed && (
          <div>
            <div className="font-black text-lg text-white flex items-center gap-2">
              <span className="text-blue-400">🏥</span>
              <span>OHIS System</span>
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">مدیریت جامع طب کار و بهداشت حرفه‌ای</div>
          </div>
        )}
        <button
          onClick={onToggleCollapse}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition mx-auto"
          title={isCollapsed ? 'باز کردن منو' : 'بستن منو'}
        >
          {isCollapsed ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
      </div>

      {/* Nav List */}
      <nav className="flex-1 overflow-y-auto p-2 space-y-1">
        {allowedItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition group text-right ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
              }`}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon
                className={`w-4 h-4 shrink-0 transition ${
                  isActive ? 'text-white' : item.color || 'text-slate-400 group-hover:text-blue-400'
                }`}
              />

              {!isCollapsed && (
                <div className="flex-1 flex items-center justify-between truncate">
                  <span className="truncate">{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded-md font-bold shrink-0 ${
                        isActive ? 'bg-blue-800 text-white' : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Info */}
      {!isCollapsed && (
        <div className="p-3 border-t border-slate-800 text-[10px] text-slate-400 text-center">
          <div>نسخه ۱.۰.۰ — Production Ready</div>
          <div className="text-slate-500 mt-0.5">Django Monolith + React SPA + PostgreSQL</div>
        </div>
      )}
    </aside>
  );
};
