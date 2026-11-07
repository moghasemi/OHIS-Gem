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
  const [showNewContractModal, setShowNewContractModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'contracts' | 'job_matrix'>('contracts');

  // Form state for new contract / work definition
  const [newCompanyName, setNewCompanyName] = useState('');
  const [newContractCode, setNewContractCode] = useState('');
  const [newPackageType, setNewPackageType] = useState('معاینات دوره‌ای جامع طب کار + آزمایشات تخصصی');
  const [newEmployeeCount, setNewEmployeeCount] = useState<number>(50);
  const [newStartDate, setNewStartDate] = useState('۱۴۰۵/۰۲/۰۱');
  const [newEndDate, setNewEndDate] = useState('۱۴۰۵/۰۳/۱۵');
  const [newTotalAmount, setNewTotalAmount] = useState<number>(350000000);

  // Job Matrix data state
  const [jobProfiles, setJobProfiles] = useState([
    { id: '1', title: 'جوشکار اسکلت و مخازن', department: 'واحد تولید و سازه', hazards: 'صدا، اشعه UV، فیوم‌های فلزی (Fe, Mn)، گرما', exams: 'شنوایی‌سنجی، اسپیرومتری، عکس قفسه سینه، کراتینین' },
    { id: '2', title: 'راننده لیفتراک و ادوات سنگین', department: 'لجستیک و انبارها', hazards: 'ارتعاش تمام بدن، خستگی بینایی، وضعیت نامناسب ارگونومیک بدنی', exams: 'بینایی‌سنجی تخصصی، دید عمق، رفلکس حرکتی، شنوایی‌سنجی' },
    { id: '3', title: 'اپراتور خط تولید رنگ و حلال', department: 'رنگ‌آمیزی صنعتی', hazards: 'بخارات آلی فرار (VOC)، تولوئن، زایلن، تماس پوستی', exams: 'تست‌های عملکرد کبد (AST, ALT)، CBC، اسپیرومتری، متابولیت ادراری' },
    { id: '4', title: 'کارشناس اداری و مالی', department: 'ستاد و امور مالی', hazards: 'استرس شغلی، کار ممتد با کامپیوتر (VDT)، دردهای عضلانی‌اسکلتی', exams: 'بینایی‌سنجی، معاینه اسکلتی‌عضلانی، قند و چربی' },
  ]);
  const [showNewJobModal, setShowNewJobModal] = useState(false);
  const [newJobTitle, setNewJobTitle] = useState('');
  const [newJobDept, setNewJobDept] = useState('');
  const [newJobHazards, setNewJobHazards] = useState('');
  const [newJobExams, setNewJobExams] = useState('');

  const handleCreateContract = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompanyName.trim()) return;
    const created: CompanyContract = {
      id: `cnt-${Date.now()}`,
      companyName: newCompanyName,
      code: newContractCode || `CNT-${Math.floor(1000 + Math.random() * 9000)}`,
      employeeCount: Number(newEmployeeCount) || 30,
      completedCount: 0,
      packageType: newPackageType,
      startDate: newStartDate,
      endDate: newEndDate,
      status: 'فعال',
      totalAmount: Number(newTotalAmount) || 200000000,
    };
    setContracts([created, ...contracts]);
    setSelectedContract(created);
    setShowNewContractModal(false);
    setUploadStatus(`✅ کار و قرارداد جدید برای شرکت «${created.companyName}» با کد ${created.code} با موفقیت در سامانه تعریف و فعال گردید.`);
    setNewCompanyName('');
    setNewContractCode('');
  };

  const handleCreateJobProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJobTitle.trim()) return;
    const created = {
      id: `${Date.now()}`,
      title: newJobTitle,
      department: newJobDept || 'عمومی',
      hazards: newJobHazards || 'عوامل ارگونومیک و فیزیکی',
      exams: newJobExams || 'معاینات عمومی طب کار',
    };
    setJobProfiles([created, ...jobProfiles]);
    setShowNewJobModal(false);
    setNewJobTitle('');
    setNewJobDept('');
    setNewJobHazards('');
    setNewJobExams('');
  };

  const handleSimulateExcelUpload = () => {
    setUploadStatus(`در حال پردازش فایل اکسل پرسنلی برای شرکت ${selectedContract.companyName} (اعتبارسنجی کد ملی، شماره پرسنلی، تاریخ تولد)...`);
    setTimeout(() => {
      setUploadStatus(`✅ فایل با موفقیت پردازش شد: ۲۴ پرسنل جدید به لیست معاینات شرکت ${selectedContract.companyName} اضافه شدند.`);
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
              پرتال سازمانی — مدیریت قراردادها، پروژه‌های کاری و ماتریس مشاغل
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              شرکت طرف قرارداد جاری: <strong className="text-slate-800">{selectedContract.companyName}</strong> | کد: <span className="font-mono">{selectedContract.code}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowNewContractModal(true)}
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-2 rounded-lg text-xs font-bold shadow transition"
          >
            <span>+ تعریف کار / قرارداد جدید سازمانی</span>
          </button>
          <button
            onClick={handleSimulateExcelUpload}
            className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2 rounded-lg text-xs font-bold shadow transition"
          >
            <Upload className="w-4 h-4" />
            <span>بارگذاری اکسل پرسنلی (Bulk Excel)</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200 pb-2 text-xs font-bold">
        <button
          onClick={() => setActiveTab('contracts')}
          className={`px-4 py-2 rounded-lg transition ${
            activeTab === 'contracts'
              ? 'bg-blue-50 text-blue-700 border border-blue-200'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          قراردادها و پروژه‌های معاینات ({contracts.length} پروژه فعال)
        </button>
        <button
          onClick={() => setActiveTab('job_matrix')}
          className={`px-4 py-2 rounded-lg transition ${
            activeTab === 'job_matrix'
              ? 'bg-blue-50 text-blue-700 border border-blue-200'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          شناسنامه عناوین شغلی و ماتریس آلاینده‌ها ({jobProfiles.length} عنوان شغل)
        </button>
      </div>

      {/* Switcher bar between contracts */}
      {activeTab === 'contracts' && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-slate-500 font-bold whitespace-nowrap">انتخاب پروژه فعال:</span>
          {contracts.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedContract(c)}
              className={`px-3 py-1.5 rounded-lg border whitespace-nowrap transition ${
                selectedContract.id === c.id
                  ? 'bg-slate-900 text-white border-slate-900 font-bold'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
              }`}
            >
              {c.companyName} ({c.code})
            </button>
          ))}
        </div>
      )}

      {uploadStatus && (
        <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold animate-in fade-in">
          {uploadStatus}
        </div>
      )}

      {/* Contract Details & Progress */}
      {/* TAB 1: Contracts & Examination Campaigns */}
      {activeTab === 'contracts' && (
        <>
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
                {selectedContract.employeeCount - selectedContract.completedCount} شاغل در صف انجام آزمایشات و پاراکلینیک قرار دارند.
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
                فهرست پرسنل معرفی‌شده شرکت «{selectedContract.companyName}» جهت معاینات طب کار
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
                  {companyEmployees.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-6 text-center text-slate-500">
                        هنوز پرسنلی برای این قرارداد بارگذاری نشده است. می‌توانید با دکمه «بارگذاری اکسل پرسنلی» افراد را اضافه نمایید.
                      </td>
                    </tr>
                  ) : (
                    companyEmployees.map((emp) => (
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
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* TAB 2: Job Exposure Matrix (JEM) */}
      {activeTab === 'job_matrix' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="font-bold text-slate-900 text-sm">
                ماتریس شناسنامه مشاغل و عوامل زیان‌آور (Job Exposure Matrix)
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                تعریف عناوین شغلی استاندارد به همراه آلاینده‌های پیش‌فرض جهت بارگذاری خودکار در جدول ۳ (بهداشت حرفه‌ای)
              </div>
            </div>
            <button
              onClick={() => setShowNewJobModal(true)}
              className="flex items-center gap-1.5 bg-purple-600 hover:bg-purple-700 text-white px-3.5 py-2 rounded-lg text-xs font-bold shadow transition"
            >
              <span>+ تعریف عنوان شغلی و ماتریس آلاینده جدید</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3 w-12">#</th>
                  <th className="p-3">عنوان پست سازمانی / شغل</th>
                  <th className="p-3">دپارتمان / واحد</th>
                  <th className="p-3">عوامل زیان‌آور محیط کار (آلاینده‌ها)</th>
                  <th className="p-3">معاینات و آزمایشات الزامی متناظر</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {jobProfiles.map((j, idx) => (
                  <tr key={j.id} className="hover:bg-slate-50">
                    <td className="p-3 font-mono text-slate-400">{idx + 1}</td>
                    <td className="p-3 font-bold text-slate-900">{j.title}</td>
                    <td className="p-3 text-slate-600">{j.department}</td>
                    <td className="p-3 text-amber-800 bg-amber-50/50 rounded font-medium">{j.hazards}</td>
                    <td className="p-3 text-blue-800 bg-blue-50/50 rounded">{j.exams}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL: Define New Contract / Work Project */}
      {showNewContractModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full p-6 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                <Building2 className="w-5 h-5 text-blue-600" />
                <span>تعریف کار / قرارداد جدید معاینات سازمانی</span>
              </div>
              <button
                onClick={() => setShowNewContractModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateContract} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">نام سازمان / شرکت طرف قرارداد *</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: شرکت صنایع مس ایران / کارخانه بافندگی البرز"
                  value={newCompanyName}
                  onChange={(e) => setNewCompanyName(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">کد قرارداد</label>
                  <input
                    type="text"
                    placeholder="CNT-1405-..."
                    value={newContractCode}
                    onChange={(e) => setNewContractCode(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg p-2.5 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">تعداد پرسنل هدف (سهمیه) *</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={newEmployeeCount}
                    onChange={(e) => setNewEmployeeCount(Number(e.target.value))}
                    className="w-full border border-slate-300 rounded-lg p-2.5 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">نوع پکیج و خدمات توافق‌شده</label>
                <select
                  value={newPackageType}
                  onChange={(e) => setNewPackageType(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2.5 bg-white"
                >
                  <option value="معاینات دوره‌ای جامع طب کار + آزمایشات تخصصی">معاینات دوره‌ای جامع طب کار + آزمایشات تخصصی</option>
                  <option value="معاینات بدو استخدام استاندارد ماده ۹۰">معاینات بدو استخدام استاندارد ماده ۹۰</option>
                  <option value="پکیج ویژه رانندگان و اپراتورهای لیفتراک">پکیج ویژه رانندگان و اپراتورهای لیفتراک</option>
                  <option value="پکیج غربالگری مشاغل شیفت شب و صنایع شیمیایی">پکیج غربالگری مشاغل شیفت شب و صنایع شیمیایی</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">تاریخ شروع</label>
                  <input
                    type="text"
                    value={newStartDate}
                    onChange={(e) => setNewStartDate(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg p-2.5 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">تاریخ پایان</label>
                  <input
                    type="text"
                    value={newEndDate}
                    onChange={(e) => setNewEndDate(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg p-2.5 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">مبلغ برآوردی کل قرارداد (ریال)</label>
                <input
                  type="number"
                  value={newTotalAmount}
                  onChange={(e) => setNewTotalAmount(Number(e.target.value))}
                  className="w-full border border-slate-300 rounded-lg p-2.5 font-mono"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowNewContractModal(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold shadow transition"
                >
                  ثبت و فعال‌سازی قرارداد
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Define New Job Profile */}
      {showNewJobModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full p-6 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                <span>تعریف عنوان شغلی و ماتریس آلاینده‌های شغلی</span>
              </div>
              <button
                onClick={() => setShowNewJobModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateJobProfile} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">عنوان شغل / سمت سازمانی *</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: کارشناس آزمایشگاه کنترل کیفیت، تراشکار، سندبلاست‌کار"
                  value={newJobTitle}
                  onChange={(e) => setNewJobTitle(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2.5"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">دپارتمان / واحد کاری</label>
                <input
                  type="text"
                  placeholder="مثال: واحد متالورژی و ریخته‌گری"
                  value={newJobDept}
                  onChange={(e) => setNewJobDept(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2.5"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">عوامل زیان‌آور محیط کار (آلاینده‌ها)</label>
                <textarea
                  rows={2}
                  placeholder="مثال: صدای بالای ۸۵ دسی‌بل، ذرات سیلیس، ارتعاش دست و بازو، استرس گرمایی"
                  value={newJobHazards}
                  onChange={(e) => setNewJobHazards(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2.5"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">معاینات و پاراکلینیک الزامی این شغل</label>
                <input
                  type="text"
                  placeholder="مثال: ادیومتری، اسپیرومتری، عکس قفسه سینه، تست‌های عملکرد کبد"
                  value={newJobExams}
                  onChange={(e) => setNewJobExams(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2.5"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowNewJobModal(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-bold shadow transition"
                >
                  ثبت شناسنامه شغلی
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
