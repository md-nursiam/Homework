import React from 'react';
import { BookOpen, User, ShieldCheck, Code2, RefreshCw, LogOut } from 'lucide-react';
import { AuthSession } from '../types';

interface HeaderProps {
  session: AuthSession;
  onLogout: () => void;
  onResetData: () => void;
  onOpenJavaModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  session,
  onLogout,
  onResetData,
  onOpenJavaModal,
}) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Logo & Title */}
          <div className="flex items-center justify-between w-full sm:w-auto">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg font-bold text-slate-900 tracking-tight font-sans">
                    Home work
                  </h1>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                    টিউশন ডিজিটাল ডায়েরি
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  ব্যক্তিগত টিউশন হোমওয়ার্ক, পরীক্ষা ও রুটিন খাতা
                </p>
              </div>
            </div>

          </div>

          {/* Right Controls: User info & Logout */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            {/* Active User Badge */}
            {session && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200">
                {session.role === 'admin' ? (
                  <>
                    <ShieldCheck className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-bold text-slate-800">
                      শিক্ষক (অ্যাডমিন)
                    </span>
                  </>
                ) : (
                  <>
                    <User className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-bold text-slate-800 truncate max-w-[140px]">
                      {session.student.name}
                    </span>
                  </>
                )}
              </div>
            )}

            {/* Logout Button */}
            {session && (
              <button
                type="button"
                onClick={onLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold transition shadow-xs"
                title="লগআউট করুন"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>লগআউট</span>
              </button>
            )}

            {/* Reset data */}
            <button
              onClick={onResetData}
              title="রিসেট ডেমো ডেটা"
              className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
