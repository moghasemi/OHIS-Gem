import React, { useState } from 'react';
import { Ticket } from '../types/index.ts';
import { TICKETS_DATA } from '../data/mockData.ts';
import { Ticket as TicketIcon, Plus, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

export const TicketsView: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>(TICKETS_DATA);
  const [showNewModal, setShowNewModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('فنی / سامانه');
  const [newPriority, setNewPriority] = useState<'بالا' | 'متوسط' | 'پایین'>('متوسط');
  const [newDescription, setNewDescription] = useState('');

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    const ticket: Ticket = {
      id: 'tkt-' + Date.now(),
      ticketNumber: 'TKT-1405-' + Math.floor(100 + Math.random() * 900),
      title: newTitle,
      sender: 'کاربر جاری سیستم',
      date: '۱۴۰۵/۰۴/۰۲',
      priority: newPriority,
      status: 'باز',
      category: newCategory,
      description: newDescription,
    };

    setTickets([ticket, ...tickets]);
    setShowNewModal(false);
    setNewTitle('');
    setNewDescription('');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
            <TicketIcon className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-slate-900 text-sm">
              سیستم تیکتینگ و پشتیبانی داخلی مرکز طب کار
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              ثبت و پیگیری درخواست‌های فنی، خطاهای دستگاه‌ها، بازبینی الگوها و هماهنگی سازمانی
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowNewModal(true)}
          className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-2 rounded-lg text-xs font-bold transition shadow"
        >
          <Plus className="w-4 h-4" />
          <span>ثبت تیکت پشتیبانی جدید</span>
        </button>
      </div>

      {/* Tickets List */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3">شماره تیکت</th>
                <th className="p-3">عنوان درخواست</th>
                <th className="p-3">دسته‌بندی</th>
                <th className="p-3">ارسال‌کننده</th>
                <th className="p-3">اولویت</th>
                <th className="p-3">تاریخ</th>
                <th className="p-3">وضعیت</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {tickets.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50">
                  <td className="p-3 font-mono font-bold text-blue-700">{t.ticketNumber}</td>
                  <td className="p-3 font-semibold text-slate-900">
                    <div>{t.title}</div>
                    <div className="text-[11px] text-slate-500 font-normal line-clamp-1 mt-0.5">{t.description}</div>
                  </td>
                  <td className="p-3 text-slate-600">{t.category}</td>
                  <td className="p-3 text-slate-700">{t.sender}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        t.priority === 'بالا'
                          ? 'bg-rose-100 text-rose-800'
                          : t.priority === 'متوسط'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {t.priority}
                    </span>
                  </td>
                  <td className="p-3 font-mono text-slate-500">{t.date}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        t.status === 'بسته شده'
                          ? 'bg-emerald-100 text-emerald-800'
                          : t.status === 'در حال بررسی'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {t.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Ticket Modal */}
      {showNewModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-xl">
            <h3 className="font-bold text-slate-900 text-base border-b border-slate-100 pb-2">
              ثبت تیکت پشتیبانی جدید
            </h3>
            <form onSubmit={handleCreateTicket} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">عنوان تیکت</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="مثلاً: مشکل در خروجی ادیومتری..."
                  className="w-full border border-slate-300 rounded-lg p-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">دسته‌بندی</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg p-2"
                  >
                    <option value="آزمایشگاه">آزمایشگاه</option>
                    <option value="پاراکلینیک">پاراکلینیک</option>
                    <option value="معاینات پزشک">معاینات پزشک</option>
                    <option value="فنی / سامانه">فنی / سامانه</option>
                    <option value="مالی و قراردادها">مالی و قراردادها</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">اولویت</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as any)}
                    className="w-full border border-slate-300 rounded-lg p-2"
                  >
                    <option value="پایین">پایین</option>
                    <option value="متوسط">متوسط</option>
                    <option value="بالا">بالا (فوری)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">شرح کامل درخواست</label>
                <textarea
                  rows={4}
                  required
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="جزئیات مشکل یا نیازمندی خود را بنویسید..."
                  className="w-full border border-slate-300 rounded-lg p-2"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 font-bold"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold"
                >
                  ارسال تیکت
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
