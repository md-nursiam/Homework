/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Student, DiaryEntry, ExamItem, RoutineItem, AuthSession } from './types';
import { StorageService } from './utils/storage';
import { Header } from './components/Header';
import { LoginView } from './components/LoginView';
import { StudentBar } from './components/StudentBar';
import { StudentBioCard } from './components/StudentBioCard';
import { DiaryNotebookView } from './components/DiaryNotebookView';
import { ExamsAndResultsView } from './components/ExamsAndResultsView';
import { RoutineView } from './components/RoutineView';
import { JavaLabModal } from './components/JavaLabModal';
import { StudyTimerModal } from './components/StudyTimerModal';
import { BookOpen, Award, Calendar, Sparkles, User, ShieldCheck } from 'lucide-react';

const SESSION_STORAGE_KEY = 'homework_app_active_session_v4';

export default function App() {
  // Application Data States
  const [students, setStudents] = useState<Student[]>(() => StorageService.getStudents());
  const [diaries, setDiaries] = useState<DiaryEntry[]>(() => StorageService.getDiaries());
  const [exams, setExams] = useState<ExamItem[]>(() => StorageService.getExams());
  const [routines, setRoutines] = useState<RoutineItem[]>(() => StorageService.getRoutines());

  // Authentication Session (null = Show Login Page)
  const [session, setSession] = useState<AuthSession>(() => {
    try {
      const saved = localStorage.getItem(SESSION_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Session load error', e);
    }
    return null;
  });

  // Selected student for Admin / Teacher
  const [selectedStudent, setSelectedStudent] = useState<Student>(() => students[0] || ({} as Student));
  const [activeTab, setActiveTab] = useState<'dairy' | 'exams' | 'routine'>('dairy');

  // Modals
  const [isJavaModalOpen, setIsJavaModalOpen] = useState(false);
  const [isTimerOpen, setIsTimerOpen] = useState(false);

  // Save session changes
  const handleLogin = (newSession: AuthSession) => {
    setSession(newSession);
    try {
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(newSession));
    } catch (e) {
      console.error(e);
    }
    setActiveTab('dairy');
  };

  const handleLogout = () => {
    setSession(null);
    try {
      localStorage.removeItem(SESSION_STORAGE_KEY);
    } catch (e) {
      console.error(e);
    }
  };

  // Sync selectedStudent if list changes
  useEffect(() => {
    if (students.length > 0 && !students.find((s) => s.id === selectedStudent?.id)) {
      setSelectedStudent(students[0]);
    }
  }, [students, selectedStudent]);

  // When student logs in, ensure their own student object is active
  const currentActiveStudent = session?.role === 'student' ? session.student : selectedStudent;

  // Student handlers
  const handleAddStudent = (newStudent: Student) => {
    const updated = [...students, newStudent];
    setStudents(updated);
    StorageService.saveStudents(updated);
  };

  const handleUpdateStudent = (updatedStudent: Student) => {
    const updated = students.map((s) => (s.id === updatedStudent.id ? updatedStudent : s));
    setStudents(updated);
    StorageService.saveStudents(updated);
    if (selectedStudent?.id === updatedStudent.id) {
      setSelectedStudent(updatedStudent);
    }
    if (session?.role === 'student' && session.student.id === updatedStudent.id) {
      setSession({ role: 'student', student: updatedStudent });
    }
  };

  const handleDeleteStudent = (id: string) => {
    const updated = students.filter((s) => s.id !== id);
    setStudents(updated);
    StorageService.saveStudents(updated);
    if (selectedStudent?.id === id && updated.length > 0) {
      setSelectedStudent(updated[0]);
    }
  };

  // Diary handler
  const handleSaveDiary = (updatedDiary: DiaryEntry) => {
    const existingIndex = diaries.findIndex((d) => d.id === updatedDiary.id);
    let updated: DiaryEntry[];
    if (existingIndex >= 0) {
      updated = [...diaries];
      updated[existingIndex] = updatedDiary;
    } else {
      updated = [updatedDiary, ...diaries];
    }
    setDiaries(updated);
    StorageService.saveDiaries(updated);
  };

  // Exam handler
  const handleSaveExam = (newExam: ExamItem) => {
    const updated = [newExam, ...exams];
    setExams(updated);
    StorageService.saveExams(updated);
  };

  // Routine handlers
  const handleSaveRoutine = (newRoutine: RoutineItem) => {
    const updated = [...routines, newRoutine];
    setRoutines(updated);
    StorageService.saveRoutines(updated);
  };

  const handleDeleteRoutine = (id: string) => {
    const updated = routines.filter((r) => r.id !== id);
    setRoutines(updated);
    StorageService.saveRoutines(updated);
  };

  // Reset demo data
  const handleResetData = () => {
    if (window.confirm('আপনি কি সকল ডেটা মূল ডেমো অবস্থায় ফিরিয়ে নিতে চান?')) {
      StorageService.resetAllData();
      localStorage.removeItem(SESSION_STORAGE_KEY);
      setSession(null);
      setStudents(StorageService.getStudents());
      setDiaries(StorageService.getDiaries());
      setExams(StorageService.getExams());
      setRoutines(StorageService.getRoutines());
      setSelectedStudent(StorageService.getStudents()[0]);
    }
  };

  // ========================================================
  // IF NO USER IS LOGGED IN -> SHOW AUTHENTICATION LOGIN
  // ========================================================
  if (!session) {
    return (
      <>
        <LoginView
          students={students}
          onLogin={handleLogin}
          onOpenJavaModal={() => setIsJavaModalOpen(true)}
        />
        <JavaLabModal
          isOpen={isJavaModalOpen}
          onClose={() => setIsJavaModalOpen(false)}
        />
      </>
    );
  }

  const isTeacher = session.role === 'admin';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Header with active user and Logout */}
      <Header
        session={session}
        onLogout={handleLogout}
        onResetData={handleResetData}
        onOpenJavaModal={() => setIsJavaModalOpen(true)}
      />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-5 sm:py-6">
        {/* ======================================================== */}
        {/* ONLY TEACHER / ADMIN SEES ALL STUDENTS LIST              */}
        {/* A STUDENT NEVER SEES OTHER STUDENTS!                    */}
        {/* ======================================================== */}
        {isTeacher && (
          <StudentBar
            students={students}
            selectedStudent={selectedStudent}
            onSelectStudent={(st) => setSelectedStudent(st)}
            onAddStudent={handleAddStudent}
            onUpdateStudent={handleUpdateStudent}
            onDeleteStudent={handleDeleteStudent}
            isTeacherMode={true}
          />
        )}

        {/* ======================================================== */}
        {/* WHEN STUDENT LOGS IN -> DISPLAY THEIR OWN BIO DATA CARD  */}
        {/* ======================================================== */}
        {!isTeacher && currentActiveStudent && (
          <StudentBioCard student={currentActiveStudent} />
        )}

        {/* Selected Student Active Banner with 3 Tabs */}
        {currentActiveStudent && (
          <div className="mb-5 no-print">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                  {currentActiveStudent.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm sm:text-base font-extrabold text-slate-900">
                      {currentActiveStudent.name}
                    </span>
                    <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                      {currentActiveStudent.class}
                    </span>
                    {isTeacher && (
                      <span className="text-[10px] font-mono font-bold text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        পিন: {currentActiveStudent.pin}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500">
                    {isTeacher ? 'শিক্ষার্থী নির্বাচন করা হয়েছে (টিচার এডিটর)' : 'আপনার ব্যক্তিগত পাঠ পরিকল্পনা'}
                  </p>
                </div>
              </div>

              {/* 3 Main Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
                <button
                  type="button"
                  onClick={() => setActiveTab('dairy')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition shrink-0 ${
                    activeTab === 'dairy'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>১. ডায়েরি (Dairy)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('exams')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition shrink-0 ${
                    activeTab === 'exams'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Award className="w-4 h-4" />
                  <span>২. পরীক্ষা ও ফলাফল (মন্তব্যসহ)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('routine')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition shrink-0 ${
                    activeTab === 'routine'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  <span>৩. পড়ার রুটিন (Routine)</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 1: Direct Physical Dairy Notebook */}
        {activeTab === 'dairy' && currentActiveStudent && (
          <DiaryNotebookView
            student={currentActiveStudent}
            diaries={diaries}
            onSaveDiary={handleSaveDiary}
            isTeacherMode={isTeacher}
            onOpenTimer={() => setIsTimerOpen(true)}
          />
        )}

        {/* Tab 2: Upcoming Exams & Results with Remarks */}
        {activeTab === 'exams' && currentActiveStudent && (
          <ExamsAndResultsView
            student={currentActiveStudent}
            exams={exams}
            onSaveExam={handleSaveExam}
            isTeacherMode={isTeacher}
          />
        )}

        {/* Tab 3: Weekly Routine */}
        {activeTab === 'routine' && currentActiveStudent && (
          <RoutineView
            student={currentActiveStudent}
            routines={routines}
            onSaveRoutine={handleSaveRoutine}
            onDeleteRoutine={handleDeleteRoutine}
            isTeacherMode={isTeacher}
          />
        )}
      </main>

      {/* Java Source Code & Lab Final Modal */}
      <JavaLabModal
        isOpen={isJavaModalOpen}
        onClose={() => setIsJavaModalOpen(false)}
      />

      {/* Pomodoro Study Timer Modal */}
      <StudyTimerModal
        isOpen={isTimerOpen}
        onClose={() => setIsTimerOpen(false)}
      />

      {/* Clean Footer */}
      <footer className="bg-white border-t border-slate-200 py-5 text-center text-xs text-slate-500 no-print mt-auto">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Home work - টিউশন ডিজিটাল ডায়েরি ও পাঠ পরিচালনা | শিক্ষক: নূর সিয়াম</span>
          <span className="text-slate-400">সর্বস্বত্ব সংরক্ষিত © ২০২৬</span>
        </div>
      </footer>
    </div>
  );
}
