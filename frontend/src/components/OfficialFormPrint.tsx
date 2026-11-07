import React, { useState } from 'react';
import { Patient } from '../types/index.ts';
import { Printer, ArrowRight, Eye, CheckSquare, Square, Download } from 'lucide-react';

interface Props {
  patient: Patient;
  onBack: () => void;
}

export const OfficialFormPrint: React.FC<Props> = ({ patient, onBack }) => {
  const [activePage, setActivePage] = useState<number | 'all'>('all');

  const handlePrint = () => {
    window.print();
  };

  const renderCheck = (checked: boolean | undefined) => (
    <span className="inline-flex items-center mx-1 font-bold">
      {checked === undefined ? '—' : checked ? '☑' : '☐'}
    </span>
  );

  return (
    <div className="space-y-6">
      {/* Top Action Bar (hidden in print) */}
      <div className="no-print bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex flex-wrap items-center justify-between gap-4 sticky top-4 z-40">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-3 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition"
          >
            <ArrowRight className="w-5 h-5" />
            <span>بازگشت به پنل</span>
          </button>
          <div className="h-6 w-px bg-slate-200" />
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <span>📄 فرم رسمی ۵ صفحه‌ای وزارت بهداشت</span>
            <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-medium">
              مرجع قانونی طب کار
            </span>
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex bg-slate-100 p-1 rounded-lg text-xs font-medium">
            <button
              onClick={() => setActivePage('all')}
              className={`px-3 py-1.5 rounded-md transition ${activePage === 'all' ? 'bg-white shadow text-blue-600 font-bold' : 'text-slate-600'}`}
            >
              نمایش همه (۵ صفحه)
            </button>
            {[1, 2, 3, 4, 5].map((p) => (
              <button
                key={p}
                onClick={() => setActivePage(p)}
                className={`px-3 py-1.5 rounded-md transition ${activePage === p ? 'bg-white shadow text-blue-600 font-bold' : 'text-slate-600'}`}
              >
                صفحه {p}
              </button>
            ))}
          </div>

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold shadow transition"
          >
            <Printer className="w-4 h-4" />
            <span>چاپ / ذخیره PDF رسمی</span>
          </button>
        </div>
      </div>

      {/* Pages Container */}
      <div className="space-y-8 print:space-y-0">
        {/* ============================================================== */}
        {/* PAGE 1 */}
        {/* ============================================================== */}
        {(activePage === 'all' || activePage === 1) && (
          <div className="print-page bg-white p-6 sm:p-8 rounded-xl shadow-md border border-slate-300 max-w-[210mm] mx-auto text-[11px] leading-tight text-black print:shadow-none print:border-none print:p-0">
            {/* Header */}
            <div className="border-2 border-black p-3 mb-2">
              <div className="text-center font-bold text-xs mb-1">«به نام خدا»</div>
              <div className="grid grid-cols-12 items-center">
                <div className="col-span-3 border border-black p-2 text-center h-28 flex flex-col justify-center items-center">
                  {patient.photoUrl ? (
                    <img src={patient.photoUrl} alt="عکس شاغل" className="w-20 h-24 object-cover" />
                  ) : (
                    <div className="text-slate-500 text-[10px]">محل الصاق عکس</div>
                  )}
                </div>

                <div className="col-span-6 text-center space-y-1">
                  <div className="font-extrabold text-sm">وزارت بهداشت، درمان و آموزش پزشکی</div>
                  <div className="font-bold text-xs">معاونت بهداشت — مرکز سلامت محیط و کار</div>
                  <div className="font-extrabold text-base bg-slate-100 py-1 border border-black my-1">
                    پرونده پزشکی شاغل
                  </div>
                  <div className="flex justify-center items-center gap-4 text-[10px]">
                    <span>نوع معاینات:</span>
                    <span>{renderCheck(patient.examinationType === 'بدواستخدام')} بدواستخدام</span>
                    <span>{renderCheck(patient.examinationType === 'دوره‌ای')} دوره‌ای نوبت: ۱</span>
                    <span>{renderCheck(patient.examinationType === 'موردی')} موردی</span>
                  </div>
                </div>

                <div className="col-span-3 border border-black p-2 space-y-2 text-[10px]">
                  <div><strong>تاریخ:</strong> {patient.examinationDate}</div>
                  <div><strong>شماره پرونده:</strong> {patient.dossierNumber}</div>
                  <div><strong>شماره استخدامی:</strong> ثبت نشده</div>
                </div>
              </div>
            </div>

            {/* Section 1: مشخصات فردی شاغل */}
            <div className="border border-black mb-2">
              <div className="bg-slate-200 font-bold px-2 py-1 border-b border-black text-xs">
                ۱- مشخصات فردی شاغل:
              </div>
              <div className="p-2 space-y-1.5 text-[11px]">
                <div className="grid grid-cols-12 gap-2">
                  <div className="col-span-4"><strong>نام و نام خانوادگی:</strong> {patient.firstName} {patient.lastName}</div>
                  <div className="col-span-3"><strong>نام پدر:</strong> {patient.fatherName}</div>
                  <div className="col-span-2">
                    <strong>جنس:</strong> {renderCheck(patient.gender === 'مرد')} مرد {renderCheck(patient.gender === 'زن')} زن
                  </div>
                  <div className="col-span-3">
                    <strong>وضعیت تاهل:</strong> {renderCheck(patient.maritalStatus === 'متاهل')} متاهل {renderCheck(patient.maritalStatus === 'مجرد')} مجرد
                    <span className="mr-2"><strong>فرزند:</strong> {patient.childrenCount}</span>
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-2">
                  <div className="col-span-2"><strong>سال تولد:</strong> {patient.birthYear}</div>
                  <div className="col-span-4"><strong>کد ملی:</strong> {patient.nationalId}</div>
                  <div className="col-span-6">
                    <strong>وضعیت نظام وظیفه:</strong> {renderCheck(patient.militaryStatus === 'خدمت کرده')} خدمت کرده (رسته: {patient.militaryBranch || '—'})
                    {renderCheck(patient.militaryStatus === 'معافیت پزشکی')} معافیت پزشکی
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-2">
                  <div className="col-span-4"><strong>علت معافیت پزشکی:</strong> {patient.exemptionReason || 'ندارد'}</div>
                  <div className="col-span-8"><strong>آدرس و تلفن محل کار:</strong> {patient.workAddress} — {patient.phone}</div>
                </div>
              </div>
            </div>

            {/* Section 2: سوابق شغلی */}
            <div className="border border-black mb-2">
              <div className="bg-slate-200 font-bold px-2 py-1 border-b border-black text-xs">
                ۲- سوابق شغلی:
              </div>
              <table className="w-full border-collapse text-center text-[10px]">
                <thead>
                  <tr className="bg-slate-100 border-b border-black">
                    <th className="border-l border-black p-1 w-20">ردیف/نوع</th>
                    <th className="border-l border-black p-1">عنوان / سمت</th>
                    <th className="border-l border-black p-1">وظیفه محوله</th>
                    <th className="border-l border-black p-1 w-28">تاریخ اشتغال (از - تا)</th>
                    <th className="p-1">علت تغییر شغل</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-black">
                    <td className="border-l border-black p-1 font-bold">مشاغل فعلی</td>
                    <td className="border-l border-black p-1">{patient.jobTitle}</td>
                    <td className="border-l border-black p-1">{patient.duty}</td>
                    <td className="border-l border-black p-1">۱۴۰۰/۰۱/۱۵ تا اکنون</td>
                    <td className="p-1">شغل فعلی</td>
                  </tr>
                  <tr className="border-b border-black">
                    <td className="border-l border-black p-1 font-bold" rowSpan={2}>مشاغل قبلی</td>
                    <td className="border-l border-black p-1">{patient.jobHistories[1]?.title || 'ثبت نشده'}</td>
                    <td className="border-l border-black p-1">{patient.jobHistories[1]?.duty || 'ثبت نشده'}</td>
                    <td className="border-l border-black p-1">۱۳۹۶ تا ۱۳۹۹</td>
                    <td className="p-1">{patient.jobHistories[1]?.changeReason || 'ثبت نشده'}</td>
                  </tr>
                  <tr>
                    <td className="border-l border-black p-1">—</td>
                    <td className="border-l border-black p-1">—</td>
                    <td className="border-l border-black p-1">—</td>
                    <td className="p-1">—</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Section 3: ارزیابی عوامل زیان‌آور شغلی */}
            <div className="border border-black mb-2">
              <div className="bg-slate-200 font-bold px-2 py-1 border-b border-black text-xs">
                ۳- ارزیابی عوامل زیان‌آور شغلی:
              </div>
              <table className="w-full border-collapse text-[9.5px]">
                <thead>
                  <tr className="bg-slate-100 border-b border-black text-center font-bold">
                    <th className="border-l border-black p-1 w-16">مشاغل</th>
                    <th className="border-l border-black p-1 w-1/5">فیزیکی</th>
                    <th className="border-l border-black p-1 w-1/5">شیمیایی</th>
                    <th className="border-l border-black p-1 w-1/6">بیولوژیک</th>
                    <th className="border-l border-black p-1 w-1/5">ارگونومی</th>
                    <th className="p-1 w-1/6">روانی</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-black align-top">
                    <td className="border-l border-black p-1 font-bold text-center">مشاغل فعلی</td>
                    <td className="border-l border-black p-1 space-y-0.5">
                      <div>{renderCheck(patient.hseHazards.physical.includes('سر و صدا') ? true : undefined)} سر و صدا</div>
                      <div>{renderCheck(patient.hseHazards.physical.includes('ارتعاش') ? true : undefined)} ارتعاش</div>
                      <div>{renderCheck(patient.hseHazards.physical.includes('اشعه غیر یونیزان') ? true : undefined)} اشعه غیر یونیزان</div>
                      <div>{renderCheck(patient.hseHazards.physical.includes('اشعه یونیزان') ? true : undefined)} اشعه یونیزان</div>
                      <div>{renderCheck(patient.hseHazards.physical.includes('استرس حرارتی') ? true : undefined)} استرس حرارتی</div>
                      <div>{renderCheck(undefined)} سایر</div>
                    </td>
                    <td className="border-l border-black p-1 space-y-0.5">
                      <div>{renderCheck(patient.hseHazards.chemical.includes('گردوغبار') ? true : undefined)} گردوغبار</div>
                      <div>{renderCheck(patient.hseHazards.chemical.includes('دمه فلزات') ? true : undefined)} دمه فلزات</div>
                      <div>{renderCheck(patient.hseHazards.chemical.includes('حلال‌ها') ? true : undefined)} حلال</div>
                      <div>{renderCheck(patient.hseHazards.chemical.includes('آفت‌کش‌ها') ? true : undefined)} آفت‌کش‌ها</div>
                      <div>{renderCheck(patient.hseHazards.chemical.includes('اسید و بازها') ? true : undefined)} اسید و بازها</div>
                      <div>{renderCheck(patient.hseHazards.chemical.includes('گازها') ? true : undefined)} گازها</div>
                    </td>
                    <td className="border-l border-black p-1 space-y-0.5">
                      <div>{renderCheck(undefined)} گزش</div>
                      <div>{renderCheck(undefined)} باکتری</div>
                      <div>{renderCheck(undefined)} ویروس</div>
                      <div>{renderCheck(undefined)} انگل</div>
                      <div>{renderCheck(undefined)} سایر</div>
                    </td>
                    <td className="border-l border-black p-1 space-y-0.5">
                      <div>{renderCheck(patient.hseHazards.ergonomic.includes('ایستادن طولانی مدت') ? true : undefined)} ایستادن یا نشستن طولانی</div>
                      <div>{renderCheck(patient.hseHazards.ergonomic.includes('کار تکراری') ? true : undefined)} کار تکراری</div>
                      <div>{renderCheck(patient.hseHazards.ergonomic.includes('حمل و نقل بار سنگین') ? true : undefined)} حمل و نقل بار سنگین</div>
                      <div>{renderCheck(patient.hseHazards.ergonomic.includes('وضعیت نامناسب بدن') ? true : undefined)} وضعیت نامناسب بدن</div>
                      <div>{renderCheck(undefined)} سایر</div>
                    </td>
                    <td className="p-1 space-y-0.5">
                      <div>{renderCheck(patient.hseHazards.psychological.includes('نوبت‌کاری') ? true : undefined)} نوبت‌کاری</div>
                      <div>{renderCheck(patient.hseHazards.psychological.includes('استرسورهای شغلی') ? true : undefined)} استرسورهای شغلی</div>
                      <div>{renderCheck(undefined)} سایر</div>
                    </td>
                  </tr>
                  <tr className="border-b border-black align-top">
                    <td className="border-l border-black p-1 font-bold text-center">مشاغل قبلی</td>
                    <td className="border-l border-black p-1 space-y-0.5">
                      <div>{renderCheck(undefined)} سر و صدا</div>
                      <div>{renderCheck(undefined)} ارتعاش</div>
                      <div>{renderCheck(undefined)} اشعه غیر یونیزان/یونیزان</div>
                    </td>
                    <td className="border-l border-black p-1 space-y-0.5">
                      <div>{renderCheck(undefined)} گردوغبار</div>
                      <div>{renderCheck(undefined)} دمه فلزات/حلال</div>
                    </td>
                    <td className="border-l border-black p-1 space-y-0.5">
                      <div>{renderCheck(undefined)} بیولوژیک</div>
                    </td>
                    <td className="border-l border-black p-1 space-y-0.5">
                      <div>{renderCheck(undefined)} حمل و نقل بار سنگین</div>
                    </td>
                    <td className="p-1 space-y-0.5">
                      <div>{renderCheck(undefined)} روانی</div>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="p-2 border-t border-black space-y-2">
                <div>
                  <strong>توضیحات لازم در خصوص موارد ثبت شده در جدول و ثبت نتایج اندازه‌گیری‌ها:</strong>
                  <p className="mt-1 text-slate-800 pr-2">{patient.hseHazards.measurementNotes}</p>
                </div>
                <div>
                  <strong>نظریه کارشناسی بهداشت حرفه‌ای در خصوص شرایط محیط کار:</strong>
                  <p className="mt-1 text-slate-800 pr-2">{patient.hseHazards.expertOpinion}</p>
                </div>
                <div className="flex justify-between items-center pt-3 text-[10px] border-t border-dotted border-slate-400">
                  <div><strong>نام و نام خانوادگی کارشناس بهداشت حرفه‌ای:</strong> {patient.hseHazards.expertName}</div>
                  <div><strong>تاریخ:</strong> {patient.hseHazards.expertDate}</div>
                  <div className="border border-dashed border-black px-4 py-1"><strong>مهر و امضاء</strong></div>
                </div>
              </div>
            </div>

            <div className="text-center font-bold text-[10px] text-slate-500 mt-2">صفحه ۱ از ۵</div>
          </div>
        )}

        {/* ============================================================== */}
        {/* PAGE 2 */}
        {/* ============================================================== */}
        {(activePage === 'all' || activePage === 2) && (
          <div className="print-page bg-white p-6 sm:p-8 rounded-xl shadow-md border border-slate-300 max-w-[210mm] mx-auto text-[11px] leading-tight text-black print:shadow-none print:border-none print:p-0">
            {/* Header */}
            <div className="flex justify-between items-center border-b-2 border-black pb-1 mb-2 font-bold text-xs">
              <div>پرونده پزشکی شاغل</div>
              <div>نام و نام خانوادگی: {patient.firstName} {patient.lastName}</div>
              <div>شماره پرونده: {patient.dossierNumber}</div>
            </div>

            {/* Section 4: سابقه شخصی، خانوادگی و پزشکی */}
            <div className="border border-black mb-3">
              <div className="bg-slate-200 font-bold px-2 py-1 border-b border-black text-xs">
                ۴- سابقه شخصی، خانوادگی و پزشکی: (براساس پاسخ شاغل تکمیل شود)
              </div>
              <table className="w-full border-collapse text-[10px]">
                <thead>
                  <tr className="bg-slate-100 border-b border-black text-center font-bold">
                    <th className="border-l border-black p-1 w-8">ردیف</th>
                    <th className="border-l border-black p-1 text-right pr-2">سؤال</th>
                    <th className="border-l border-black p-1 w-10">بلی</th>
                    <th className="border-l border-black p-1 w-10">خیر</th>
                    <th className="p-1 text-right pr-2 w-1/3">توضیحات</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { id: 1, q: 'آیا سابقه بیماری دارید؟ ذکر نمائید.' },
                    { id: 2, q: 'درصورت ابتلا به بیماری آیا علایم شما در محیط کار تغییر می‌کند؟' },
                    { id: 3, q: 'درصورت ابتلا به بیماری آیا همکاران شما علایم مشابه در محل کار دارند؟' },
                    { id: 4, q: 'درصورت ابتلا به بیماری آیا علایم شما در زمان تعطیلات و مرخصی‌ها تغییر می‌کند؟' },
                    { id: 5, q: 'آیا به غذا، دارو یا ماده خاصی حساسیت دارید؟' },
                    { id: 6, q: 'آیا سابقه بستری در بیمارستان دارید؟ به چه دلیل؟' },
                    { id: 7, q: 'آیا سابقه عمل جراحی دارید؟ ذکر نمایید.' },
                    { id: 8, q: 'آیا سابقه سرطان یا بیماری مزمن در فامیل دارید؟ ذکر نمایید.' },
                    { id: 9, q: 'آیا داروی خاصی مصرف می‌کنید؟ ذکر نمایید.' },
                    { id: 10, q: 'آیا اکنون سیگار می‌کشید؟ (تعداد نخ روزانه / مدت استعمال)' },
                    { id: 11, q: 'آیا سابقه قبلی مصرف سیگار دارید؟ (تعداد نخ روزانه / مدت استعمال)' },
                    { id: 12, q: 'آیا در اوقات فراغت به ورزش یا سرگرمی خاصی مشغول هستید؟ ذکر کنید.' },
                    { id: 13, q: 'آیا تاکنون به حادثه شغلی دچار شده‌اید؟ نوع آسیب و علت.' },
                    { id: 14, q: 'آیا سابقه غیبت از کار به دلیل بیماری بیش از ۳ روز دارید؟' },
                    { id: 15, q: 'آیا منزل شما در مجاورت مرکز صنعتی قرار دارد؟' },
                    { id: 16, q: 'آیا سابقه معرفی به کمیسیون پزشکی را دارید؟' },
                  ].map((row) => {
                    const ans = patient.medicalHistory[row.id];
                    return (
                      <tr key={row.id} className="border-b border-black">
                        <td className="border-l border-black p-1 text-center font-bold">{row.id}</td>
                        <td className="border-l border-black p-1 pr-2">{row.q}</td>
                        <td className="border-l border-black p-1 text-center font-bold">{ans?.answer === 'بلی' ? '☑' : '☐'}</td>
                        <td className="border-l border-black p-1 text-center font-bold">{ans?.answer === 'خیر' ? '☑' : '☐'}</td>
                        <td className="p-1 pr-2 text-slate-800">{ans?.details || '—'}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <div className="p-3 border-t border-black bg-slate-50 flex justify-between items-center text-[10px]">
                <div className="font-bold">امضا و اثر انگشت شاغل مبنی بر تایید اظهارات فوق:</div>
                <div className="border border-black bg-white w-40 h-14 flex items-center justify-center text-slate-400">
                  (امضا و اثر انگشت دیجیتال شاغل)
                </div>
              </div>
            </div>

            {/* Section 5: معاینات (Physical Exam & Vitals) */}
            <div className="border border-black mb-2">
              <div className="bg-slate-200 font-bold px-2 py-1 border-b border-black text-xs flex justify-between">
                <span>۵- معاینات:</span>
                <span className="font-normal">
                  تاریخ: {patient.examinationDate} | وزن: {patient.vitals.weightKg} Kg | قد: {patient.vitals.heightCm} Cm | فشار خون: {patient.vitals.bpSystolic}/{patient.vitals.bpDiastolic} mmHg | نبض: {patient.vitals.pulseRate} bpm
                </span>
              </div>

              <div className="p-1 text-[9.5px]">
                <div className="text-slate-600 mb-1">
                  * درصورت وجود هریک از موارد زیر در محل مربوطه علامت زده و خصوصیات، شدت و مدت زمان در بخش توضیحات درج شود.
                </div>

                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-slate-100 border-y border-black text-center font-bold">
                      <th className="border-l border-black p-1 w-20">بررسی ارگان‌ها</th>
                      <th className="border-l border-black p-1">Symptom (علائم بیانی)</th>
                      <th className="border-l border-black p-1">Sign (نشانه‌های بالینی)</th>
                      <th className="p-1 w-1/4">توضیحات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* عمومی */}
                    <tr className="border-b border-black">
                      <td className="border-l border-black p-1 font-bold text-center">عمومی</td>
                      <td className="border-l border-black p-1">
                        {patient.systemExams?.['عمومی']?.symptoms?.join('، ') || 'ثبت نشده'} {renderCheck(patient.systemExams?.['عمومی'] ? patient.systemExams['عمومی'].noSymptoms : undefined)} بدون علامت
                      </td>
                      <td className="border-l border-black p-1">
                        {patient.systemExams?.['عمومی']?.signs?.join('، ') || 'ثبت نشده'} {renderCheck(patient.systemExams?.['عمومی'] ? patient.systemExams['عمومی'].noSigns : undefined)} بدون نشانه
                      </td>
                      <td className="p-1 text-slate-700">{patient.systemExams?.['عمومی']?.notes || 'ثبت نشده'}</td>
                    </tr>

                    {/* چشم */}
                    <tr className="border-b border-black">
                      <td className="border-l border-black p-1 font-bold text-center">چشم</td>
                      <td className="border-l border-black p-1">
                        {patient.systemExams?.['چشم']?.symptoms?.join('، ') || 'ثبت نشده'} {renderCheck(patient.systemExams?.['چشم'] ? patient.systemExams['چشم'].noSymptoms : undefined)} بدون علامت
                      </td>
                      <td className="border-l border-black p-1">
                        {patient.systemExams?.['چشم']?.signs?.join('، ') || 'ثبت نشده'} {renderCheck(patient.systemExams?.['چشم'] ? patient.systemExams['چشم'].noSigns : undefined)} بدون نشانه
                      </td>
                      <td className="p-1 text-slate-700">{patient.systemExams?.['چشم']?.notes || 'ثبت نشده'}</td>
                    </tr>

                    {/* پوست و مو و ناخن */}
                    <tr className="border-b border-black">
                      <td className="border-l border-black p-1 font-bold text-center">پوست، مو و ناخن</td>
                      <td className="border-l border-black p-1">
                        {patient.systemExams?.['پوست، مو و ناخن']?.symptoms?.join('، ') || 'ثبت نشده'} {renderCheck(patient.systemExams?.['پوست، مو و ناخن'] ? patient.systemExams['پوست، مو و ناخن'].noSymptoms : undefined)} بدون علامت
                      </td>
                      <td className="border-l border-black p-1">
                        {patient.systemExams?.['پوست، مو و ناخن']?.signs?.join('، ') || 'ثبت نشده'} {renderCheck(patient.systemExams?.['پوست، مو و ناخن'] ? patient.systemExams['پوست، مو و ناخن'].noSigns : undefined)} بدون نشانه
                      </td>
                      <td className="p-1 text-slate-700">{patient.systemExams?.['پوست، مو و ناخن']?.notes || 'ثبت نشده'}</td>
                    </tr>

                    {/* گوش، حلق، بینی و دهان */}
                    <tr className="border-b border-black">
                      <td className="border-l border-black p-1 font-bold text-center">گوش، حلق، بینی و دهان</td>
                      <td className="border-l border-black p-1">
                        {patient.systemExams?.['گوش، حلق، بینی و دهان']?.symptoms?.join('، ') || 'ثبت نشده'} {renderCheck(patient.systemExams?.['گوش، حلق، بینی و دهان'] ? patient.systemExams['گوش، حلق، بینی و دهان'].noSymptoms : undefined)} بدون علامت
                      </td>
                      <td className="border-l border-black p-1">
                        {patient.systemExams?.['گوش، حلق، بینی و دهان']?.signs?.join('، ') || 'ثبت نشده'} {renderCheck(patient.systemExams?.['گوش، حلق، بینی و دهان'] ? patient.systemExams['گوش، حلق، بینی و دهان'].noSigns : undefined)} بدون نشانه
                      </td>
                      <td className="p-1 text-slate-700">{patient.systemExams?.['گوش، حلق، بینی و دهان']?.notes || 'ثبت نشده'}</td>
                    </tr>

                    {/* سر و گردن */}
                    <tr>
                      <td className="border-l border-black p-1 font-bold text-center">سر و گردن</td>
                      <td className="border-l border-black p-1">
                        {patient.systemExams?.['سر و گردن']?.symptoms?.join('، ') || 'ثبت نشده'} {renderCheck(patient.systemExams?.['سر و گردن'] ? patient.systemExams['سر و گردن'].noSymptoms : undefined)} بدون علامت
                      </td>
                      <td className="border-l border-black p-1">
                        {patient.systemExams?.['سر و گردن']?.signs?.join('، ') || 'ثبت نشده'} {renderCheck(patient.systemExams?.['سر و گردن'] ? patient.systemExams['سر و گردن'].noSigns : undefined)} بدون نشانه
                      </td>
                      <td className="p-1 text-slate-700">{patient.systemExams?.['سر و گردن']?.notes || 'ثبت نشده'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="text-center font-bold text-[10px] text-slate-500 mt-2">صفحه ۲ از ۵</div>
          </div>
        )}

        {/* ============================================================== */}
        {/* PAGE 3 */}
        {/* ============================================================== */}
        {(activePage === 'all' || activePage === 3) && (
          <div className="print-page bg-white p-6 sm:p-8 rounded-xl shadow-md border border-slate-300 max-w-[210mm] mx-auto text-[11px] leading-tight text-black print:shadow-none print:border-none print:p-0">
            {/* Header */}
            <div className="flex justify-between items-center border-b-2 border-black pb-1 mb-2 font-bold text-xs">
              <div>پرونده پزشکی شاغل (ادامه معاینات فیزیکی)</div>
              <div>نام و نام خانوادگی: {patient.firstName} {patient.lastName}</div>
              <div>شماره پرونده: {patient.dossierNumber}</div>
            </div>

            <div className="border border-black mb-3">
              <div className="bg-slate-200 font-bold px-2 py-1 border-b border-black text-xs">
                ادامه جدول ۵- معاینات سیستم‌های بدن:
              </div>

              <table className="w-full border-collapse text-[10px]">
                <thead>
                  <tr className="bg-slate-100 border-b border-black text-center font-bold">
                    <th className="border-l border-black p-1 w-20">ارگان</th>
                    <th className="border-l border-black p-1">Symptom (علائم بیانی)</th>
                    <th className="border-l border-black p-1">Sign (نشانه‌های بالینی)</th>
                    <th className="p-1 w-1/4">توضیحات</th>
                  </tr>
                </thead>
                <tbody>
                  {/* ریه */}
                  <tr className="border-b border-black">
                    <td className="border-l border-black p-1 font-bold text-center">ریه</td>
                    <td className="border-l border-black p-1">
                      {patient.systemExams?.['ریه']?.symptoms?.join('، ') || 'ثبت نشده'} {renderCheck(patient.systemExams?.['ریه'] ? patient.systemExams['ریه'].noSymptoms : undefined)} بدون علامت
                    </td>
                    <td className="border-l border-black p-1">
                      {patient.systemExams?.['ریه']?.signs?.join('، ') || 'ثبت نشده'} {renderCheck(patient.systemExams?.['ریه'] ? patient.systemExams['ریه'].noSigns : undefined)} بدون نشانه
                    </td>
                    <td className="p-1 text-slate-700">{patient.systemExams?.['ریه']?.notes || 'ثبت نشده'}</td>
                  </tr>

                  {/* قلب و عروق */}
                  <tr className="border-b border-black">
                    <td className="border-l border-black p-1 font-bold text-center">قلب و عروق</td>
                    <td className="border-l border-black p-1">
                      {patient.systemExams?.['قلب و عروق']?.symptoms?.join('، ') || 'ثبت نشده'} {renderCheck(patient.systemExams?.['قلب و عروق'] ? patient.systemExams['قلب و عروق'].noSymptoms : undefined)} بدون علامت
                    </td>
                    <td className="border-l border-black p-1">
                      {patient.systemExams?.['قلب و عروق']?.signs?.join('، ') || 'ثبت نشده'} {renderCheck(patient.systemExams?.['قلب و عروق'] ? patient.systemExams['قلب و عروق'].noSigns : undefined)} بدون نشانه
                    </td>
                    <td className="p-1 text-slate-700">{patient.systemExams?.['قلب و عروق']?.notes || 'ثبت نشده'}</td>
                  </tr>

                  {/* شکم و لگن */}
                  <tr className="border-b border-black">
                    <td className="border-l border-black p-1 font-bold text-center">شکم و لگن</td>
                    <td className="border-l border-black p-1">
                      {patient.systemExams?.['شکم و لگن']?.symptoms?.join('، ') || 'ثبت نشده'} {renderCheck(patient.systemExams?.['شکم و لگن'] ? patient.systemExams['شکم و لگن'].noSymptoms : undefined)} بدون علامت
                    </td>
                    <td className="border-l border-black p-1">
                      {patient.systemExams?.['شکم و لگن']?.signs?.join('، ') || 'ثبت نشده'} {renderCheck(patient.systemExams?.['شکم و لگن'] ? patient.systemExams['شکم و لگن'].noSigns : undefined)} بدون نشانه
                    </td>
                    <td className="p-1 text-slate-700">{patient.systemExams?.['شکم و لگن']?.notes || 'ثبت نشده'}</td>
                  </tr>

                  {/* کلیه و مجاری ادراری */}
                  <tr className="border-b border-black">
                    <td className="border-l border-black p-1 font-bold text-center">کلیه و مجاری ادراری، تناسلی</td>
                    <td className="border-l border-black p-1">
                      {patient.systemExams?.['کلیه و مجاری ادراری']?.symptoms?.join('، ') || 'ثبت نشده'} {renderCheck(patient.systemExams?.['کلیه و مجاری ادراری'] ? patient.systemExams['کلیه و مجاری ادراری'].noSymptoms : undefined)} بدون علامت
                    </td>
                    <td className="border-l border-black p-1">
                      {patient.systemExams?.['کلیه و مجاری ادراری']?.signs?.join('، ') || 'ثبت نشده'} {renderCheck(patient.systemExams?.['کلیه و مجاری ادراری'] ? patient.systemExams['کلیه و مجاری ادراری'].noSigns : undefined)} بدون نشانه
                    </td>
                    <td className="p-1 text-slate-700">{patient.systemExams?.['کلیه و مجاری ادراری']?.notes || 'ثبت نشده'}</td>
                  </tr>

                  {/* اسکلتی و عضلانی */}
                  <tr className="border-b border-black">
                    <td className="border-l border-black p-1 font-bold text-center">اسکلتی و عضلانی</td>
                    <td className="border-l border-black p-1">
                      {patient.systemExams?.['اسکلتی و عضلانی']?.symptoms?.join('، ') || 'ثبت نشده'} {renderCheck(patient.systemExams?.['اسکلتی و عضلانی'] ? patient.systemExams['اسکلتی و عضلانی'].noSymptoms : undefined)} بدون علامت
                    </td>
                    <td className="border-l border-black p-1">
                      {patient.systemExams?.['اسکلتی و عضلانی']?.signs?.join('، ') || 'ثبت نشده'} {renderCheck(patient.systemExams?.['اسکلتی و عضلانی'] ? patient.systemExams['اسکلتی و عضلانی'].noSigns : undefined)} بدون نشانه
                    </td>
                    <td className="p-1 text-slate-700">{patient.systemExams?.['اسکلتی و عضلانی']?.notes || 'ثبت نشده'}</td>
                  </tr>

                  {/* سیستم عصبی */}
                  <tr className="border-b border-black">
                    <td className="border-l border-black p-1 font-bold text-center">سیستم عصبی</td>
                    <td className="border-l border-black p-1">
                      {patient.systemExams?.['سیستم عصبی']?.symptoms?.join('، ') || 'ثبت نشده'} {renderCheck(patient.systemExams?.['سیستم عصبی'] ? patient.systemExams['سیستم عصبی'].noSymptoms : undefined)} بدون علامت
                    </td>
                    <td className="border-l border-black p-1">
                      {patient.systemExams?.['سیستم عصبی']?.signs?.join('، ') || 'ثبت نشده'} {renderCheck(patient.systemExams?.['سیستم عصبی'] ? patient.systemExams['سیستم عصبی'].noSigns : undefined)} بدون نشانه
                    </td>
                    <td className="p-1 text-slate-700">{patient.systemExams?.['سیستم عصبی']?.notes || 'ثبت نشده'}</td>
                  </tr>

                  {/* اعصاب و روان */}
                  <tr>
                    <td className="border-l border-black p-1 font-bold text-center">اعصاب و روان</td>
                    <td className="border-l border-black p-1">
                      {patient.systemExams?.['اعصاب و روان']?.symptoms?.join('، ') || 'ثبت نشده'} {renderCheck(patient.systemExams?.['اعصاب و روان'] ? patient.systemExams['اعصاب و روان'].noSymptoms : undefined)} بدون علامت
                    </td>
                    <td className="border-l border-black p-1">
                      {patient.systemExams?.['اعصاب و روان']?.signs?.join('، ') || 'ثبت نشده'} {renderCheck(patient.systemExams?.['اعصاب و روان'] ? patient.systemExams['اعصاب و روان'].noSigns : undefined)} بدون نشانه
                    </td>
                    <td className="p-1 text-slate-700">{patient.systemExams?.['اعصاب و روان']?.notes || 'ثبت نشده'}</td>
                  </tr>
                </tbody>
              </table>

              <div className="p-3 border-t border-black space-y-2">
                <div>
                  <strong>سایر موارد و یافته‌های بالینی:</strong>
                  <p className="mt-1 text-slate-700">
                    {patient.systemExams?.['سایر']?.notes || 'ثبت نشده'}
                  </p>
                </div>

                <div className="flex justify-between items-center pt-6 text-[10px] border-t border-dotted border-slate-400 mt-4">
                  <div><strong>مشخصات پزشک معاینه‌کننده:</strong> {patient.doctorDecision?.doctorName || 'ثبت نشده'} (کد نظام پزشکی: {patient.doctorDecision?.medicalCode || 'ثبت نشده'})</div>
                  <div><strong>تاریخ معاینه:</strong> {patient.examinationDate}</div>
                  <div className="border border-dashed border-black px-6 py-2">
                    <strong>مهر و امضاء پزشک معاینه‌کننده</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center font-bold text-[10px] text-slate-500 mt-2">صفحه ۳ از ۵</div>
          </div>
        )}

        {/* ============================================================== */}
        {/* PAGE 4 */}
        {/* ============================================================== */}
        {(activePage === 'all' || activePage === 4) && (
          <div className="print-page bg-white p-6 sm:p-8 rounded-xl shadow-md border border-slate-300 max-w-[210mm] mx-auto text-[11px] leading-tight text-black print:shadow-none print:border-none print:p-0">
            {/* Header */}
            <div className="flex justify-between items-center border-b-2 border-black pb-1 mb-2 font-bold text-xs">
              <div>پرونده پزشکی شاغل (آزمایش‌ها و پاراکلینیک)</div>
              <div>نام و نام خانوادگی: {patient.firstName} {patient.lastName}</div>
              <div>شماره پرونده: {patient.dossierNumber}</div>
            </div>

            {/* Section 6: آزمایش‌ها (lab tests) */}
            <div className="border border-black mb-3">
              <div className="bg-slate-200 font-bold px-2 py-1 border-b border-black text-xs flex justify-between">
                <span>۶- آزمایش‌ها (Lab Tests):</span>
                <span className="font-normal">تاریخ انجام: {patient.labResults.date}</span>
              </div>

              <div className="p-2 space-y-2 text-[10.5px]">
                {/* CBC */}
                <div className="border border-slate-400 p-2 rounded bg-slate-50">
                  <div className="font-bold text-xs mb-1 text-blue-900">شمارش کامل سلول‌های خونی (CBC):</div>
                  <div className="grid grid-cols-5 gap-2 text-center">
                    <div>WBC: <strong>{patient.labResults.cbc.wbc}</strong> <span className="text-[9px]">×10³/µL</span></div>
                    <div>RBC: <strong>{patient.labResults.cbc.rbc}</strong> <span className="text-[9px]">×10⁶/µL</span></div>
                    <div>Hb: <strong>{patient.labResults.cbc.hb}</strong> <span className="text-[9px]">g/dL</span></div>
                    <div>HCT: <strong>{patient.labResults.cbc.hct}</strong> <span className="text-[9px]">%</span></div>
                    <div>Plt: <strong>{patient.labResults.cbc.plt}</strong> <span className="text-[9px]">×10³/µL</span></div>
                  </div>
                </div>

                {/* U/A */}
                <div className="border border-slate-400 p-2 rounded bg-slate-50">
                  <div className="font-bold text-xs mb-1 text-blue-900">آنالیز ادرار (U/A):</div>
                  <div className="grid grid-cols-5 gap-2 text-center">
                    <div>Prot: <strong>{patient.labResults.ua.prot}</strong></div>
                    <div>Glu: <strong>{patient.labResults.ua.glu}</strong></div>
                    <div>RBC: <strong>{patient.labResults.ua.rbc}</strong></div>
                    <div>WBC: <strong>{patient.labResults.ua.wbc}</strong></div>
                    <div>Bact: <strong>{patient.labResults.ua.bact}</strong></div>
                  </div>
                </div>

                {/* Biochemistry */}
                <div className="border border-slate-400 p-2 rounded">
                  <div className="font-bold text-xs mb-1 text-blue-900">بیوشیمی خون و سرولوژی:</div>
                  <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 text-center text-[10px]">
                    <div>FBS: <strong>{patient.labResults.biochemistry.fbs}</strong></div>
                    <div>Total Chol: <strong>{patient.labResults.biochemistry.chol}</strong></div>
                    <div>LDL: <strong>{patient.labResults.biochemistry.ldl}</strong></div>
                    <div>HDL: <strong>{patient.labResults.biochemistry.hdl}</strong></div>
                    <div>TG: <strong>{patient.labResults.biochemistry.tg}</strong></div>
                    <div>BUN: <strong>{patient.labResults.biochemistry.bun}</strong></div>
                    <div>Cr: <strong>{patient.labResults.biochemistry.cr}</strong></div>
                    <div>ALT: <strong>{patient.labResults.biochemistry.alt}</strong></div>
                    <div>AST: <strong>{patient.labResults.biochemistry.ast}</strong></div>
                    <div>Alk.Ph: <strong>{patient.labResults.biochemistry.alkPh}</strong></div>
                    <div>PSA: <strong>{patient.labResults.biochemistry.psa}</strong></div>
                    <div>HBS Ag: <strong>{patient.labResults.biochemistry.hbsAg}</strong></div>
                    <div>S/E & OB: <strong>{patient.labResults.biochemistry.seOb}</strong></div>
                    <div>PPD: <strong>{patient.labResults.biochemistry.ppd}</strong></div>
                  </div>
                </div>

                {/* Special / Vaccination */}
                <div>
                  <div className="font-bold text-xs mb-1">آزمایش‌های تخصصی / بیومارکرهای شغلی / واکسیناسیون:</div>
                  <div className="space-y-1">
                    {patient.labResults.specialTests.map((t, idx) => (
                      <div key={idx} className="flex justify-between border-b border-dashed border-slate-300 py-1">
                        <span>۱- نوع: <strong>{t.name}</strong></span>
                        <span>نتیجه: <strong>{t.result}</strong></span>
                        <span>تاریخ: {t.date}</span>
                      </div>
                    ))}
                    {patient.labResults.specialTests.length === 0 && (
                      <div className="text-slate-500 italic text-[10px]">مورد تخصصی اضافه ثبت نشده است.</div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Section 7: پاراکلینیک */}
            <div className="border border-black mb-2">
              <div className="bg-slate-200 font-bold px-2 py-1 border-b border-black text-xs">
                ۷- پاراکلینیک:
              </div>

              {/* الف- اپتومتری */}
              <div className="p-2 border-b border-black">
                <div className="font-bold text-xs mb-1">الف- اپتومتری (بینایی‌سنجی): تاریخ: {patient.paraclinic.optometry.date}</div>
                <table className="w-full border-collapse text-center text-[10px]">
                  <thead>
                    <tr className="bg-slate-100 border border-black">
                      <th colSpan={4} className="border-l border-black p-1">حدت بینایی</th>
                      <th colSpan={2} className="border-l border-black p-1">دید رنگی</th>
                      <th colSpan={2} className="border-l border-black p-1">میدان بینایی</th>
                      <th className="p-1">دید عمق</th>
                    </tr>
                    <tr className="border border-black text-[9px]">
                      <th colSpan={2} className="border-l border-black">بدون اصلاح (L / R)</th>
                      <th colSpan={2} className="border-l border-black">با اصلاح (L / R)</th>
                      <th className="border-l border-black">راست</th>
                      <th className="border-l border-black">چپ</th>
                      <th className="border-l border-black">راست</th>
                      <th className="border-l border-black">چپ</th>
                      <th>ثانیه آرک</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border border-black font-semibold">
                      <td className="border-l border-black p-1">{patient.paraclinic.optometry.vaLeftNoCorr}</td>
                      <td className="border-l border-black p-1">{patient.paraclinic.optometry.vaRightNoCorr}</td>
                      <td className="border-l border-black p-1">{patient.paraclinic.optometry.vaLeftWithCorr}</td>
                      <td className="border-l border-black p-1">{patient.paraclinic.optometry.vaRightWithCorr}</td>
                      <td className="border-l border-black p-1">{patient.paraclinic.optometry.colorVisionRight}</td>
                      <td className="border-l border-black p-1">{patient.paraclinic.optometry.colorVisionLeft}</td>
                      <td className="border-l border-black p-1">{patient.paraclinic.optometry.visualFieldRight}</td>
                      <td className="border-l border-black p-1">{patient.paraclinic.optometry.visualFieldLeft}</td>
                      <td className="p-1">{patient.paraclinic.optometry.depthArcSeconds} sec</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* ب- اودیومتری */}
              <div className="p-2 border-b border-black">
                <div className="font-bold text-xs mb-1">ب- اودیومتری (شنوایی‌سنجی): تاریخ: {patient.paraclinic.audiometry.date || 'ثبت نشده'}</div>
                <table className="w-full border-collapse text-center text-[9.5px]">
                  <thead>
                    <tr className="bg-slate-100 border border-black">
                      <th className="border-l border-black p-1 w-20">فرکانس (Hz)</th>
                      <th className="border-l border-black p-1">500</th>
                      <th className="border-l border-black p-1">1000</th>
                      <th className="border-l border-black p-1">2000</th>
                      <th className="border-l border-black p-1">3000</th>
                      <th className="border-l border-black p-1">4000</th>
                      <th className="border-l border-black p-1">6000</th>
                      <th className="border-l border-black p-1">8000</th>
                      <th className="border-l border-black p-1">SRT</th>
                      <th className="border-l border-black p-1">SDS</th>
                      <th className="p-1">تفسیر</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-black">
                      <td className="border-l border-black p-1 font-bold">گوش راست (AC)</td>
                      <td className="border-l border-black p-1">{patient.paraclinic.audiometry.rightAC[500]}</td>
                      <td className="border-l border-black p-1">{patient.paraclinic.audiometry.rightAC[1000]}</td>
                      <td className="border-l border-black p-1">{patient.paraclinic.audiometry.rightAC[2000]}</td>
                      <td className="border-l border-black p-1">{patient.paraclinic.audiometry.rightAC[3000]}</td>
                      <td className="border-l border-black p-1 bg-amber-50 font-bold">{patient.paraclinic.audiometry.rightAC[4000]}</td>
                      <td className="border-l border-black p-1">{patient.paraclinic.audiometry.rightAC[6000]}</td>
                      <td className="border-l border-black p-1">{patient.paraclinic.audiometry.rightAC[8000]}</td>
                      <td className="border-l border-black p-1">{patient.paraclinic.audiometry.srtRight}</td>
                      <td className="border-l border-black p-1">{patient.paraclinic.audiometry.sdsRight}</td>
                      <td className="p-1 text-right pr-1" rowSpan={2}>
                        {patient.paraclinic.audiometry.interpretationRight || 'ثبت نشده'}
                      </td>
                    </tr>
                    <tr className="border-b border-black">
                      <td className="border-l border-black p-1 font-bold">گوش راست (BC)</td>
                      <td className="border-l border-black p-1">{patient.paraclinic.audiometry.rightBC[500]}</td>
                      <td className="border-l border-black p-1">{patient.paraclinic.audiometry.rightBC[1000]}</td>
                      <td className="border-l border-black p-1">{patient.paraclinic.audiometry.rightBC[2000]}</td>
                      <td className="border-l border-black p-1">{patient.paraclinic.audiometry.rightBC[3000]}</td>
                      <td className="border-l border-black p-1 bg-amber-50 font-bold">{patient.paraclinic.audiometry.rightBC[4000]}</td>
                      <td className="border-l border-black p-1">{patient.paraclinic.audiometry.rightBC[6000]}</td>
                      <td className="border-l border-black p-1">{patient.paraclinic.audiometry.rightBC[8000]}</td>
                      <td className="border-l border-black p-1">—</td>
                      <td className="border-l border-black p-1">—</td>
                    </tr>
                    <tr className="border-b border-black">
                      <td className="border-l border-black p-1 font-bold">گوش چپ (AC)</td>
                      <td className="border-l border-black p-1">{patient.paraclinic.audiometry.leftAC[500]}</td>
                      <td className="border-l border-black p-1">{patient.paraclinic.audiometry.leftAC[1000]}</td>
                      <td className="border-l border-black p-1">{patient.paraclinic.audiometry.leftAC[2000]}</td>
                      <td className="border-l border-black p-1">{patient.paraclinic.audiometry.leftAC[3000]}</td>
                      <td className="border-l border-black p-1 bg-amber-100 font-bold">{patient.paraclinic.audiometry.leftAC[4000]}</td>
                      <td className="border-l border-black p-1">{patient.paraclinic.audiometry.leftAC[6000]}</td>
                      <td className="border-l border-black p-1">{patient.paraclinic.audiometry.leftAC[8000]}</td>
                      <td className="border-l border-black p-1">{patient.paraclinic.audiometry.srtLeft}</td>
                      <td className="border-l border-black p-1">{patient.paraclinic.audiometry.sdsLeft}</td>
                      <td className="p-1 text-right pr-1" rowSpan={2}>
                        {patient.paraclinic.audiometry.interpretationLeft || 'ثبت نشده'}
                      </td>
                    </tr>
                    <tr>
                      <td className="border-l border-black p-1 font-bold">گوش چپ (BC)</td>
                      <td className="border-l border-black p-1">{patient.paraclinic.audiometry.leftBC[500]}</td>
                      <td className="border-l border-black p-1">{patient.paraclinic.audiometry.leftBC[1000]}</td>
                      <td className="border-l border-black p-1">{patient.paraclinic.audiometry.leftBC[2000]}</td>
                      <td className="border-l border-black p-1">{patient.paraclinic.audiometry.leftBC[3000]}</td>
                      <td className="border-l border-black p-1 bg-amber-100 font-bold">{patient.paraclinic.audiometry.leftBC[4000]}</td>
                      <td className="border-l border-black p-1">{patient.paraclinic.audiometry.leftBC[6000]}</td>
                      <td className="border-l border-black p-1">{patient.paraclinic.audiometry.leftBC[8000]}</td>
                      <td className="border-l border-black p-1">—</td>
                      <td className="border-l border-black p-1">—</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* ج- اسپیرومتری */}
              <div className="p-2">
                <div className="font-bold text-xs mb-1">ج- اسپیرومتری (آزمون عملکرد ریه): تاریخ: {patient.paraclinic.spirometry.date || 'ثبت نشده'}</div>
                <table className="w-full border-collapse text-center text-[10px]">
                  <thead>
                    <tr className="bg-slate-100 border border-black">
                      <th className="border-l border-black p-1">FEV1 (مقدار/درصد)</th>
                      <th className="border-l border-black p-1">FVC (مقدار/درصد)</th>
                      <th className="border-l border-black p-1">FEV1/FVC%</th>
                      <th className="border-l border-black p-1">FEF 25-75%</th>
                      <th className="border-l border-black p-1">PEF</th>
                      <th className="p-1">VEXT (Back Extrapolated)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border border-black font-semibold">
                      <td className="border-l border-black p-1">{patient.paraclinic.spirometry.fev1 || 'ثبت نشده'}</td>
                      <td className="border-l border-black p-1">{patient.paraclinic.spirometry.fvc || 'ثبت نشده'}</td>
                      <td className="border-l border-black p-1">{patient.paraclinic.spirometry.fev1FvcRatio || 'ثبت نشده'}</td>
                      <td className="border-l border-black p-1">{patient.paraclinic.spirometry.fef2575 || 'ثبت نشده'}</td>
                      <td className="border-l border-black p-1">{patient.paraclinic.spirometry.pef || 'ثبت نشده'}</td>
                      <td className="p-1">{patient.paraclinic.spirometry.vext || 'ثبت نشده'}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="mt-1 text-[10px]">
                  <strong>تفسیر اسپیرومتری:</strong> {patient.paraclinic.spirometry.interpretation || 'ثبت نشده'}
                </div>
              </div>
            </div>

            <div className="text-center font-bold text-[10px] text-slate-500 mt-2">صفحه ۴ از ۵</div>
          </div>
        )}

        {/* ============================================================== */}
        {/* PAGE 5 */}
        {/* ============================================================== */}
        {(activePage === 'all' || activePage === 5) && (
          <div className="print-page bg-white p-6 sm:p-8 rounded-xl shadow-md border border-slate-300 max-w-[210mm] mx-auto text-[11px] leading-tight text-black print:shadow-none print:border-none print:p-0">
            {/* Header */}
            <div className="flex justify-between items-center border-b-2 border-black pb-1 mb-2 font-bold text-xs">
              <div>پرونده پزشکی شاغل (نظریه نهایی و ارجاعات)</div>
              <div>نام و نام خانوادگی: {patient.firstName} {patient.lastName}</div>
              <div>شماره پرونده: {patient.dossierNumber}</div>
            </div>

            {/* Part D: سایر اقدامات پاراکلینیک */}
            <div className="border border-black mb-3">
              <div className="bg-slate-200 font-bold px-2 py-1 border-b border-black text-xs">
                د- سایر اقدامات پاراکلینیک در صورت لزوم:
              </div>
              <div className="p-2 space-y-2 text-[10.5px]">
                <div className="border-b border-dotted border-slate-400 pb-1 flex justify-between">
                  <div><strong>یافته‌های CXR (P-A):</strong> {patient.paraclinic.other.cxrFindings}</div>
                  <div><strong>تاریخ انجام:</strong> {patient.paraclinic.other.cxrDate}</div>
                </div>

                <div className="border-b border-dotted border-slate-400 pb-1 flex justify-between">
                  <div><strong>یافته‌های ECG:</strong> {patient.paraclinic.other.ecgFindings}</div>
                  <div><strong>تاریخ انجام:</strong> {patient.paraclinic.other.ecgDate}</div>
                </div>

                <div>
                  <strong>نتیجه رادیوگرافی، سونوگرافی، سی‌تی اسکن و سایر موارد:</strong>
                  <p className="mt-1 text-slate-700 pr-2">
                    {patient.paraclinic.other.ultrasoundFindings || 'ثبت نشده'}
                  </p>
                </div>
              </div>
            </div>

            {/* Section 8: ثبت مشاوره‌ها و نتایج ارجاع‌ها */}
            <div className="border border-black mb-3">
              <div className="bg-slate-200 font-bold px-2 py-1 border-b border-black text-xs">
                ۸- ثبت مشاوره‌ها و نتایج ارجاع‌ها:
              </div>
              <table className="w-full border-collapse text-[10px]">
                <thead>
                  <tr className="bg-slate-100 border-b border-black text-center font-bold">
                    <th className="border-l border-black p-1 w-1/2">مشاوره یا ارجاع</th>
                    <th className="p-1 w-1/2">نتیجه ارجاع</th>
                  </tr>
                </thead>
                <tbody>
                  {patient.referrals.map((ref, idx) => (
                    <tr key={idx} className="border-b border-black">
                      <td className="border-l border-black p-2 space-y-1">
                        <div><strong>تاریخ:</strong> {ref.date}</div>
                        <div><strong>نوع تخصص:</strong> {ref.specialty}</div>
                        <div><strong>علت ارجاع:</strong> {ref.reason}</div>
                      </td>
                      <td className="p-2 align-top text-slate-800">
                        {ref.result || 'ثبت نشده'}
                      </td>
                    </tr>
                  ))}
                  {patient.referrals.length === 0 && (
                    <tr className="border-b border-black">
                      <td className="border-l border-black p-2 text-slate-500 italic">ارجاع ثبت نشده</td>
                      <td className="p-2 text-slate-500 italic">—</td>
                    </tr>
                  )}
                </tbody>
              </table>

              <div className="p-2 bg-amber-50 text-amber-900 border-t border-black text-[10px] font-bold">
                ⚠️ تذکر مهم: در صورت نیاز به ارجاع، اعلام نظریه نهایی منوط به مشخص شدن نتیجه ارجاع خواهد بود.
              </div>
            </div>

            {/* Section 9: نظریه نهایی پزشک متخصص طب کار */}
            <div className="border-2 border-black p-3 space-y-2 bg-slate-50/50">
              <div className="bg-slate-200 font-extrabold px-2 py-1 border border-black text-xs text-center">
                ۹- نظریه نهایی پزشک متخصص طب کار / سلامت شغلی در خصوص کار شاغل:
              </div>

              <div className="space-y-1.5 text-xs font-bold pt-1">
                <div className="flex items-center gap-2">
                  <span>{renderCheck(patient.doctorDecision?.opinion === 'balamaneh')}</span>
                  <span>الف- بلامانع</span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span>{renderCheck(patient.doctorDecision?.opinion === 'mashroot')}</span>
                    <span>ب- مشروط</span>
                  </div>
                  {patient.doctorDecision?.opinion === 'mashroot' && (
                    <div className="pr-6 font-normal text-[11px] text-blue-900 bg-white p-1.5 border border-slate-300 rounded">
                      <strong>ذکر شروط:</strong> {patient.doctorDecision.conditions}
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span>{renderCheck(patient.doctorDecision?.opinion === 'adam_salahiyat')}</span>
                    <span>ج- عدم صلاحیت / تناسب پزشکی جهت انجام شغل مورد نظر</span>
                  </div>
                  {patient.doctorDecision?.opinion === 'adam_salahiyat' && (
                    <div className="pr-6 font-normal text-[11px] text-red-900 bg-white p-1.5 border border-slate-300 rounded">
                      <strong>ذکر علت یا علل رد صلاحیت پزشکی:</strong> {patient.doctorDecision.unfitReasons}
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t border-black pt-2">
                <strong className="text-xs">توصیه‌های پزشکی لازم:</strong>
                <p className="mt-1 text-slate-800 text-[11px] leading-relaxed bg-white p-2 border border-slate-300 rounded">
                  {patient.doctorDecision?.recommendations || 'ثبت نشده'}
                </p>
              </div>

              <div className="border-t-2 border-black pt-4 mt-3 flex justify-between items-center text-[10.5px]">
                <div>
                  <strong>مشخصات پزشک متخصص طب کار / ارائه‌دهنده نظر نهایی:</strong>
                  <div className="mt-1 font-bold text-slate-900">{patient.doctorDecision?.doctorName || 'ثبت نشده'}</div>
                </div>

                <div>
                  <strong>کد معاینات سلامت شغلی:</strong>
                  <div className="mt-1 font-bold">{patient.doctorDecision?.medicalCode || 'ثبت نشده'}</div>
                </div>

                <div>
                  <strong>تاریخ:</strong> {patient.doctorDecision?.date || 'ثبت نشده'}
                </div>

                <div className="border-2 border-black p-2 text-center bg-white min-w-[120px]">
                  <div className="font-bold text-[10px]">مهر و امضاء پزشک طب کار</div>
                  <div className="text-[9px] text-emerald-700 mt-1 flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>امضای دیجیتال معتبر ثبت نشده است</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center font-bold text-[10px] text-slate-500 mt-2">صفحه ۵ از ۵ — پایان فرم رسمی پرونده پزشکی شاغل</div>
          </div>
        )}
      </div>
    </div>
  );
};
