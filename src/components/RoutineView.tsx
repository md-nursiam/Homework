import React, { useState } from 'react';
import { RoutineItem, Student } from '../types';
import { Clock, Plus, Trash2, Printer } from 'lucide-react';

interface RoutineViewProps {
  student: Student;
  routines: RoutineItem[];
  onSaveRoutine: (newRoutine: RoutineItem) => void;
  onDeleteRoutine: (id: string) => void;
  isTeacherMode: boolean;
}

const DAYS: RoutineItem['day'][] = [
  'Saturday',
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
];

const DAY_BN: Record<string, string> = {
  Saturday: 'শনিবার (Saturday)',
  Sunday: 'রবিবার (Sunday)',
  Monday: 'সোমবার (Monday)',
  Tuesday: 'মঙ্গলবার (Tuesday)',
  Wednesday: 'বুধবার (Wednesday)',
  Thursday: 'বৃহস্পতিবার (Thursday)',
  Friday: 'শুক্রবার (Friday)',
};

export const RoutineView: React.FC<RoutineViewProps> = ({
  student,
  routines,
  onSaveRoutine,
  onDeleteRoutine,
  isTeacherMode,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [day, setDay] = useState<RoutineItem['day']>('Saturday');
  const [time, setTime] = useState('05:00 PM - 06:30 PM');
  const [subject, setSubject] = useState('Math');
  const [topic, setTopic] = useState('ত্রিকোণমিতি ও বীজগণিত');

  // Filter slots for this student
  const studentRoutines = routines.filter((r) => r.studentId === student.id);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim()) return;

    const newSlot: RoutineItem = {
      id: `rot-${Date.now()}`,
      studentId: student.id,
      day: day,
      time: time.trim(),
      subject: subject.trim(),
      topic: topic.trim(),
    };

    onSaveRoutine(newSlot);
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-center justify-between no-print">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            {student.name} - সাপ্তাহিক টিউশন রুটিন (Routine)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            সপ্তাহের কোন কোন দিন কোন সময়ে কী বিষয় পড়ানো হবে তার সময়সূচি
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isTeacherMode && (
            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>+ রুটিন স্লট যোগ করুন</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => window.print()}
            className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 flex items-center gap-1"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>প্রিন্ট</span>
          </button>
        </div>
      </div>

      {/* Routine Slots by Day */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {DAYS.map((d) => {
          const slotsForDay = studentRoutines.filter((r) => r.day === d);
          return (
            <div
              key={d}
              className={`bg-white rounded-2xl border p-4 shadow-xs flex flex-col justify-between ${
                slotsForDay.length > 0 ? 'border-slate-300' : 'border-slate-200/60 bg-slate-50/50'
              }`}
            >
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-3">
                  <h4 className="text-xs font-bold text-slate-900">{DAY_BN[d]}</h4>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    {slotsForDay.length} টি ক্লাস
                  </span>
                </div>

                {slotsForDay.length > 0 ? (
                  <div className="space-y-2">
                    {slotsForDay.map((slot) => (
                      <div
                        key={slot.id}
                        className="p-3 bg-blue-50/60 rounded-xl border border-blue-200/60 space-y-1 relative group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-blue-900">{slot.subject}</span>
                          {isTeacherMode && (
                            <button
                              type="button"
                              onClick={() => onDeleteRoutine(slot.id)}
                              className="text-slate-400 hover:text-rose-600 p-0.5 opacity-0 group-hover:opacity-100 transition"
                              title="মুছুন"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>

                        <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-600">
                          <Clock className="w-3 h-3 text-blue-600" />
                          <span>{slot.time}</span>
                        </div>

                        {slot.topic && (
                          <p className="text-[11px] text-slate-600 pt-1 border-t border-blue-100">
                            টপিক: {slot.topic}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4 text-xs text-slate-400 italic">
                    ছুটি / কোনো ক্লাস নেই
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Slot Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
              রুটিনে নতুন ক্লাস যুক্ত করুন
            </h3>

            <form onSubmit={handleAdd} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-0.5">
                  বার (Day):
                </label>
                <select
                  value={day}
                  onChange={(e) => setDay(e.target.value as RoutineItem['day'])}
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-xl bg-white"
                >
                  {DAYS.map((d) => (
                    <option key={d} value={d}>
                      {DAY_BN[d]}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-0.5">
                  সময়সূচি (Time):
                </label>
                <input
                  type="text"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  placeholder="05:00 PM - 06:30 PM"
                  className="w-full px-3 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-xl"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-0.5">
                  বিষয় (Subject):
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="যেমন: Math & Physics"
                  className="w-full px-3 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-xl"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-0.5">
                  নির্ধারিত টপিক:
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="যেমন: বীজগণিত ও ত্রিকোণমিতি"
                  className="w-full px-3 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-xl"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs"
                >
                  যোগ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
