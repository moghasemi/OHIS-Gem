import React, { useState } from 'react';
import { UserRole } from '../domain/rules.ts';
import {
  Stethoscope,
  HardHat,
  Eye,
  FlaskConical,
  UserCheck,
  Building2,
  ShieldCheck,
  ShieldAlert,
  Lock,
  User,
  ArrowRight,
  KeyRound,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export interface AuthenticatedUser {
  id: string;
  name: string;
  nationalId: string;
  role: UserRole;
  roleTitle: string;
  department: string;
  medicalCouncilNumber?: string;
  token: string;
}

interface Props {
  onLogin: (user: AuthenticatedUser) => void;
}

const PRESET_ACCOUNTS: {
  role: UserRole;
  name: string;
  title: string;
  username: string;
  icon: React.ElementType;
  color: string;
  borderColor: string;
  badge: string;
  medicalCode?: string;
}[] = [
  {
    role: 'doctor',
    name: 'دکتر محمدرضا صادقی',
    title: 'متخصص طب کار و بیماری‌های شغلی',
    username: 'dr.sadeghi',
    icon: Stethoscope,
    color: 'bg-indigo-50 text-indigo-700',
    borderColor: 'border-indigo-200 hover:border-indigo-500',
    badge: 'نظام: ۹۸۷۶۵',
    medicalCode: '۹۸۷۶۵',
  },
  {
    role: 'hse',
    name: 'مهندس سحر علیزاده',
    title: 'کارشناس ارشد بهداشت حرفه‌ای (HSE)',
    username: 's.alizadeh',
    icon: HardHat,
    color: 'bg-amber-50 text-amber-700',
    borderColor: 'border-amber-200 hover:border-amber-500',
    badge: 'پروانه بهداشت',
  },
  {
    role: 'para',
    name: 'احسان شاکری',
    title: 'ادیولوژیست و اپراتور پاراکلینیک',
    username: 'e.shakeri',
    icon: Eye,
    color: 'bg-cyan-50 text-cyan-700',
    borderColor: 'border-cyan-200 hover:border-cyan-500',
    badge: 'شنوایی و ریه',
  },
  {
    role: 'lab',
    name: 'سارا محمدی',
    title: 'سوپروایزر آزمایشگاه تشخیص طبی',
    username: 's.mohammadi',
    icon: FlaskConical,
    color: 'bg-purple-50 text-purple-700',
    borderColor: 'border-purple-200 hover:border-purple-500',
    badge: 'پاتولوژی و سم‌شناسی',
  },
  {
    role: 'reception',
    name: 'علی رضایی',
    title: 'متصدی پذیرش، صندوق و تشکیل پرونده',
    username: 'a.rezaei',
    icon: UserCheck,
    color: 'bg-blue-50 text-blue-700',
    borderColor: 'border-blue-200 hover:border-blue-500',
    badge: 'پذیرش و پوز',
  },
  {
    role: 'org',
    name: 'نماینده شرکت صنایع فولاد البرز',
    title: 'کارشناس منابع انسانی و نماینده کارفرما',
    username: 'org.alborz',
    icon: Building2,
    color: 'bg-emerald-50 text-emerald-700',
    borderColor: 'border-emerald-200 hover:border-emerald-500',
    badge: 'پرتال کارفرما',
  },
  {
    role: 'clinic_admin',
    name: 'مهندس کامران طاهری',
    title: 'مدیر فنی و اجرایی مرکز طب کار',
    username: 'admin.taheri',
    icon: ShieldCheck,
    color: 'bg-rose-50 text-rose-700',
    borderColor: 'border-rose-200 hover:border-rose-500',
    badge: 'مدیر کلینیک',
  },
  {
    role: 'superadmin',
    name: 'مدیریت کلان پلتفرم OHIS',
    title: 'سوپراَدمین سامانه سراسری',
    username: 'superadmin',
    icon: ShieldAlert,
    color: 'bg-slate-800 text-white',
    borderColor: 'border-slate-700 hover:border-slate-900',
    badge: 'دسترسی کامل',
  },
];

export const LoginView: React.FC<Props> = ({ onLogin }) => {
  const [username, setUsername] = useState('dr.sadeghi');
  const [password, setPassword] = useState('••••••••');
  const [selectedRole, setSelectedRole] = useState<UserRole>('doctor');
  const [useOtp, setUseOtp] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSelectPreset = (preset: (typeof PRESET_ACCOUNTS)[0]) => {
    setUsername(preset.username);
    setSelectedRole(preset.role);
    setPassword('••••••••');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const preset = PRESET_ACCOUNTS.find((p) => p.role === selectedRole) || PRESET_ACCOUNTS[0];

    // Generate mock JWT token
    const mockToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(
      JSON.stringify({
        sub: username,
        role: selectedRole,
        name: preset.name,
        iat: Date.now(),
        exp: Date.now() + 86400000,
      })
    )}.signature_${Math.random().toString(36).substring(7)}`;

    setTimeout(() => {
      onLogin({
        id: `usr-${Date.now()}`,
        name: preset.name,
        nationalId: '0012345678',
        role: selectedRole,
        roleTitle: preset.title,
        department: 'کادر تخصصی مرکز طب کار',
        medicalCouncilNumber: preset.medicalCode,
        token: mockToken,
      });
      setIsSubmitting(false);
    }, 600);
  };

  const handleSendOtp = () => {
    setOtpSent(true);
    setOtpCode('58412');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 flex items-center justify-center p-4" dir="rtl">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden grid grid-cols-1 md:grid-cols-12">
        {/* Right Panel: Credentials & Login Form (7 Cols) */}
        <div className="md:col-span-7 p-8 md:p-10 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black shadow-lg shadow-indigo-500/30">
                <Stethoscope className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-lg font-black text-slate-900">سامانه جامع اطلاعات سلامت شغلی (OHIS)</h1>
                <p className="text-xs text-slate-500 font-medium">احراز هویت کاربران و مدیریت مجوزهای بالینی کادر درمان</p>
              </div>
            </div>

            <div className="flex gap-2 border-b border-slate-200 pb-3 mb-6 text-xs font-bold">
              <button
                type="button"
                onClick={() => setUseOtp(false)}
                className={`pb-2 px-3 transition ${
                  !useOtp
                    ? 'border-b-2 border-indigo-600 text-indigo-700 font-extrabold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                ورود با کلمه عبور و نام کاربری
              </button>
              <button
                type="button"
                onClick={() => setUseOtp(true)}
                className={`pb-2 px-3 transition ${
                  useOtp
                    ? 'border-b-2 border-indigo-600 text-indigo-700 font-extrabold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                ورود دو مرحله‌ای با رمز یکبار مصرف (SMS OTP)
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">نام کاربری، کد پرسنلی یا کد ملی</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="مثال: dr.sadeghi یا 0012345678"
                    className="w-full border border-slate-300 rounded-xl pr-10 pl-3 py-2.5 font-mono focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <User className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
                </div>
              </div>

              {!useOtp ? (
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">کلمه عبور امنیتی</label>
                  <div className="relative">
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full border border-slate-300 rounded-xl pr-10 pl-3 py-2.5 font-mono focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <Lock className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <label className="block font-bold text-slate-700">کد تایید پیامکی (OTP)</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      maxLength={5}
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      placeholder="کد ۵ رقمی"
                      className="w-full border border-slate-300 rounded-xl p-2.5 font-mono text-center text-sm font-bold tracking-widest focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      className="whitespace-nowrap px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold transition"
                    >
                      {otpSent ? 'ارسال مجدد کد' : 'دریافت کد پیامکی'}
                    </button>
                  </div>
                  {otpSent && (
                    <div className="text-[11px] text-emerald-700 font-bold bg-emerald-50 p-2 rounded-lg">
                      کد تایید فرضی <span className="font-mono underline">58412</span> به شماره همراه ارسال گردید.
                    </div>
                  )}
                </div>
              )}

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">نقش کاربری در این نشست (Active Session Role)</label>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                  className="w-full border border-slate-300 rounded-xl p-2.5 bg-white font-bold text-slate-800 focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="doctor">🩺 پزشک متخصص طب کار (معاینات، ارجاعات و قفل پرونده)</option>
                  <option value="hse">👷‍♂️ کارشناس بهداشت حرفه‌ای (ارزیابی مخاطرات جدول ۳)</option>
                  <option value="para">👁️ اپراتور پاراکلینیک (ادیومتری، اسپیرومتری و بینایی)</option>
                  <option value="lab">🧪 تکنسین / مسئول آزمایشگاه (هماتولوژی و سم‌شناسی)</option>
                  <option value="reception">📝 متصدی پذیرش و صندوق (ثبت‌نام و پوز بانکی)</option>
                  <option value="org">🏢 نماینده کارفرما / سازمان (قراردادها و خروجی اکسل)</option>
                  <option value="clinic_admin">🏥 مدیر فنی و اجرایی مرکز طب کار</option>
                  <option value="superadmin">🛡️ سوپراَدمین سامانه سراسری</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition disabled:opacity-75"
              >
                {isSubmitting ? (
                  <span>در حال اعتبارسنجی توکن JWT و بارگذاری مجوزها...</span>
                ) : (
                  <>
                    <span>ورود امن به سامانه طب کار</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span>نسخه ۳.۲.۰ — منطبق با فرم رسمی وزارت بهداشت</span>
            <span className="flex items-center gap-1 text-emerald-600 font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>پروتکل امنیتی JWT Active</span>
            </span>
          </div>
        </div>

        {/* Left Panel: Quick Preset Role Switcher for Demo & Testing (5 Cols) */}
        <div className="md:col-span-5 bg-slate-50 border-r border-slate-200 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2 text-indigo-700 font-black text-xs">
              <Sparkles className="w-4 h-4" />
              <span>ورود سریع برای تست نقش‌ها (Demo Role Switcher)</span>
            </div>
            <p className="text-[11px] text-slate-500 mb-4 leading-relaxed">
              با کلیک روی هر یک از حساب‌های زیر، سامانه بلافاصله با هویت و دسترسی‌های دقیق همان نقش شبیه‌سازی و باز می‌شود:
            </p>

            <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
              {PRESET_ACCOUNTS.map((preset) => {
                const Icon = preset.icon;
                const isSelected = selectedRole === preset.role;
                return (
                  <button
                    key={preset.role}
                    type="button"
                    onClick={() => handleSelectPreset(preset)}
                    className={`w-full text-right p-2.5 rounded-xl border text-xs transition flex items-center justify-between gap-2 ${
                      isSelected
                        ? 'bg-white shadow-sm border-indigo-500 ring-2 ring-indigo-500/20'
                        : `${preset.borderColor} bg-white hover:bg-slate-100/80`
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${preset.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-extrabold text-slate-900 truncate text-[11px]">{preset.name}</div>
                        <div className="text-[10px] text-slate-500 truncate">{preset.title}</div>
                      </div>
                    </div>
                    <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {preset.badge}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-3 bg-indigo-50/70 border border-indigo-100 rounded-xl mt-4 text-[11px] text-indigo-900">
            <strong>قاعده تفکیک وظایف (RBAC):</strong>
            <p className="text-[10px] text-slate-600 mt-1">
              هر نقش فقط به ماژول‌های مجاز دسترسی دارد. برای تغییر اختیارات هر نقش، مدیر مرکز می‌تواند از «ماتریس دسترسی‌ها» آن را ویرایش نماید.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
