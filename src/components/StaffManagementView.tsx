import React, { useState } from 'react';
import { ClinicStaff } from '../types/index.ts';
import { INITIAL_STAFF_DATA } from '../data/mockData.ts';
import { UserRole, validateNationalId } from '../domain/rules.ts';
import {
  Users,
  UserPlus,
  Stethoscope,
  HardHat,
  Eye,
  FlaskConical,
  UserCheck,
  ShieldCheck,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  KeyRound,
  FileBadge2,
  Phone,
  Mail,
  Building,
} from 'lucide-react';

export const StaffManagementView: React.FC = () => {
  const [staffList, setStaffList] = useState<ClinicStaff[]>(INITIAL_STAFF_DATA);
  const [filterRole, setFilterRole] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [selectedStaff, setSelectedStaff] = useState<ClinicStaff | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  // New staff form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [nationalId, setNationalId] = useState('');
  const [mobile, setMobile] = useState('');
  const [role, setRole] = useState<UserRole>('DOCTOR');
  const [roleTitle, setRoleTitle] = useState('');
  const [department, setDepartment] = useState('');
  const [medicalCouncilNumber, setMedicalCouncilNumber] = useState('');
  const [hseLicenseNumber, setHseLicenseNumber] = useState('');
  const [stampNumber, setStampNumber] = useState('');
  const [shift, setShift] = useState<'صبح' | 'عصر' | 'تمام‌وقت'>('صبح');
  const [email, setEmail] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  // Filtered staff
  const filteredStaff = staffList.filter((s) => {
    const matchesRole = filterRole === 'ALL' || s.role === filterRole;
    const matchesSearch =
      s.firstName.includes(searchQuery) ||
      s.lastName.includes(searchQuery) ||
      s.nationalId.includes(searchQuery) ||
      s.personnelCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.medicalCouncilNumber && s.medicalCouncilNumber.includes(searchQuery));
    return matchesRole && matchesSearch;
  });

  const doctorsCount = staffList.filter((s) => s.role === 'DOCTOR').length;
  const hseCount = staffList.filter((s) => s.role === 'HSE').length;
  const paraLabCount = staffList.filter((s) => s.role === 'PARACLINIC' || s.role === 'LAB').length;
  const receptionCount = staffList.filter((s) => s.role === 'RECEPTION' || s.role === 'CLINIC_ADMIN').length;

  const handleToggleStatus = (id: string) => {
    setStaffList((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const newStatus = s.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
          setNotification(
            `وضعیت دسترسی ${s.firstName} ${s.lastName} به «${newStatus === 'ACTIVE' ? 'فعال' : 'غیرفعال / تعلیق'}» تغییر یافت.`
          );
          return { ...s, status: newStatus };
        }
        return s;
      })
    );
  };

  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!firstName.trim() || !lastName.trim()) {
      setFormError('لطفاً نام و نام خانوادگی را وارد فرمایید.');
      return;
    }

    if (!validateNationalId(nationalId)) {
      setFormError('کد ملی وارد شده نامعتبر است (کنترل رقم چک الگو ۱۰ رقمی).');
      return;
    }

    if (role === 'DOCTOR' && !medicalCouncilNumber.trim()) {
      setFormError('برای پرسنل در رده پزشک، درج شماره نظام پزشکی معتبر الزامی است.');
      return;
    }

    const defaultPrefix =
      role === 'DOCTOR'
        ? 'DOC'
        : role === 'HSE'
        ? 'HSE'
        : role === 'LAB'
        ? 'LAB'
        : role === 'PARACLINIC'
        ? 'PARA'
        : role === 'RECEPTION'
        ? 'REC'
        : 'ADM';

    const newMember: ClinicStaff = {
      id: `stf-${Date.now()}`,
      personnelCode: `${defaultPrefix}-${Math.floor(100 + Math.random() * 900)}`,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      nationalId: nationalId.trim(),
      mobile: mobile.trim() || '09120000000',
      role,
      roleTitle:
        roleTitle.trim() ||
        (role === 'DOCTOR'
          ? 'پزشک معاین طب کار'
          : role === 'HSE'
          ? 'کارشناس بهداشت حرفه‌ای'
          : role === 'PARACLINIC'
          ? 'تکنسین پاراکلینیک'
          : role === 'LAB'
          ? 'کارشناس آزمایشگاه'
          : role === 'RECEPTION'
          ? 'متصدی پذیرش و صندوق'
          : 'مدیر داخلی مرکز'),
      department:
        department.trim() ||
        (role === 'DOCTOR'
          ? 'معاینات بالینی و صدور نظریه'
          : role === 'HSE'
          ? 'بهداشت حرفه‌ای و ارزیابی مواجهات'
          : role === 'PARACLINIC'
          ? 'واحد تست‌های فیزیولوژیک'
          : role === 'LAB'
          ? 'آزمایشگاه تشخیص طبی'
          : 'پذیرش و بایگانی'),
      medicalCouncilNumber: role === 'DOCTOR' ? medicalCouncilNumber.trim() : undefined,
      hseLicenseNumber: role === 'HSE' || role === 'PARACLINIC' || role === 'LAB' ? hseLicenseNumber.trim() : undefined,
      stampNumber: role === 'DOCTOR' ? stampNumber.trim() || `STAMP-${medicalCouncilNumber.trim()}` : undefined,
      shift,
      status: 'ACTIVE',
      hireDate: '۱۴۰۵/۰۴/۰۱',
      email: email.trim() || `${firstName.toLowerCase()}.${lastName.toLowerCase()}@ohis-clinic.ir`,
      lastLogin: 'تازه ثبت شده (آماده ورود با توکن JWT)',
    };

    setStaffList([newMember, ...staffList]);
    setShowAddModal(false);
    setNotification(
      `✅ پرسنل جدید «${newMember.firstName} ${newMember.lastName}» با کد پرسنلی ${newMember.personnelCode} و نقش ${newMember.roleTitle} با موفقیت در مرکز طب کار ثبت گردید.`
    );

    // Reset form
    setFirstName('');
    setLastName('');
    setNationalId('');
    setMobile('');
    setMedicalCouncilNumber('');
    setHseLicenseNumber('');
    setStampNumber('');
    setEmail('');
    setRoleTitle('');
    setDepartment('');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-slate-900 text-sm">
              مدیریت پرسنل و کاربران مرکز طب کار (Clinic Staff & Practitioners)
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              تعریف پزشکان طب کار، کارشناسان بهداشت حرفه‌ای، کادر پاراکلینیک و آزمایشگاه، شماره نظام پزشکی و مهر رسمی
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-xs font-bold shadow transition"
        >
          <UserPlus className="w-4 h-4" />
          <span>+ تعریف پرسنل / کاربر جدید مرکز</span>
        </button>
      </div>

      {notification && (
        <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold animate-in fade-in flex items-center justify-between">
          <span>{notification}</span>
          <button onClick={() => setNotification(null)} className="text-emerald-600 hover:text-emerald-900 font-bold">
            ✕
          </button>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-bold block">پزشکان متخصص و معتمد</span>
            <span className="text-2xl font-black text-blue-700">{doctorsCount} نفر</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">دارای نظام پزشکی و مهر</span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <Stethoscope className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-bold block">بهداشت حرفه‌ای و HSE</span>
            <span className="text-2xl font-black text-amber-700">{hseCount} نفر</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">ارزیاب مواجهات جدول ۳</span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
            <HardHat className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-bold block">پاراکلینیک و آزمایشگاه</span>
            <span className="text-2xl font-black text-purple-700">{paraLabCount} نفر</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">ادیولوژی، اسپیرو و سم‌شناسی</span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
            <FlaskConical className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-bold block">پذیرش، صندوق و مدیریت</span>
            <span className="text-2xl font-black text-emerald-700">{receptionCount} نفر</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">تشکیل پرونده و پشتیبانی</span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <UserCheck className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          <span className="font-bold text-slate-500 ml-1">فیلتر رده شغلی:</span>
          {[
            { id: 'ALL', label: 'همه پرسنل' },
            { id: 'DOCTOR', label: 'پزشکان طب کار' },
            { id: 'HSE', label: 'بهداشت حرفه‌ای' },
            { id: 'PARACLINIC', label: 'پاراکلینیک' },
            { id: 'LAB', label: 'آزمایشگاه' },
            { id: 'RECEPTION', label: 'پذیرش و صندوق' },
            { id: 'CLINIC_ADMIN', label: 'مدیریت مرکز' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterRole(tab.id)}
              className={`px-3 py-1.5 rounded-lg font-bold transition whitespace-nowrap ${
                filterRole === tab.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="جستجو با نام، کد پرسنلی یا نظام پزشکی..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-slate-300 rounded-lg pr-8 pl-3 py-1.5 text-xs w-64 focus:ring-2 focus:ring-indigo-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute right-2.5 top-2" />
        </div>
      </div>

      {/* Staff Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <div className="font-bold text-slate-900 text-sm">
            فهرست پرسنل و کاربران دارای دسترسی در مرکز طب کار ({filteredStaff.length} نفر)
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3">کد پرسنلی</th>
                <th className="p-3">نام و نام خانوادگی</th>
                <th className="p-3">سمت و رده تخصصی</th>
                <th className="p-3">نظام پزشکی / پروانه</th>
                <th className="p-3">مهر رسمی و امضا</th>
                <th className="p-3">شیفت</th>
                <th className="p-3">وضعیت حساب</th>
                <th className="p-3 text-center">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStaff.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-slate-400">
                    پرسنلی مطابق فیلتر جستجو یافت نشد.
                  </td>
                </tr>
              ) : (
                filteredStaff.map((staff) => (
                  <tr key={staff.id} className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-bold text-indigo-700">{staff.personnelCode}</td>
                    <td className="p-3">
                      <div className="font-bold text-slate-900">{staff.firstName} {staff.lastName}</div>
                      <div className="text-[11px] text-slate-400 font-mono mt-0.5">کد ملی: {staff.nationalId}</div>
                    </td>
                    <td className="p-3">
                      <div className="font-semibold text-slate-800">{staff.roleTitle}</div>
                      <div className="text-[11px] text-slate-500">{staff.department}</div>
                    </td>
                    <td className="p-3">
                      {staff.medicalCouncilNumber ? (
                        <span className="font-mono bg-blue-50 text-blue-800 px-2 py-0.5 rounded border border-blue-200 font-bold">
                          نظام: {staff.medicalCouncilNumber}
                        </span>
                      ) : staff.hseLicenseNumber ? (
                        <span className="font-mono bg-amber-50 text-amber-800 px-2 py-0.5 rounded border border-amber-200">
                          مجوز: {staff.hseLicenseNumber}
                        </span>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>
                    <td className="p-3">
                      {staff.stampNumber ? (
                        <div className="flex items-center gap-1 text-emerald-700 font-medium">
                          <FileBadge2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="font-mono text-[11px]">{staff.stampNumber}</span>
                        </div>
                      ) : (
                        <span className="text-slate-400 text-[11px]">بدون مهر پزشکی</span>
                      )}
                    </td>
                    <td className="p-3">
                      <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px] font-bold">
                        {staff.shift}
                      </span>
                    </td>
                    <td className="p-3">
                      {staff.status === 'ACTIVE' ? (
                        <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px] font-bold">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>فعال</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-rose-700 bg-rose-50 px-2 py-0.5 rounded text-[11px] font-bold">
                          <XCircle className="w-3 h-3 text-rose-600" />
                          <span>غیرفعال</span>
                        </span>
                      )}
                    </td>
                    <td className="p-3 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => setSelectedStaff(staff)}
                          className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded font-bold transition text-[11px]"
                        >
                          مشاهده
                        </button>
                        <button
                          onClick={() => handleToggleStatus(staff.id)}
                          className={`px-2 py-1 rounded font-bold transition text-[11px] ${
                            staff.status === 'ACTIVE'
                              ? 'bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200'
                              : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200'
                          }`}
                        >
                          {staff.status === 'ACTIVE' ? 'تعلیق' : 'فعال‌سازی'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: Define New Clinic Staff / Practitioner */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-xl w-full p-6 space-y-4 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-indigo-600" />
                <span>تعریف پرسنل / کادر درمان جدید در مرکز طب کار</span>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {formError && (
              <div className="p-3 bg-rose-50 text-rose-800 border border-rose-200 rounded-lg text-xs font-bold">
                ⚠️ {formError}
              </div>
            )}

            <form onSubmit={handleAddStaff} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">نام *</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: محمدرضا یا فرناز"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">نام خانوادگی *</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: صادقی"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">کد ملی ۱۰ رقمی *</label>
                  <input
                    type="text"
                    required
                    maxLength={10}
                    placeholder="۰۰۱۲۳۴۵۶۷۸"
                    value={nationalId}
                    onChange={(e) => setNationalId(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg p-2.5 font-mono focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">شماره تلفن همراه *</label>
                  <input
                    type="tel"
                    required
                    placeholder="۰۹۱۲..."
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg p-2.5 font-mono focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">نقش سازمانی در سامانه *</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as UserRole)}
                    className="w-full border border-slate-300 rounded-lg p-2.5 bg-white font-bold"
                  >
                    <option value="DOCTOR">پزشک متخصص طب کار / معتمد</option>
                    <option value="HSE">کارشناس بهداشت حرفه‌ای (HSE)</option>
                    <option value="PARACLINIC">اپراتور ادیومتری و پاراکلینیک</option>
                    <option value="LAB">سوپروایزر / کارشناس آزمایشگاه</option>
                    <option value="RECEPTION">مسئول پذیرش و صندوق</option>
                    <option value="CLINIC_ADMIN">مدیر فنی و اجرایی مرکز</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">شیفت کاری</label>
                  <select
                    value={shift}
                    onChange={(e) => setShift(e.target.value as 'صبح' | 'عصر' | 'تمام‌وقت')}
                    className="w-full border border-slate-300 rounded-lg p-2.5 bg-white"
                  >
                    <option value="صبح">شیفت صبح (۰۷:۳۰ الی ۱۴:۳۰)</option>
                    <option value="عصر">شیفت عصر (۱۴:۳۰ الی ۲۰:۳۰)</option>
                    <option value="تمام‌وقت">تمام‌وقت</option>
                  </select>
                </div>
              </div>

              {/* Doctor-Specific Fields */}
              {role === 'DOCTOR' && (
                <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl space-y-3">
                  <div className="font-bold text-blue-900 flex items-center gap-1.5">
                    <Stethoscope className="w-4 h-4 text-blue-700" />
                    <span>مشخصات نظام پزشکی و مهر معتمد وزارت بهداشت</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-blue-950 mb-1">شماره نظام پزشکی *</label>
                      <input
                        type="text"
                        required
                        placeholder="مثال: ۹۸۷۶۵"
                        value={medicalCouncilNumber}
                        onChange={(e) => setMedicalCouncilNumber(e.target.value)}
                        className="w-full border border-blue-300 rounded-lg p-2.5 font-mono bg-white"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-blue-950 mb-1">کد مهر رسمی</label>
                      <input
                        type="text"
                        placeholder="STAMP-..."
                        value={stampNumber}
                        onChange={(e) => setStampNumber(e.target.value)}
                        className="w-full border border-blue-300 rounded-lg p-2.5 font-mono bg-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* HSE or Paraclinic/Lab license */}
              {(role === 'HSE' || role === 'PARACLINIC' || role === 'LAB') && (
                <div>
                  <label className="block font-bold text-slate-700 mb-1">شماره پروانه صلاحیت حرفه‌ای بهداشت / نظام پزشکی</label>
                  <input
                    type="text"
                    placeholder="مثال: HSE-88421 یا AUD-3401"
                    value={hseLicenseNumber}
                    onChange={(e) => setHseLicenseNumber(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg p-2.5 font-mono"
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">عنوان دقیق سمت (جهت چاپ در پرونده)</label>
                  <input
                    type="text"
                    placeholder="مثال: متخصص طب کار یا کارشناس ادیومتری"
                    value={roleTitle}
                    onChange={(e) => setRoleTitle(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg p-2.5"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">ایمیل سازمانی (جهت ورود JWT)</label>
                  <input
                    type="email"
                    placeholder="user@ohis-clinic.ir"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg p-2.5 font-mono"
                  />
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between text-[11px] text-slate-600">
                <span className="flex items-center gap-1.5 font-medium">
                  <KeyRound className="w-4 h-4 text-indigo-600" />
                  رمز عبور اولیه به شماره موبایل پرسنل پیامک خواهد شد و توکن دسترسی JWT صادر می‌گردد.
                </span>
                <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">حساب فعال</span>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold shadow transition"
                >
                  ثبت پرسنل و فعال‌سازی حساب
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: View Staff Details */}
      {selectedStaff && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full p-6 space-y-4 animate-in fade-in zoom-in-95 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-indigo-600" />
                <span>شناسنامه پرسنلی و دسترسی سیستم</span>
              </div>
              <button
                onClick={() => setSelectedStaff(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-black text-sm">
                  {selectedStaff.firstName[0]}
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-sm">
                    {selectedStaff.firstName} {selectedStaff.lastName}
                  </div>
                  <div className="text-slate-500 font-mono text-[11px]">
                    کد پرسنلی: {selectedStaff.personnelCode}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-slate-400 block">رده و نقش سازمانی</span>
                  <strong className="text-slate-800">{selectedStaff.roleTitle}</strong>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-slate-400 block">کد ملی</span>
                  <strong className="font-mono text-slate-800">{selectedStaff.nationalId}</strong>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-slate-400 block">شماره تماس</span>
                  <strong className="font-mono text-slate-800">{selectedStaff.mobile}</strong>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-slate-400 block">شیفت کاری</span>
                  <strong className="text-slate-800">{selectedStaff.shift}</strong>
                </div>
              </div>

              {selectedStaff.medicalCouncilNumber && (
                <div className="p-2.5 bg-blue-50 border border-blue-200 rounded-lg text-blue-900 flex justify-between items-center">
                  <span>شماره نظام پزشکی معتمد:</span>
                  <strong className="font-mono text-sm">{selectedStaff.medicalCouncilNumber}</strong>
                </div>
              )}

              {selectedStaff.stampNumber && (
                <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-900 flex justify-between items-center">
                  <span>کد مهر و امضای دیجیتال:</span>
                  <strong className="font-mono text-sm">{selectedStaff.stampNumber}</strong>
                </div>
              )}

              <div className="text-slate-500 text-[11px] pt-2 border-t border-slate-100 space-y-1">
                <div>تاریخ استخدام: {selectedStaff.hireDate}</div>
                <div>آخرین ورود به سامانه: {selectedStaff.lastLogin || 'ثبت نشده'}</div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedStaff(null)}
                className="px-4 py-2 bg-slate-800 text-white rounded-lg font-bold"
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
