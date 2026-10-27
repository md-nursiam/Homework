import React, { useState, useEffect, useMemo } from 'react';
import { DiaryEntry, Student, SubjectWorkItem } from '../types';
import { 
  Calendar, 
  CheckCircle2, 
  Circle, 
  Printer, 
  Plus, 
  Trash2, 
  Save, 
  Check, 
  PenTool, 
  Clock, 
  Sparkles,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface DiaryNotebookViewProps {
  student: Student;
  diaries: DiaryEntry[];
  onSaveDiary: (updatedDiary: DiaryEntry) => void;
  isTeacherMode: boolean;
  onOpenTimer: () => void;
}

export const DiaryNotebookView: React.FC<DiaryNotebookViewProps> = ({
  student,
  diaries,
  onSaveDiary,
  isTeacherMode,
  onOpenTimer,
}) => {
  // Find all diaries for this specific student
  const studentDiaries = useMemo(() => {
    return diaries.filter((d) => d.studentId === student.id);
  }, [diaries, student.id]);

  // Available dates for this student (sorted descending)
  const availableDates = useMemo(() => {
    const dates = Array.from(new Set(studentDiaries.map((d) => d.date))).sort((a, b) => b.localeCompare(a));
    if (dates.length === 0) return ['2026-10-26'];
    return dates;
  }, [studentDiaries]);

  // Currently selected date
  const [selectedDate, setSelectedDate] = useState<string>('2026-10-26');

  // When student changes, reset selected date to latest available or today
  useEffect(() => {
    if (availableDates.length > 0) {
      setSelectedDate(availableDates[0]);
    } else {
      setSelectedDate('2026-10-26');
    }
  }, [student.id]);

  // Current active diary entry
  const currentDiary = useMemo(() => {
    return studentDiaries.find((d) => d.date === selectedDate);
  }, [studentDiaries, selectedDate]);

  // Editable local state for teacher editing
  const [items, setItems] = useState<SubjectWorkItem[]>([]);
  const [dayName, setDayName] = useState('Monday (সোমবার)');
  const [notice, setNotice] = useState('পরবর্তী ক্লাসের পূর্বে নির্ধারিত বাড়ির কাজ সম্পন্ন করে ডায়েরি সঙ্গে নিয়ে আসবে।');
  const [teacherSignature, setTeacherSignature] = useState('Nur Siam');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Sync state whenever selected date or student changes
  useEffect(() => {
    if (currentDiary) {
      setItems(currentDiary.items || []);
      setDayName(currentDiary.day || 'Monday (সোমবার)');
      setNotice(currentDiary.notice || '');
      setTeacherSignature(currentDiary.teacherSignature || 'Nur Siam');
    } else {
      // Create fresh template for new date
      setItems([
        {
          id: `item-${Date.now()}-1`,
          period: '1st',
          subject: 'Math',
          classwork: 'C.W করা',
          homework: '',
          teacherSigned: true,
          completedByStudent: false,
        },
        {
          id: `item-${Date.now()}-2`,
          period: '2nd',
          subject: 'Physics',
          classwork: '',
          homework: '',
          teacherSigned: true,
          completedByStudent: false,
        },
      ]);
      setDayName('Monday (সোমবার)');
      setNotice('পরবর্তী ক্লাসের পূর্বে নির্ধারিত বাড়ির কাজ সম্পন্ন করে আসবে।');
      setTeacherSignature('Nur Siam');
    }
  }, [currentDiary, selectedDate, student.id]);

  // Helper to add new subject row
  const handleAddRow = () => {
    const nextNum = items.length + 1;
    const periodLabel = nextNum === 1 ? '1st' : nextNum === 2 ? '2nd' : nextNum === 3 ? '3rd' : `${nextNum}th`;
    setItems([
      ...items,
      {
        id: `item-${Date.now()}-${nextNum}`,
        period: periodLabel,
        subject: '',
        classwork: '',
        homework: '',
        teacherSigned: true,
        completedByStudent: false,
      },
    ]);
  };

  const handleUpdateItem = (id: string, field: keyof SubjectWorkItem, value: any) => {
    setItems(items.map((it) => (it.id === id ? { ...it, [field]: value } : it)));
  };

  const handleRemoveRow = (id: string) => {
    setItems(items.filter((it) => it.id !== id));
  };

  // Save diary changes
  const handleSave = () => {
    const updated: DiaryEntry = {
      id: currentDiary ? currentDiary.id : `diary-${student.id}-${selectedDate}`,
      studentId: student.id,
      date: selectedDate,
      day: dayName,
      items: items,
      notice: notice,
      teacherSignature: teacherSignature.trim() || 'Nur Siam',
      guardianSigned: currentDiary?.guardianSigned || false,
      guardianSignerName: currentDiary?.guardianSignerName,
      guardianSignedAt: currentDiary?.guardianSignedAt,
    };

    onSaveDiary(updated);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  // Student checks off completed homework
  const handleToggleCompletion = (itemId: string, currentCompleted: boolean | undefined) => {
    const newItems = items.map((it) =>
      it.id === itemId ? { ...it, completedByStudent: !currentCompleted } : it
    );
    setItems(newItems);

    const updated: DiaryEntry = {
      id: currentDiary ? currentDiary.id : `diary-${student.id}-${selectedDate}`,
      studentId: student.id,
      date: selectedDate,
      day: dayName,
      items: newItems,
      notice: notice,
      teacherSignature: teacherSignature.trim() || currentDiary?.teacherSignature || 'Nur Siam',
      guardianSigned: currentDiary?.guardianSigned || false,
      guardianSignerName: currentDiary?.guardianSignerName,
      guardianSignedAt: currentDiary?.guardianSignedAt,
    };
    onSaveDiary(updated);

    // Confetti celebration if all items are done!
    if (!currentCompleted && newItems.filter((i) => i.completedByStudent).length === newItems.length) {
      confetti({ particleCount: 75, spread: 60, origin: { y: 0.6 } });
    }
  };

  // Guardian signature toggle
  const handleGuardianSign = () => {
    const updated: DiaryEntry = {
      id: currentDiary ? currentDiary.id : `diary-${student.id}-${selectedDate}`,
      studentId: student.id,
      date: selectedDate,
      day: dayName,
      items: items,
      notice: notice,
      teacherSignature: teacherSignature.trim() || currentDiary?.teacherSignature || 'Nur Siam',
      guardianSigned: true,
      guardianSignerName: student.guardianName || 'অভিভাবক',
      guardianSignedAt: new Date().toLocaleDateString('bn-BD'),
    };
    onSaveDiary(updated);
  };

  // Stats
  const completedCount = items.filter((i) => i.completedByStudent).length;

  return (
    <div className="space-y-5">
      {/* Date Bar & Controls */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs no-print flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        {/* Left: Date Selector */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-700 flex items-center gap-1 mr-1">
            <Calendar className="w-4 h-4 text-blue-600" />
            <span>তারিখ:</span>
          </span>

          {availableDates.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setSelectedDate(d)}
              className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition ${
                selectedDate === d
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {d === '2026-10-26' ? 'আজ (26 Oct)' : d === '2026-10-25' ? 'গতকাল (25 Oct)' : d}
            </button>
          ))}

          {/* Date Picker Input */}
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => {
              if (e.target.value) setSelectedDate(e.target.value);
            }}
            className="px-2.5 py-1 text-xs border border-slate-300 rounded-xl bg-slate-50 text-slate-800 font-mono"
            title="নতুন তারিখ বেছে নিন"
          />
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          {isTeacherMode ? (
            <button
              type="button"
              onClick={handleSave}
              className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl text-white shadow-md transition flex items-center gap-1.5 ${
                saveSuccess ? 'bg-emerald-600' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {saveSuccess ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
              <span>{saveSuccess ? 'সংরক্ষিত হয়েছে!' : 'ডায়েরি সংরক্ষণ করুন'}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onOpenTimer}
              className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 flex items-center gap-1"
            >
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              <span>স্টাডি টাইমার</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => window.print()}
            className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 flex items-center gap-1"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>প্রিন্ট / PDF</span>
          </button>
        </div>
      </div>

      {/* Progress alert in student view */}
      {!isTeacherMode && items.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-2.5 flex items-center justify-between text-xs text-blue-900 font-medium no-print">
          <span>
            আজকের পড়ার অগ্রগতি: <strong>{completedCount}</strong> / {items.length} টি বিষয় সম্পন্ন হয়েছে
          </span>
          <span className="font-bold">{Math.round((completedCount / items.length) * 100)}% Completed</span>
        </div>
      )}

      {/* ======================================================== */}
      {/* REAL PHYSICAL NOTEBOOK DIARY (Matching User's Photo!)    */}
      {/* ======================================================== */}
      <div className="bg-white rounded-2xl border-2 border-slate-800 shadow-md p-4 sm:p-7 relative print-page overflow-x-auto">
        {/* Top Header of Diary (Clean Daily Work title, no school name) */}
        <div className="text-center pb-3 border-b-2 border-slate-800">
          <div className="inline-block bg-blue-900 text-white font-extrabold text-base sm:text-lg tracking-wider px-6 py-1 rounded-xs uppercase shadow-xs">
            Daily Work
          </div>
          <p className="text-xs text-slate-600 font-semibold mt-1">
            টিউশন হোমওয়ার্ক ও দৈনিক পাঠ পরিকল্পনা খাতা
          </p>
        </div>

        {/* Date, Day, and Student Info Row */}
        <div className="flex flex-wrap items-center justify-between py-2.5 border-b border-slate-300 text-xs sm:text-sm font-semibold text-slate-900 gap-2">
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-bold uppercase text-[11px]">Date:</span>
            <span className="border-b border-dashed border-slate-700 px-2 py-0.5 font-mono text-sm font-bold text-blue-950">
              {selectedDate}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-bold uppercase text-[11px]">Day:</span>
            {isTeacherMode ? (
              <input
                type="text"
                value={dayName}
                onChange={(e) => setDayName(e.target.value)}
                className="border-b border-dashed border-slate-700 px-2 py-0.5 font-bold text-slate-900 bg-transparent w-36 outline-hidden"
              />
            ) : (
              <span className="border-b border-dashed border-slate-700 px-2 py-0.5 font-bold text-slate-900">
                {dayName}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-bold uppercase text-[11px]">Student:</span>
            <span className="border-b border-dashed border-slate-700 px-2 py-0.5 font-bold text-blue-900">
              {student.name} ({student.class})
            </span>
          </div>
        </div>

        {/* The Diary Table (Identical to image grid) */}
        <div className="mt-3">
          <table className="w-full border-collapse border-2 border-slate-800 text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-100 text-slate-900 border-b-2 border-slate-800 divide-x-2 divide-slate-800 font-bold">
                <th className="py-2 px-2 text-center w-14 uppercase tracking-wider text-[11px]">
                  Period
                </th>
                <th className="py-2 px-3 text-left w-36 sm:w-44 uppercase tracking-wider text-[11px]">
                  Subject (বিষয়)
                </th>
                <th className="py-2 px-3 text-left w-44 sm:w-56 uppercase tracking-wider text-[11px]">
                  Class Work (C.W)
                </th>
                <th className="py-2 px-3 text-left uppercase tracking-wider text-[11px]">
                  Home Work (H.W)
                </th>
                <th className="py-2 px-2 text-center w-24 uppercase tracking-wider text-[11px]">
                  Teacher Sign
                </th>
                {!isTeacherMode && (
                  <th className="py-2 px-2 text-center w-16 uppercase tracking-wider text-[11px] no-print">
                    Status
                  </th>
                )}
                {isTeacherMode && (
                  <th className="py-2 px-1 text-center w-12 uppercase tracking-wider text-[10px] no-print">
                    Delete
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y-2 border-b-2 border-slate-800 divide-slate-800">
              {items.map((item, idx) => (
                <tr
                  key={item.id}
                  className={`divide-x-2 divide-slate-800 transition ${
                    item.completedByStudent ? 'bg-emerald-50/40' : idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'
                  }`}
                >
                  {/* Period */}
                  <td className="py-2.5 px-2 text-center font-bold text-slate-800 align-top">
                    {isTeacherMode ? (
                      <input
                        type="text"
                        value={item.period}
                        onChange={(e) => handleUpdateItem(item.id, 'period', e.target.value)}
                        className="w-10 text-center font-bold bg-transparent border-0 focus:ring-0 p-0"
                      />
                    ) : (
                      <span>{item.period}</span>
                    )}
                  </td>

                  {/* Subject (Freely written by teacher!) */}
                  <td className="py-2.5 px-3 font-semibold text-slate-900 align-top">
                    {isTeacherMode ? (
                      <input
                        type="text"
                        value={item.subject}
                        onChange={(e) => handleUpdateItem(item.id, 'subject', e.target.value)}
                        placeholder="যেমন: Math, Physics"
                        className="w-full font-bold text-blue-900 bg-transparent border-0 focus:ring-0 p-0"
                      />
                    ) : (
                      <span className="font-bold text-blue-900">{item.subject}</span>
                    )}
                  </td>

                  {/* Class Work (C.W) */}
                  <td className="py-2.5 px-3 text-slate-800 align-top whitespace-pre-line leading-relaxed">
                    {isTeacherMode ? (
                      <textarea
                        value={item.classwork}
                        onChange={(e) => handleUpdateItem(item.id, 'classwork', e.target.value)}
                        placeholder="C.W করা / আলোচনা..."
                        rows={2}
                        className="w-full text-xs sm:text-sm bg-transparent border-0 focus:ring-0 p-0 resize-y"
                      />
                    ) : (
                      <span>{item.classwork || '- C.W নাই -'}</span>
                    )}
                  </td>

                  {/* Home Work (H.W) */}
                  <td className="py-2.5 px-3 text-slate-900 align-top whitespace-pre-line leading-relaxed">
                    {isTeacherMode ? (
                      <textarea
                        value={item.homework}
                        onChange={(e) => handleUpdateItem(item.id, 'homework', e.target.value)}
                        placeholder="যেমন: অনুশীলনী ৩.২ (১-১০) বা CQ ৫টা সমাধান..."
                        rows={2}
                        className="w-full text-xs sm:text-sm font-medium bg-transparent border-0 focus:ring-0 p-0 resize-y"
                      />
                    ) : (
                      <span className={item.completedByStudent ? 'line-through text-slate-400' : 'text-slate-900'}>
                        {item.homework || '- কোনো বাড়ির কাজ দেওয়া হয়নি -'}
                      </span>
                    )}
                  </td>

                  {/* Teacher Signature */}
                  <td className="py-2.5 px-2 text-center align-middle">
                    <span className="font-handwriting text-xl font-bold text-indigo-700 block leading-none">
                      {teacherSignature || 'Nur Siam'}
                    </span>
                    <span className="text-[9px] text-slate-400">Verified</span>
                  </td>

                  {/* Student Mode: Checkbox */}
                  {!isTeacherMode && (
                    <td className="py-2.5 px-2 text-center align-middle no-print">
                      <button
                        type="button"
                        onClick={() => handleToggleCompletion(item.id, item.completedByStudent)}
                        className={`p-1 rounded-md transition ${
                          item.completedByStudent
                            ? 'text-emerald-600 bg-emerald-50 hover:bg-emerald-100'
                            : 'text-slate-400 hover:text-slate-600'
                        }`}
                        title={item.completedByStudent ? 'সম্পন্ন হয়েছে' : 'পেন্ডিং'}
                      >
                        {item.completedByStudent ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        ) : (
                          <Circle className="w-5 h-5 text-slate-400" />
                        )}
                      </button>
                    </td>
                  )}

                  {/* Teacher Mode: Delete Row */}
                  {isTeacherMode && (
                    <td className="py-2.5 px-1 text-center align-middle no-print">
                      {items.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveRow(item.id)}
                          className="p-1 text-rose-500 hover:bg-rose-50 rounded"
                          title="রো মুছে ফেলুন"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Teacher Mode: Add Row Button */}
        {isTeacherMode && (
          <div className="mt-2.5 no-print">
            <button
              type="button"
              onClick={handleAddRow}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-bold border border-blue-200 transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ নতুন বিষয়ের রো যুক্ত করুন</span>
            </button>
          </div>
        )}

        {/* Notice Box (Directly as in paper diary image) */}
        <div className="mt-4 border-2 border-slate-800 p-2.5 bg-amber-50/50 rounded-xs">
          <div className="flex items-start gap-2">
            <span className="font-bold text-slate-900 text-xs uppercase shrink-0 pt-0.5">
              Notice / বিশেষ দ্রষ্টব্য:
            </span>
            {isTeacherMode ? (
              <textarea
                value={notice}
                onChange={(e) => setNotice(e.target.value)}
                placeholder="যেমন: কাল বায়োলজি রঙিন চিত্র খাতা অবশ্যই সাথে নিয়ে আসবে।"
                rows={1}
                className="w-full text-xs sm:text-sm font-medium text-slate-800 bg-transparent border-0 focus:ring-0 p-0"
              />
            ) : (
              <p className="text-xs sm:text-sm font-medium text-slate-800">
                {notice || 'পরবর্তী ক্লাসে বাড়ির কাজ সম্পন্ন করে নিয়ে আসবে।'}
              </p>
            )}
          </div>
        </div>

        {/* Bottom Signatures Box (Teacher & Guardian Signature) */}
        <div className="mt-5 pt-3 border-t-2 border-slate-800 grid grid-cols-2 gap-4 text-xs sm:text-sm">
          {/* Teacher Signature */}
          <div className="text-left flex flex-col justify-end">
            <div className="h-8 flex items-end">
              {isTeacherMode ? (
                <div className="flex items-center gap-1.5 w-full">
                  <input
                    type="text"
                    value={teacherSignature}
                    onChange={(e) => setTeacherSignature(e.target.value)}
                    placeholder="স্বাক্ষর লিখুন (যেমন: Nur Siam)"
                    className="font-handwriting text-2xl font-bold text-indigo-800 bg-transparent border-0 border-b border-indigo-300 focus:border-indigo-600 focus:ring-0 p-0 w-44 outline-hidden"
                    title="স্বাক্ষর পরিবর্তন করতে লিখুন"
                  />
                  <span className="text-[10px] text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-200 font-sans no-print font-medium">
                    স্বাক্ষর পরিবর্তন
                  </span>
                </div>
              ) : (
                <span className="font-handwriting text-2xl font-bold text-indigo-800">
                  {teacherSignature || 'Nur Siam'}
                </span>
              )}
            </div>
            <div className="border-t border-slate-600 pt-1 font-bold text-slate-900 flex items-center justify-between">
              <span>Teacher's Signature</span>
              {isTeacherMode && (
                <span className="text-[10px] font-normal text-indigo-700 no-print">
                  (ক্লিক করে পরিবর্তনযোগ্য)
                </span>
              )}
            </div>
          </div>

          {/* Guardian Signature */}
          <div className="text-right flex flex-col justify-end items-end">
            <div className="h-8 flex items-end">
              {currentDiary?.guardianSigned ? (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-300">
                  <Check className="w-3.5 h-3.5" />
                  <span>স্বাক্ষরিত: {currentDiary.guardianSignerName || student.guardianName}</span>
                </span>
              ) : (
                <button
                  type="button"
                  onClick={handleGuardianSign}
                  className="no-print inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded border border-blue-200"
                >
                  <PenTool className="w-3 h-3" />
                  <span>অভিভাবকের স্বাক্ষর দিন</span>
                </button>
              )}
            </div>
            <div className="border-t border-slate-600 pt-1 font-bold text-slate-900 w-full text-right">
              Guardian's Signature (অভিভাবকের স্বাক্ষর)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
