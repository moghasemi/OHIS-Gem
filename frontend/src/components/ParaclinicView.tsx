import React, { useState } from 'react';
import { Patient } from '../types/index.ts';
import { calculatePTA } from '../domain/rules.ts';
import { Eye, Activity, Wind, FileText, CheckCircle2, Save, AlertTriangle } from 'lucide-react';

interface Props {
  patient: Patient;
  onUpdatePatient: (updated: Patient) => void;
  onNavigateTab: (tabId: string) => void;
}

export const ParaclinicView: React.FC<Props> = ({ patient, onUpdatePatient, onNavigateTab }) => {
  const [subTab, setSubTab] = useState<'opto' | 'audio' | 'spiro' | 'other'>('audio');
  const [paraData, setParaData] = useState(patient.paraclinic);
  const [isSaved, setIsSaved] = useState(false);

  const rightPTA = calculatePTA(paraData.audiometry.rightAC);
  const leftPTA = calculatePTA(paraData.audiometry.leftAC);

  const handleAudioFreqChange = (ear: 'rightAC' | 'leftAC', freq: number, val: number) => {
    setParaData({
      ...paraData,
      audiometry: {
        ...paraData.audiometry,
        [ear]: {
          ...paraData.audiometry[ear],
          [freq]: val,
        },
      },
    });
  };

  const handleSave = () => {
    const updated: Patient = {
      ...patient,
      paraclinic: paraData,
      status: patient.status === 'PARACLINIC_PENDING' ? 'HSE_PENDING' : patient.status,
    };
    onUpdatePatient(updated);
    setIsSaved(true);
    setTimeout(() => {
      onNavigateTab('hse');
    }, 1000);
  };

  const FREQS = [500, 1000, 2000, 3000, 4000, 6000, 8000];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center font-bold">
            <Eye className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-slate-900 text-sm">
              پاراکلینیک (جدول ۷ فرم رسمی) — شاغل: {patient.firstName} {patient.lastName}
            </div>
            <div className="text-xs text-slate-500 font-mono mt-0.5">
              پرونده: {patient.dossierNumber} | شغل: {patient.jobTitle}
            </div>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-bold shadow transition"
        >
          <Save className="w-4 h-4" />
          <span>تأیید پاراکلینیک و ادامه به ارزیابی HSE</span>
        </button>
      </div>

      {isSaved && (
        <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>نتایج پاراکلینیک ذخیره و پرونده به ایستگاه بهداشت حرفه‌ای ارسال شد.</span>
        </div>
      )}

      {/* Sub Tabs */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs">
        <div className="flex bg-slate-100 p-1 rounded-lg gap-1 max-w-xl text-xs font-bold">
          <button
            onClick={() => setSubTab('opto')}
            className={`flex-1 py-2 rounded-md transition flex items-center justify-center gap-1.5 ${
              subTab === 'opto' ? 'bg-white shadow text-blue-700' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>الف- بینایی‌سنجی (اپتومتری)</span>
          </button>
          <button
            onClick={() => setSubTab('audio')}
            className={`flex-1 py-2 rounded-md transition flex items-center justify-center gap-1.5 ${
              subTab === 'audio' ? 'bg-white shadow text-blue-700' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>ب- شنوایی‌سنجی (ادیومتری)</span>
          </button>
          <button
            onClick={() => setSubTab('spiro')}
            className={`flex-1 py-2 rounded-md transition flex items-center justify-center gap-1.5 ${
              subTab === 'spiro' ? 'bg-white shadow text-blue-700' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Wind className="w-4 h-4" />
            <span>ج- اسپیرومتری (ریه)</span>
          </button>
          <button
            onClick={() => setSubTab('other')}
            className={`flex-1 py-2 rounded-md transition flex items-center justify-center gap-1.5 ${
              subTab === 'other' ? 'bg-white shadow text-blue-700' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>د- CXR و ECG</span>
          </button>
        </div>

        {/* SUBTAB 1: OPTOMETRY */}
        {subTab === 'opto' && (
          <div className="mt-6 space-y-4 text-xs">
            <h4 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">
              جدول ۷ - الف: نتایج بینایی‌سنجی و سلامت چشم
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
                <span className="font-bold text-slate-800">حدت بینایی بدون اصلاح (L/R)</span>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="text-[10px] text-slate-500">چشم چپ (L)</label>
                    <input
                      type="text"
                      value={paraData.optometry.vaLeftNoCorr}
                      onChange={(e) =>
                        setParaData({ ...paraData, optometry: { ...paraData.optometry, vaLeftNoCorr: e.target.value } })
                      }
                      className="w-full border border-slate-300 rounded p-1 text-center font-mono bg-white"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-[10px] text-slate-500">چشم راست (R)</label>
                    <input
                      type="text"
                      value={paraData.optometry.vaRightNoCorr}
                      onChange={(e) =>
                        setParaData({ ...paraData, optometry: { ...paraData.optometry, vaRightNoCorr: e.target.value } })
                      }
                      className="w-full border border-slate-300 rounded p-1 text-center font-mono bg-white"
                    />
                  </div>
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
                <span className="font-bold text-slate-800">حدت بینایی با اصلاح (عینک)</span>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="text-[10px] text-slate-500">چشم چپ (L)</label>
                    <input
                      type="text"
                      value={paraData.optometry.vaLeftWithCorr}
                      onChange={(e) =>
                        setParaData({ ...paraData, optometry: { ...paraData.optometry, vaLeftWithCorr: e.target.value } })
                      }
                      className="w-full border border-slate-300 rounded p-1 text-center font-mono bg-white"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-[10px] text-slate-500">چشم راست (R)</label>
                    <input
                      type="text"
                      value={paraData.optometry.vaRightWithCorr}
                      onChange={(e) =>
                        setParaData({ ...paraData, optometry: { ...paraData.optometry, vaRightWithCorr: e.target.value } })
                      }
                      className="w-full border border-slate-300 rounded p-1 text-center font-mono bg-white"
                    />
                  </div>
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
                <span className="font-bold text-slate-800">تست دید رنگی (Ishihara)</span>
                <div className="flex gap-2">
                  <select
                    value={paraData.optometry.colorVisionRight}
                    onChange={(e) =>
                      setParaData({ ...paraData, optometry: { ...paraData.optometry, colorVisionRight: e.target.value as any } })
                    }
                    className="w-full border border-slate-300 rounded p-1 bg-white font-bold"
                  >
                    <option value="طبیعی">راست: طبیعی</option>
                    <option value="غیرطبیعی">راست: کوررنگی</option>
                  </select>
                  <select
                    value={paraData.optometry.colorVisionLeft}
                    onChange={(e) =>
                      setParaData({ ...paraData, optometry: { ...paraData.optometry, colorVisionLeft: e.target.value as any } })
                    }
                    className="w-full border border-slate-300 rounded p-1 bg-white font-bold"
                  >
                    <option value="طبیعی">چپ: طبیعی</option>
                    <option value="غیرطبیعی">چپ: کوررنگی</option>
                  </select>
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
                <span className="font-bold text-slate-800">دید عمق (Stereopsis)</span>
                <div>
                  <input
                    type="text"
                    value={paraData.optometry.depthArcSeconds}
                    onChange={(e) =>
                      setParaData({ ...paraData, optometry: { ...paraData.optometry, depthArcSeconds: e.target.value } })
                    }
                    className="w-full border border-slate-300 rounded p-1 text-center font-mono bg-white font-bold"
                    placeholder="ثانیه آرک (مثلاً ۳۰)"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block text-center">استاندارد رانندگی/اپراتوری: &lt; 40 sec</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 2: AUDIOMETRY */}
        {subTab === 'audio' && (
          <div className="mt-6 space-y-6 text-xs">
            <div className="flex flex-wrap items-center justify-between border-b border-slate-100 pb-2">
              <h4 className="font-bold text-slate-900 text-sm">
                جدول ۷ - ب: ثبت مقادیر آستانه شنوایی در فرکانس‌های شغلی (Audiogram)
              </h4>
              <div className="flex items-center gap-3 text-xs">
                <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-bold border border-blue-200">
                  PTA گوش راست: {rightPTA} dB
                </span>
                <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded font-bold border border-indigo-200">
                  PTA گوش چپ: {leftPTA} dB
                </span>
              </div>
            </div>

            {/* Threshold Input Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-center border-collapse">
                <thead>
                  <tr className="bg-slate-100 border border-slate-300 text-slate-700 font-bold">
                    <th className="p-2 border border-slate-300 w-32">گوش / مسیر</th>
                    {FREQS.map((f) => (
                      <th key={f} className={`p-2 border border-slate-300 ${f === 4000 ? 'bg-amber-100 text-amber-900' : ''}`}>
                        {f} Hz
                        {f === 4000 && <span className="block text-[9px] font-normal">نویز صنعتی</span>}
                      </th>
                    ))}
                    <th className="p-2 border border-slate-300 w-24">SRT</th>
                    <th className="p-2 border border-slate-300 w-24">SDS</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 border border-slate-300 font-bold text-red-600 bg-red-50/50">گوش راست (AC) ○</td>
                    {FREQS.map((f) => (
                      <td key={f} className={`p-1 border border-slate-300 ${f === 4000 ? 'bg-amber-50' : ''}`}>
                        <input
                          type="number"
                          value={paraData.audiometry.rightAC[f] || 0}
                          onChange={(e) => handleAudioFreqChange('rightAC', f, Number(e.target.value))}
                          className="w-12 text-center p-1 border border-slate-300 rounded font-mono font-bold"
                        />
                      </td>
                    ))}
                    <td className="p-2 border border-slate-300 font-mono font-bold">{paraData.audiometry.srtRight} dB</td>
                    <td className="p-2 border border-slate-300 font-mono font-bold">{paraData.audiometry.sdsRight}</td>
                  </tr>

                  <tr>
                    <td className="p-2 border border-slate-300 font-bold text-blue-600 bg-blue-50/50">گوش چپ (AC) ✕</td>
                    {FREQS.map((f) => (
                      <td key={f} className={`p-1 border border-slate-300 ${f === 4000 ? 'bg-amber-50' : ''}`}>
                        <input
                          type="number"
                          value={paraData.audiometry.leftAC[f] || 0}
                          onChange={(e) => handleAudioFreqChange('leftAC', f, Number(e.target.value))}
                          className="w-12 text-center p-1 border border-slate-300 rounded font-mono font-bold"
                        />
                      </td>
                    ))}
                    <td className="p-2 border border-slate-300 font-mono font-bold">{paraData.audiometry.srtLeft} dB</td>
                    <td className="p-2 border border-slate-300 font-mono font-bold">{paraData.audiometry.sdsLeft}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Live Visual Audiogram Graph */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-slate-800 text-xs">نمودار زنده اودیوگرام (Audiogram Threshold Curves):</span>
                <div className="flex gap-4 text-[11px] font-bold">
                  <span className="text-red-600 flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-600 inline-block" />
                    گوش راست (Right AC)
                  </span>
                  <span className="text-blue-600 flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block" />
                    گوش چپ (Left AC)
                  </span>
                </div>
              </div>

              {/* SVG Audiogram */}
              <div className="w-full h-48 bg-white border border-slate-300 rounded-lg p-2 relative">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 700 160">
                  {/* Grid Lines for Decibels 0 to 80 dB */}
                  {[0, 20, 40, 60, 80].map((db, i) => (
                    <g key={db}>
                      <line x1="40" y1={10 + i * 35} x2="680" y2={10 + i * 35} stroke="#e2e8f0" strokeDasharray="3,3" />
                      <text x="15" y={14 + i * 35} fontSize="10" fill="#94a3b8" fontFamily="monospace">
                        {db}dB
                      </text>
                    </g>
                  ))}

                  {/* Frequency Vertical Lines */}
                  {FREQS.map((f, i) => {
                    const x = 70 + i * 90;
                    return (
                      <g key={f}>
                        <line x1={x} y1="10" x2={x} y2="150" stroke="#f1f5f9" />
                        <text x={x} y="160" fontSize="10" fill="#64748b" textAnchor="middle" fontFamily="monospace">
                          {f}
                        </text>
                      </g>
                    );
                  })}

                  {/* Right Ear Polyline (Red Circle) */}
                  <polyline
                    fill="none"
                    stroke="#dc2626"
                    strokeWidth="2.5"
                    points={FREQS.map((f, i) => {
                      const val = paraData.audiometry.rightAC[f] || 0;
                      const x = 70 + i * 90;
                      const y = 10 + (val / 80) * 140;
                      return `${x},${y}`;
                    }).join(' ')}
                  />
                  {FREQS.map((f, i) => {
                    const val = paraData.audiometry.rightAC[f] || 0;
                    const x = 70 + i * 90;
                    const y = 10 + (val / 80) * 140;
                    return <circle key={f} cx={x} cy={y} r="4" fill="#dc2626" />;
                  })}

                  {/* Left Ear Polyline (Blue Cross) */}
                  <polyline
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="2.5"
                    points={FREQS.map((f, i) => {
                      const val = paraData.audiometry.leftAC[f] || 0;
                      const x = 70 + i * 90;
                      const y = 10 + (val / 80) * 140;
                      return `${x},${y}`;
                    }).join(' ')}
                  />
                  {FREQS.map((f, i) => {
                    const val = paraData.audiometry.leftAC[f] || 0;
                    const x = 70 + i * 90;
                    const y = 10 + (val / 80) * 140;
                    return <rect key={f} x={x - 3} y={y - 3} width="6" height="6" fill="#2563eb" />;
                  })}
                </svg>
              </div>

              {paraData.audiometry.leftAC[4000] >= 35 && (
                <div className="mt-2 p-2 bg-amber-50 border border-amber-200 rounded text-amber-800 text-[11px] flex items-center gap-1.5 font-bold">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>وجود ناچ نویز (Noise Notch) در فرکانس ۴۰۰۰ هرتز — نشانگر افت شنوایی حسی‌عصبی شغلی ناشی از صوت سالن تولید.</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* SUBTAB 3: SPIROMETRY */}
        {subTab === 'spiro' && (
          <div className="mt-6 space-y-4 text-xs">
            <h4 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">
              جدول ۷ - ج: اسپیرومتری و آزمون عملکرد ریه شاغل
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <label className="block text-slate-700 font-bold mb-1">FEV1</label>
                <input
                  type="text"
                  value={paraData.spirometry.fev1}
                  onChange={(e) =>
                    setParaData({ ...paraData, spirometry: { ...paraData.spirometry, fev1: e.target.value } })
                  }
                  className="w-full border border-slate-300 rounded p-1.5 text-center font-mono font-bold bg-white"
                />
                <span className="text-[10px] text-slate-400 mt-1 block text-center">هدف: &gt; 80% نرمال</span>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <label className="block text-slate-700 font-bold mb-1">FVC</label>
                <input
                  type="text"
                  value={paraData.spirometry.fvc}
                  onChange={(e) =>
                    setParaData({ ...paraData, spirometry: { ...paraData.spirometry, fvc: e.target.value } })
                  }
                  className="w-full border border-slate-300 rounded p-1.5 text-center font-mono font-bold bg-white"
                />
                <span className="text-[10px] text-slate-400 mt-1 block text-center">هدف: &gt; 80% نرمال</span>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <label className="block text-slate-700 font-bold mb-1">FEV1 / FVC%</label>
                <input
                  type="text"
                  value={paraData.spirometry.fev1FvcRatio}
                  onChange={(e) =>
                    setParaData({ ...paraData, spirometry: { ...paraData.spirometry, fev1FvcRatio: e.target.value } })
                  }
                  className="w-full border border-slate-300 rounded p-1.5 text-center font-mono font-bold bg-white text-blue-700"
                />
                <span className="text-[10px] text-slate-400 mt-1 block text-center">&gt; 70% (Non-obstructive)</span>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <label className="block text-slate-700 font-bold mb-1">FEF 25-75%</label>
                <input
                  type="text"
                  value={paraData.spirometry.fef2575}
                  onChange={(e) =>
                    setParaData({ ...paraData, spirometry: { ...paraData.spirometry, fef2575: e.target.value } })
                  }
                  className="w-full border border-slate-300 rounded p-1.5 text-center font-mono bg-white"
                />
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <label className="block text-slate-700 font-bold mb-1">PEF</label>
                <input
                  type="text"
                  value={paraData.spirometry.pef}
                  onChange={(e) =>
                    setParaData({ ...paraData, spirometry: { ...paraData.spirometry, pef: e.target.value } })
                  }
                  className="w-full border border-slate-300 rounded p-1.5 text-center font-mono bg-white"
                />
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <label className="block text-slate-700 font-bold mb-1">VEXT</label>
                <input
                  type="text"
                  value={paraData.spirometry.vext}
                  onChange={(e) =>
                    setParaData({ ...paraData, spirometry: { ...paraData.spirometry, vext: e.target.value } })
                  }
                  className="w-full border border-slate-300 rounded p-1.5 text-center font-mono bg-white"
                />
              </div>
            </div>

            <div className="p-3 border border-slate-200 rounded-lg">
              <label className="block text-slate-800 font-bold mb-1">تفسیر الگوی منحنی حجم-زمان و جریان-حجم:</label>
              <input
                type="text"
                value={paraData.spirometry.interpretation}
                onChange={(e) =>
                  setParaData({ ...paraData, spirometry: { ...paraData.spirometry, interpretation: e.target.value } })
                }
                className="w-full border border-slate-300 rounded p-2 bg-white"
              />
            </div>
          </div>
        )}

        {/* SUBTAB 4: CXR & ECG */}
        {subTab === 'other' && (
          <div className="mt-6 space-y-4 text-xs">
            <h4 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">
              جدول ۷ - د: تصویربرداری و الکتروکاردیوگرافی
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 border border-slate-200 rounded-xl space-y-2 bg-slate-50">
                <span className="font-bold text-slate-900 text-sm">گرافی قفسه سینه CXR (P-A)</span>
                <div>
                  <label className="block text-slate-600 mb-1">یافته‌های رادیوگرافی:</label>
                  <textarea
                    rows={3}
                    value={paraData.other.cxrFindings}
                    onChange={(e) =>
                      setParaData({ ...paraData, other: { ...paraData.other, cxrFindings: e.target.value } })
                    }
                    className="w-full border border-slate-300 rounded p-2 bg-white"
                  />
                </div>
              </div>

              <div className="p-4 border border-slate-200 rounded-xl space-y-2 bg-slate-50">
                <span className="font-bold text-slate-900 text-sm">نوار قلب الکتروکاردیوگرافی (ECG)</span>
                <div>
                  <label className="block text-slate-600 mb-1">یافته‌های الکتروفیزیولوژی:</label>
                  <textarea
                    rows={3}
                    value={paraData.other.ecgFindings}
                    onChange={(e) =>
                      setParaData({ ...paraData, other: { ...paraData.other, ecgFindings: e.target.value } })
                    }
                    className="w-full border border-slate-300 rounded p-2 bg-white"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
