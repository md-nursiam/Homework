import React, { useState } from 'react';
import { Student } from '../types';
import { User, Phone, ShieldCheck, KeyRound, Eye, EyeOff, GraduationCap } from 'lucide-react';

interface StudentBioCardProps {
  student: Student;
}

export const StudentBioCard: React.FC<StudentBioCardProps> = ({ student }) => {
  const [showPin, setShowPin] = useState(false);

  return (
    <div className="bg-white rounded-3xl border-2 border-slate-200/90 p-5 sm:p-6 shadow-sm mb-6 relative overflow-hidden">
      {/* Decorative top accent */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-blue-600 via-indigo-600 to-sky-500"></div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div className="flex items-center gap-3.5">
          <div className="w-14 h-14 rounded-2xl bg-linear-to-tr from-blue-700 to-indigo-600 text-white font-extrabold text-2xl flex items-center justify-center shadow-md">
            {student.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                {student.name}
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                {student.class}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              ব্যক্তিগত টিউশন শিক্ষার্থী পরিচিতি (Student Bio Data)
            </p>
          </div>
        </div>

        {/* Secret PIN badge */}
        <div className="bg-slate-50 rounded-2xl p-2.5 px-3.5 border border-slate-200 flex items-center gap-2.5 self-start md:self-auto">
          <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
            <KeyRound className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block">
              লগইন গোপন পিন (PIN):
            </span>
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-sm font-black text-slate-900 tracking-widest">
                {showPin ? student.pin : '••••'}
              </span>
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                className="text-slate-400 hover:text-slate-700 p-0.5"
                title={showPin ? 'পিন লুকান' : 'পিন দেখুন'}
              >
                {showPin ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bio Data Details Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-4 text-xs">
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
            শিক্ষকের নাম (Tutor):
          </span>
          <span className="font-bold text-slate-900 text-sm">
            নূর সিয়াম (Nur Siam)
          </span>
        </div>

        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
            অভিভাবকের নাম:
          </span>
          <span className="font-bold text-slate-900 text-sm">
            {student.guardianName || 'অভিভাবক'}
          </span>
        </div>

        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
            অভিভাবকের যোগাযোগ:
          </span>
          <span className="font-bold text-slate-800 font-mono text-sm">
            {student.guardianPhone || student.phone || 'নির্ধারিত নেই'}
          </span>
        </div>

        <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200/60">
          <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block mb-0.5">
            টিউশন স্ট্যাটাস:
          </span>
          <span className="font-bold text-emerald-800 text-sm flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>নিয়মিত শিক্ষার্থী (Active)</span>
          </span>
        </div>
      </div>
    </div>
  );
};
