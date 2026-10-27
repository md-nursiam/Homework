import React, { useState } from 'react';
import { Student } from '../types';
import { Plus, User, Trash2, X, Check, GraduationCap, KeyRound, Edit2 } from 'lucide-react';

interface StudentBarProps {
  students: Student[];
  selectedStudent: Student;
  onSelectStudent: (student: Student) => void;
  onAddStudent: (newStudent: Student) => void;
  onUpdateStudent: (updatedStudent: Student) => void;
  onDeleteStudent: (id: string) => void;
  isTeacherMode: boolean;
}

export const StudentBar: React.FC<StudentBarProps> = ({
  students,
  selectedStudent,
  onSelectStudent,
  onAddStudent,
  onUpdateStudent,
  onDeleteStudent,
  isTeacherMode,
}) => {
  // Add modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [className, setClassName] = useState('দশম শ্রেণি (Class 10)');
  const [pin, setPin] = useState(String(100 + students.length + 1));
  const [guardianName, setGuardianName] = useState('');
  const [phone, setPhone] = useState('');

  // Edit PIN modal state
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [editPinValue, setEditPinValue] = useState('');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newStudent: Student = {
      id: `std-${Date.now()}`,
      name: name.trim(),
      class: className.trim() || 'দশম শ্রেণি',
      pin: pin.trim() || String(Date.now()).slice(-4),
      guardianName: guardianName.trim() || 'অভিভাবক',
      phone: phone.trim() || '০১৭xxxxxxxx',
    };

    onAddStudent(newStudent);
    onSelectStudent(newStudent);
    setName('');
    setGuardianName('');
    setPhone('');
    setPin(String(100 + students.length + 2));
    setIsAddModalOpen(false);
  };

  const handleSavePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStudent || !editPinValue.trim()) return;

    const updated: Student = {
      ...editingStudent,
      pin: editPinValue.trim(),
    };
    onUpdateStudent(updated);
    setEditingStudent(null);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-blue-600" />
          <div>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              টিউশন শিক্ষার্থীদের তালিকা (শিক্ষার্থীর পিন ও প্রোফাইল):
            </h2>
            <p className="text-[11px] text-slate-500">
              শিক্ষার্থীর নামে ক্লিক করে ডায়েরি লিখুন অথবা পিন পরিবর্তন করুন
            </p>
          </div>
        </div>

        {/* Add Student Button */}
        {isTeacherMode && (
          <button
            type="button"
            onClick={() => {
              setPin(String(100 + students.length + 1));
              setIsAddModalOpen(true);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition shadow-xs self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>+ নতুন শিক্ষার্থী যোগ করুন</span>
          </button>
        )}
      </div>

      {/* Students Pills with PIN details */}
      <div className="flex flex-wrap items-center gap-2.5">
        {students.map((student) => {
          const isSelected = student.id === selectedStudent?.id;
          return (
            <div
              key={student.id}
              className={`group inline-flex items-center rounded-xl border transition ${
                isSelected
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm font-semibold'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
              }`}
            >
              <button
                type="button"
                onClick={() => onSelectStudent(student)}
                className="px-3.5 py-2 text-xs sm:text-sm flex items-center gap-2"
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-700'
                  }`}
                >
                  {student.name.charAt(0)}
                </div>
                <span>{student.name}</span>
                
                {/* Student's secret PIN badge */}
                <span
                  className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-md flex items-center gap-1 ${
                    isSelected ? 'bg-blue-800 text-amber-300' : 'bg-amber-50 text-amber-900 border border-amber-200'
                  }`}
                  title="এই শিক্ষার্থীর লগইন পিন"
                >
                  <KeyRound className="w-2.5 h-2.5" />
                  <span>পিন: {student.pin}</span>
                </span>
              </button>

              {/* Edit PIN button */}
              {isTeacherMode && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingStudent(student);
                    setEditPinValue(student.pin);
                  }}
                  className={`p-1.5 rounded-lg transition ${
                    isSelected
                      ? 'text-white/80 hover:text-white hover:bg-white/20'
                      : 'text-slate-400 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                  title="শিক্ষার্থীর পিন পরিবর্তন করুন"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
              )}

              {/* Delete button */}
              {isTeacherMode && students.length > 1 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (window.confirm(`${student.name} কে মুছে ফেলতে চান?`)) {
                      onDeleteStudent(student.id);
                    }
                  }}
                  className={`p-1.5 mr-1 rounded-lg opacity-0 group-hover:opacity-100 transition ${
                    isSelected
                      ? 'text-white/80 hover:text-white hover:bg-white/20'
                      : 'text-slate-400 hover:text-rose-600 hover:bg-rose-50'
                  }`}
                  title="শিক্ষার্থী মুছুন"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Edit PIN Modal */}
      {editingStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-blue-600" />
              <span>{editingStudent.name} এর পিন পরিবর্তন</span>
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              শিক্ষার্থী এই পিনটি দিয়ে সিস্টেমে লগইন করে তার বায়োডাটা ও ডায়েরি দেখবে।
            </p>

            <form onSubmit={handleSavePin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  নতুন গোপন পিন (PIN):
                </label>
                <input
                  type="text"
                  value={editPinValue}
                  onChange={(e) => setEditPinValue(e.target.value)}
                  placeholder="যেমন: 2026 বা 5544"
                  className="w-full px-3 py-2 text-base font-mono font-bold border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-hidden"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingStudent(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs"
                >
                  পিন সেভ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Student Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Plus className="w-4 h-4 text-blue-600" />
                <span>নতুন টিউশন শিক্ষার্থী যোগ করুন</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  শিক্ষার্থীর নাম:
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="যেমন: সাকিব আল হাসান"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-hidden"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    শ্রেণি (Class):
                  </label>
                  <input
                    type="text"
                    value={className}
                    onChange={(e) => setClassName(e.target.value)}
                    placeholder="যেমন: দশম শ্রেণি"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1 text-blue-900">
                    <KeyRound className="w-3.5 h-3.5 text-blue-600" />
                    <span>লগইন পিন (PIN):</span>
                  </label>
                  <input
                    type="text"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    placeholder="যেমন: 105"
                    className="w-full px-3 py-2 text-sm font-mono font-bold border border-blue-300 rounded-xl bg-blue-50/40"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  অভিভাবকের নাম (Guardian Name):
                </label>
                <input
                  type="text"
                  value={guardianName}
                  onChange={(e) => setGuardianName(e.target.value)}
                  placeholder="যেমন: মোঃ রফিকুল ইসলাম (বাবা)"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  যোগাযোগ নম্বর (মোবাইল):
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="017xxxxxxxx"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs"
                >
                  সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
