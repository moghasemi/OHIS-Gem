import React from 'react';
import { LockKeyhole, ShieldAlert } from 'lucide-react';

export interface AuthenticatedUser {
  id: string;
  name: string;
  nationalId: string;
  role: import('../domain/rules.ts').UserRole;
  roleTitle: string;
  department: string;
  medicalCouncilNumber?: string;
  token: string;
}
interface Props { onLogin: (user: AuthenticatedUser) => void; }

export const LoginView: React.FC<Props> = () => (
  <main className="min-h-screen bg-slate-950 flex items-center justify-center p-6" dir="rtl">
    <section className="w-full max-w-2xl rounded-2xl border border-amber-500/40 bg-white p-8 shadow-2xl">
      <div className="flex items-center gap-3 text-amber-700">
        <ShieldAlert className="h-8 w-8" />
        <h1 className="text-xl font-black">ورود به OHIS موقتاً غیرفعال است</h1>
      </div>
      <p className="mt-5 leading-8 text-slate-700">
        احراز هویت واقعی هنوز به سرویس بک‌اند متصل نشده است. ورود آزمایشی،
        انتخاب نقش از سمت مرورگر، توکن ساختگی و رمز یک‌بارمصرف ثابت قابل اعتماد
        نیستند و برای جلوگیری از نمایش یا تغییر اطلاعات پزشکی غیرفعال شده‌اند.
      </p>
      <div className="mt-5 rounded-xl bg-amber-50 p-4 text-sm leading-7 text-amber-900">
        تا زمان پیاده‌سازی و آزمون احراز هویت سمت سرور، کنترل دسترسی مبتنی بر
        نقش و جداسازی داده‌های هر مرکز، هیچ نشست کاربری ایجاد نمی‌شود.
      </div>
      <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-slate-500">
        <LockKeyhole className="h-4 w-4" /><span>دسترسی بالینی مسدود است</span>
      </div>
    </section>
  </main>
);
