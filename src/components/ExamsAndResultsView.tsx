import React, { useState } from 'react';
import { ExamItem, Student } from '../types';
import { Calendar, Award, MessageSquare, Plus, Clock, CheckCircle } from 'lucide-react';

interface ExamsAndResultsViewProps {
  student: Student;
  exams: ExamItem[];
  onSaveExam: (newExam: ExamItem) => void;
  isTeacherMode: boolean;
}

export const ExamsAndResultsView: React.FC<ExamsAndResultsViewProps> = ({
  student,
  exams,
  onSaveExam,
  isTeacherMode,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [isCompletedExam, setIsCompletedExam] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [date, setDate] = useState('2026-10-30');
  const [totalMarks, setTotalMarks] = useState<number>(50);
  const [syllabus, setSyllabus] = useState('');
  const [marksObtained, setMarksObtained] = useState<number>(45);
  const [grade, setGrade] = useState('A+');
  const [remarks, setRemarks] = useState('খুব চমৎকার পারফরম্যান্স! তবে জ্যামিতির উপপাদ্য অংশে আরেকটু মনোযোগ দাও।');

  // Filter exams for this specific student
  const studentExams = exams.filter((e) => e.studentId === student.id);
  const upcomingExams = studentExams.filter((e) => !e.isCompleted);
  const completedExams = studentExams.filter((e) => e.isCompleted);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !subject.trim()) return;

    const newExam: ExamItem = {
      id: `ex-${Date.now()}`,
      studentId: student.id,
      title: title.trim(),
      subject: subject.trim(),
      date: date,
      totalMarks: Number(totalMarks) || 50,
      syllabus: syllabus.trim() || 'নির্ধারিত অধ্যায়',
      isCompleted: isCompletedExam,
      marksObtained: isCompletedExam ? Number(marksObtained) : undefined,
      grade: isCompletedExam ? grade : undefined,
      remarks: isCompletedExam ? remarks.trim() : undefined,
    };

    onSaveExam(newExam);
    setTitle('');
    setSubject('');
    setSyllabus('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            {student.name} - পরীক্ষা ও মূল্যায়ন ফলাফল
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            আসন্ন পরীক্ষার প্রস্তুতি এবং পূর্বের পরীক্ষার নম্বর ও শিক্ষকের ব্যক্তিগত মন্তব্য
          </p>
        </div>

        {isTeacherMode && (
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>+ পরীক্ষা / ফলাফল যোগ করুন</span>
          </button>
        )}
      </div>

      {/* 1. UPCOMING EXAMS */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
          <Calendar className="w-4 h-4 text-amber-600" />
          <span>১. আসন্ন পরীক্ষা ও সিলেবাস (Upcoming Exams)</span>
        </h3>

        {upcomingExams.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {upcomingExams.map((exam) => (
              <div
                key={exam.id}
                className="bg-white rounded-2xl border-2 border-slate-200/90 p-4 shadow-xs hover:border-blue-400 transition"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                      {exam.subject}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 mt-1">
                      {exam.title}
                    </h4>
                  </div>
                  <span className="text-xs font-mono font-bold text-blue-900 bg-slate-100 px-2 py-0.5 rounded">
                    পূর্ণমান: {exam.totalMarks}
                  </span>
                </div>

                <div className="text-xs text-slate-600 flex items-center gap-1.5 mb-2 font-medium">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>তারিখ: {exam.date}</span>
                </div>

                <div className="p-2.5 bg-amber-50/50 rounded-xl border border-amber-200/50 text-xs text-slate-700">
                  <span className="font-bold text-amber-900 block mb-0.5">সিলেবাস:</span>
                  <p>{exam.syllabus}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 text-center text-xs text-slate-500">
            বর্তমানে কোনো আসন্ন পরীক্ষা নির্ধারিত নেই।
          </div>
        )}
      </div>

      {/* 2. PREVIOUS RESULTS & TEACHER REMARKS ("মন্তব্য") */}
      <div className="space-y-3 pt-3">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
          <Award className="w-4 h-4 text-emerald-600" />
          <span>২. পূর্বের পরীক্ষার প্রাপ্ত নম্বর ও শিক্ষকের মন্তব্য (Results & Remarks)</span>
        </h3>

        {completedExams.length > 0 ? (
          <div className="space-y-3">
            {completedExams.map((res) => {
              const percent = res.marksObtained !== undefined ? Math.round((res.marksObtained / res.totalMarks) * 100) : 0;
              return (
                <div
                  key={res.id}
                  className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-blue-900">{res.subject}</span>
                        <span className="text-xs text-slate-400 font-mono">({res.date})</span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900">{res.title}</h4>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-xl font-black text-slate-900">
                          {res.marksObtained}
                          <span className="text-xs font-normal text-slate-500 ml-1">
                            / {res.totalMarks}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-500 font-semibold">({percent}%)</span>
                      </div>
                      {res.grade && (
                        <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-extrabold text-sm flex items-center justify-center">
                          {res.grade}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Teacher's Personal Remark ("মন্তব্য") */}
                  {res.remarks && (
                    <div className="mt-3 bg-amber-50/70 p-3 rounded-xl border border-amber-200/80 flex items-start gap-2.5">
                      <MessageSquare className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                      <div>
                        <span className="text-xs font-bold text-amber-950 uppercase tracking-wide block">
                          শিক্ষকের মন্তব্য (Teacher's Remark):
                        </span>
                        <p className="text-xs sm:text-sm text-slate-800 italic mt-0.5 font-medium leading-relaxed">
                          "{res.remarks}"
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 text-center text-xs text-slate-500">
            এই শিক্ষার্থীর জন্য কোনো ফলাফল এন্ট্রি করা হয়নি।
          </div>
        )}
      </div>

      {/* Add Exam Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
              {student.name} এর জন্য পরীক্ষা ও ফলাফল যোগ করুন
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-xl mb-3">
                <button
                  type="button"
                  onClick={() => setIsCompletedExam(false)}
                  className={`flex-1 py-1.5 rounded-lg font-bold text-xs transition ${
                    !isCompletedExam ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600'
                  }`}
                >
                  আসন্ন পরীক্ষা (Upcoming)
                </button>
                <button
                  type="button"
                  onClick={() => setIsCompletedExam(true)}
                  className={`flex-1 py-1.5 rounded-lg font-bold text-xs transition ${
                    isCompletedExam ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600'
                  }`}
                >
                  সম্পন্ন পরীক্ষার ফলাফল ও মন্তব্য
                </button>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-0.5">
                  পরীক্ষার নাম:
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="যেমন: ত্রিকোণমিতি উইকলি টেস্ট"
                  className="w-full px-3 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-xl"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-0.5">
                    বিষয়:
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Math"
                    className="w-full px-3 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-xl"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-0.5">
                    তারিখ:
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-xl"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-0.5">
                  মোট নম্বর (পূর্ণমান):
                </label>
                <input
                  type="number"
                  value={totalMarks}
                  onChange={(e) => setTotalMarks(Number(e.target.value))}
                  className="w-full px-3 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-xl"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-0.5">
                  সিলেবাস:
                </label>
                <input
                  type="text"
                  value={syllabus}
                  onChange={(e) => setSyllabus(e.target.value)}
                  placeholder="কোন কোন অধ্যায় থেকে প্রশ্ন..."
                  className="w-full px-3 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-xl"
                />
              </div>

              {/* If completed, ask for marks & remarks */}
              {isCompletedExam && (
                <>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-0.5">
                        প্রাপ্ত নম্বর:
                      </label>
                      <input
                        type="number"
                        value={marksObtained}
                        onChange={(e) => setMarksObtained(Number(e.target.value))}
                        className="w-full px-3 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-xl"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-0.5">
                        গ্রেড:
                      </label>
                      <input
                        type="text"
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                        placeholder="A+"
                        className="w-full px-3 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-xl"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-amber-900 mb-0.5">
                      শিক্ষকের ব্যক্তিগত মন্তব্য ("মন্তব্য"):
                    </label>
                    <textarea
                      value={remarks}
                      onChange={(e) => setRemarks(e.target.value)}
                      placeholder="শিক্ষার্থীর দুর্বলতা বা প্রশংসনীয় দিক সম্পর্কে মন্তব্য লিখুন..."
                      rows={2}
                      className="w-full px-3 py-1.5 text-xs sm:text-sm border border-amber-300 rounded-xl bg-amber-50/50"
                      required
                    />
                  </div>
                </>
              )}

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
