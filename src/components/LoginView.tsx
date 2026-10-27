import React, { useState } from 'react';
import { Student, AuthSession } from '../types';
import { 
  BookOpen, 
  ShieldCheck, 
  User, 
  Lock, 
  ArrowRight, 
  AlertCircle,
  KeyRound,
  GraduationCap,
  Eye,
  EyeOff
} from 'lucide-react';

interface LoginViewProps {
  students: Student[];
  onLogin: (session: AuthSession) => void;
  onOpenJavaModal: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({
  students,
  onLogin,
  onOpenJavaModal,
}) => {
  const [activeTab, setActiveTab] = useState<'student' | 'admin'>('student');

  // Student PIN login state (No dropdowns, no defaults!)
  const [studentPinInput, setStudentPinInput] = useState('');
  const [studentError, setStudentError] = useState('');

  // Admin / Teacher login state
  const [adminPinInput, setAdminPinInput] = useState('');
  const [showAdminPassword, setShowAdminPassword] = useState(false);
  const [adminError, setAdminError] = useState('');

  // Handle Student Login via PIN
  const handleStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStudentError('');

    const trimmedPin = studentPinInput.trim();
    if (!trimmedPin) {
      setStudentError('অনুগ্রহ করে আপনার পিন নম্বরটি লিখুন।');
      return;
    }

    // Match student strictly by their unique PIN
    const matchedStudent = students.find(
      (s) => s.pin.toLowerCase() === trimmedPin.toLowerCase()
    );

    if (matchedStudent) {
      onLogin({ role: 'student', student: matchedStudent });
    } else {
      setStudentError('ভুল পিন নম্বর! আপনার শিক্ষক কর্তৃক নির্ধারিত সঠিক পিন দিন।');
    }
  };

  // Handle Teacher / Admin Login
  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminError('');

    const trimmed = adminPinInput.trim();
    if (trimmed === '2023331554') {
      onLogin({ role: 'admin', name: 'নূর সিয়াম (Nur Siam)' });
    } else {
      setAdminError('ভুল পাসওয়ার্ড! অনুগ্রহ করে সঠিক শিক্ষক পাসওয়ার্ড দিন।');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8">
      {/* Top Bar with Branding */}
      <div className="max-w-md w-full mx-auto flex items-center justify-center mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold shadow-xs">
            <BookOpen className="w-4 h-4" />
          </div>
          <span className="font-extrabold text-slate-800 tracking-tight text-sm">
            Home work
          </span>
        </div>
      </div>

      <div className="max-w-md w-full mx-auto bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-linear-to-r from-blue-700 via-indigo-700 to-sky-700 text-white text-center">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center mb-3">
            <GraduationCap className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-xl font-extrabold tracking-tight">
            লগইন পোর্টাল
          </h2>
          <p className="text-xs text-blue-100 mt-1">
            টিউশন হোমওয়ার্ক ডায়েরি ও পাঠ পরিচালনা সিস্টেমে প্রবেশ করুন
          </p>
        </div>

        {/* Tab Switcher: Student vs Admin */}
        <div className="p-4 bg-slate-50 border-b border-slate-200">
          <div className="grid grid-cols-2 gap-2 p-1 bg-slate-200/80 rounded-2xl">
            <button
              type="button"
              onClick={() => {
                setActiveTab('student');
                setStudentError('');
                setAdminError('');
              }}
              className={`py-2 text-xs sm:text-sm font-bold rounded-xl transition flex items-center justify-center gap-2 ${
                activeTab === 'student'
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <User className="w-4 h-4" />
              <span>শিক্ষার্থী লগইন</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('admin');
                setStudentError('');
                setAdminError('');
              }}
              className={`py-2 text-xs sm:text-sm font-bold rounded-xl transition flex items-center justify-center gap-2 ${
                activeTab === 'admin'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>টিচার / অ্যাডমিন</span>
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* ======================================================== */}
          {/* 1. STUDENT LOGIN FORM (ONLY SECRET PIN INPUT)            */}
          {/* ======================================================== */}
          {activeTab === 'student' && (
            <form onSubmit={handleStudentSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5 flex items-center gap-1.5">
                  <KeyRound className="w-4 h-4 text-blue-600" />
                  <span>আপনার ব্যক্তিগত গোপন পিন লিখুন (Enter Your PIN):</span>
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={studentPinInput}
                    onChange={(e) => {
                      setStudentPinInput(e.target.value);
                      setStudentError('');
                    }}
                    placeholder="গোপন পিন লিখুন"
                    autoFocus
                    className="w-full pl-10 pr-4 py-3 text-base border-2 border-slate-300 rounded-2xl focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-hidden font-mono tracking-wider font-bold text-slate-900"
                  />
                  <Lock className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
                </div>
              </div>

              {studentError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2 font-semibold">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{studentError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
              >
                <span>পিন দিয়ে লগইন করুন (Login)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* ======================================================== */}
          {/* 2. TEACHER / ADMIN LOGIN FORM                            */}
          {/* ======================================================== */}
          {activeTab === 'admin' && (
            <form onSubmit={handleAdminSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  শিক্ষকের নাম:
                </label>
                <input
                  type="text"
                  defaultValue="নূর সিয়াম (Nur Siam)"
                  disabled
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl bg-slate-100 text-slate-700 font-bold cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  শিক্ষক পাসওয়ার্ড (Password):
                </label>
                <div className="relative">
                  <input
                    type={showAdminPassword ? 'text' : 'password'}
                    value={adminPinInput}
                    onChange={(e) => {
                      setAdminPinInput(e.target.value);
                      setAdminError('');
                    }}
                    placeholder="পাসওয়ার্ড লিখুন"
                    autoFocus
                    className="w-full pl-10 pr-10 py-2.5 text-sm border-2 border-slate-300 rounded-xl focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-hidden font-mono"
                  />
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <button
                    type="button"
                    onClick={() => setShowAdminPassword(!showAdminPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 p-0.5"
                    title={showAdminPassword ? 'পাসওয়ার্ড লুকান' : 'পাসওয়ার্ড দেখুন'}
                  >
                    {showAdminPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {adminError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2 font-semibold">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{adminError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
              >
                <span>অ্যাডমিন ড্যাশবোর্ডে প্রবেশ করুন</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
