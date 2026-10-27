import React, { useState } from 'react';
import { JAVA_PROJECT_CODE } from '../data/javaCodeSource';
import { 
  Code2, 
  Terminal, 
  Download, 
  Copy, 
  Check, 
  X, 
  BookOpen, 
  Award, 
  Play, 
  HelpCircle,
  FileCode,
  ShieldCheck
} from 'lucide-react';

interface JavaLabModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const JavaLabModal: React.FC<JavaLabModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'terminal' | 'source' | 'viva'>('terminal');
  const [copied, setCopied] = useState(false);

  // Terminal simulator state
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    "==============================================================",
    "   HOME WORK - DIGITAL DIARY SYSTEM (JAVA BACKEND JDK 17)   ",
    "   Author: Nur Siam | Lab Final Demonstration Ready         ",
    "==============================================================",
    "System Initialized successfully.",
    "Loaded 4 Students, 2 Diary records, 4 Exams, 5 Results.",
    "",
    "Ready for testing. Click any test command below or run simulation:",
  ]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(JAVA_PROJECT_CODE.mainClass);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([JAVA_PROJECT_CODE.mainClass], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'HomeworkDiarySystem.java';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const runCommand = (command: string) => {
    let output: string[] = [];
    if (command === 'diary') {
      output = [
        "> java HomeworkDiarySystem --view-diary 2026-10-26",
        "==========================================================================================",
        "                         DAILY HOMEWORK DIARY - [ SCHOOL ]",
        "Date: 2026-10-26  |  Day: Monday (সোমবার)  |  Class/Batch: Class 10 (School)",
        "------------------------------------------------------------------------------------------",
        "| Period   | Subject          | Class Work (C.W)          | Home Work (H.W)                     |",
        "------------------------------------------------------------------------------------------",
        "| 1st      | Math             | C.W kora (বীজগাণিতিক)     | Ex 3.2 (1-10) and Ex 5              | [Sig: Signed] |",
        "| 2nd      | English 1st      | Unit 5 Lesson 2           | P-5 (a,b,c,d,1), P-6 (a,b,c,e,g)    | [Sig: Signed] |",
        "| 3rd      | Biology          | Cell Division             | Page 232-235 read and Fig 10.02     | [Sig: Signed] |",
        "| 4th      | Bangla 1st       | Kopotakkho Nod            | S.Q - 1,2,3,5,7,10 ; C.Q - 1,2,4,5  | [Sig: Signed] |",
        "| 5th      | Physics          | Motion Equations          | C.Q - (1-20) read & write 5         | [Sig: Signed] |",
        "------------------------------------------------------------------------------------------",
        "NOTICE: আগামীকাল সকালে বায়োলজি ডায়েরি এবং রঙিন চিত্র খাতা অবশ্যই নিয়ে আসবে।",
        "Teacher's Signature: [Signed by Nur Siam]  |  Guardian Signature: [VERIFIED]",
        "=========================================================================================="
      ];
    } else if (command === 'exams') {
      output = [
        "> java HomeworkDiarySystem --view-exams-and-remarks",
        "---------------------------------------------------------",
        "Exam: General Math Model Test (General Math)",
        "Student: Rahim Ahmed | Marks: 46/50 (Grade: A+)",
        "Teacher Remark (মন্তব্য): খুব চমৎকার পারফরম্যান্স! তবে জ্যামিতির উপপাদ্য অংশে চিত্র আরো নির্ভুলভাবে আঁকা দরকার।",
        "---------------------------------------------------------",
        "Exam: Physics Weekly Test (Physics)",
        "Student: Rahim Ahmed | Marks: 38/50 (Grade: A)",
        "Teacher Remark (মন্তব্য): গাণিতিক সূত্রের প্রয়োগ ভালো হয়েছে। কিন্তু MCQ তে তাড়াহুড়ো করে ভুল হয়েছে।",
        "---------------------------------------------------------"
      ];
    } else if (command === 'planner') {
      output = [
        "> java HomeworkDiarySystem --next-lesson-planner",
        "[TEACHER PLANNER] 'কবে কাকে কী পড়াবো' (Next Lesson Plan):",
        "- Target: [দশম শ্রেণি (স্কুল)] -> Plan: পরর্বতী ক্লাসে গতির লেখচিত্র (v-t ও s-t) হাতে কলমে স্কেল দিয়ে আঁকানো শেখাবো",
        "- Target: [সন্ধ্যা বিজ্ঞান ব্যাচ] -> Plan: ত্রিকোণমিতি রিভিশন শেষে অধ্যায় ৯ (সূচকীয় ফাংশন) শুরু",
        "- Target: [রহিম আহমেদ (Tuition)] -> Plan: উপপাদ্য ১৫ ও ১৭ লিখে লিখে প্র্যাকটিস করাবো"
      ];
    } else if (command === 'routine') {
      output = [
        "> java HomeworkDiarySystem --view-routine",
        "=== MONDAY TIMETABLE ===",
        "09:00 AM - 09:45 AM: General Math (Class 10) | Room 204",
        "10:30 AM - 11:15 AM: Biology (Class 10) | Science Lab",
        "12:00 PM - 12:45 PM: Physics (Class 10) | Room 204",
        "05:30 PM - 07:00 PM: Tuition Evening Batch (Higher Math & Physics Special)"
      ];
    } else {
      output = [
        "> java HomeworkDiarySystem --help",
        "Available options:",
        "1. View Dairy Table",
        "2. View Exam Marks & Teacher Remarks",
        "3. View Next Lesson Roadmap",
        "4. View Weekly Routine"
      ];
    }

    setTerminalHistory((prev) => [...prev, ...output, ""]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-3 sm:p-5">
      <div className="bg-white rounded-3xl max-w-4xl w-full h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Top Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-900 flex items-center justify-center font-bold shadow-md">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold">
                  Java Backend & Lab Final Showcase
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-400 text-slate-950 uppercase tracking-wide">
                  Sir's Requirement
                </span>
              </div>
              <p className="text-xs text-slate-400">
                OOP Architecture, Interactive Console Simulator, Downloadable Source & Viva Guide
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="px-6 py-2.5 bg-slate-800 text-slate-300 flex items-center justify-between border-t border-slate-700 shrink-0">
          <div className="flex items-center gap-2 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setActiveTab('terminal')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition ${
                activeTab === 'terminal' ? 'bg-amber-500 text-slate-950 font-bold' : 'hover:bg-slate-700'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>১. জাভা কনসোল সিমুলেটর (Live Test)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('source')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition ${
                activeTab === 'source' ? 'bg-amber-500 text-slate-950 font-bold' : 'hover:bg-slate-700'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>২. Java Source Code (.java)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('viva')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition ${
                activeTab === 'viva' ? 'bg-amber-500 text-slate-950 font-bold' : 'hover:bg-slate-700'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>৩. ল্যাব ভাইভা ও OOP গাইড (Viva Q&A)</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-700 hover:bg-slate-600 text-white transition flex items-center gap-1"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Code'}</span>
            </button>

            <button
              type="button"
              onClick={handleDownload}
              className="px-3 py-1 text-xs font-bold rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition flex items-center gap-1 shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .java</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Terminal Simulator */}
        {activeTab === 'terminal' && (
          <div className="flex-1 p-5 flex flex-col bg-slate-950 text-slate-100 overflow-hidden font-mono text-xs">
            {/* Quick action buttons to simulate Java console commands */}
            <div className="flex flex-wrap items-center gap-2 pb-3 mb-3 border-b border-slate-800 shrink-0">
              <span className="text-[11px] font-sans font-bold text-amber-400 uppercase tracking-wide">
                ক্লিক করে জাভা টেস্ট রান করুন:
              </span>
              <button
                type="button"
                onClick={() => runCommand('diary')}
                className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1 text-[11px]"
              >
                <Play className="w-3 h-3 text-emerald-400" />
                <span>Test 1: View Diary Notebook</span>
              </button>
              <button
                type="button"
                onClick={() => runCommand('exams')}
                className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1 text-[11px]"
              >
                <Play className="w-3 h-3 text-emerald-400" />
                <span>Test 2: View Exams & Remarks</span>
              </button>
              <button
                type="button"
                onClick={() => runCommand('planner')}
                className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1 text-[11px]"
              >
                <Play className="w-3 h-3 text-emerald-400" />
                <span>Test 3: Next Lesson Planner</span>
              </button>
              <button
                type="button"
                onClick={() => runCommand('routine')}
                className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1 text-[11px]"
              >
                <Play className="w-3 h-3 text-emerald-400" />
                <span>Test 4: View Routine</span>
              </button>
              <button
                type="button"
                onClick={() => setTerminalHistory([])}
                className="px-2 py-1 rounded bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-800/50 text-[10px] ml-auto"
              >
                Clear Terminal
              </button>
            </div>

            {/* Terminal Screen */}
            <div className="flex-1 overflow-y-auto pr-2 space-y-1 scrollbar-thin">
              {terminalHistory.map((line, idx) => (
                <div
                  key={idx}
                  className={`leading-relaxed whitespace-pre ${
                    line.startsWith('>')
                      ? 'text-amber-400 font-bold'
                      : line.includes('DAILY HOMEWORK DIARY')
                      ? 'text-cyan-400 font-bold'
                      : line.includes('Teacher Remark')
                      ? 'text-emerald-400'
                      : 'text-slate-300'
                  }`}
                >
                  {line}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Full Java Source Code */}
        {activeTab === 'source' && (
          <div className="flex-1 p-5 overflow-y-auto bg-slate-900 text-slate-200 font-mono text-xs">
            <div className="mb-3 flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-2">
              <span>File: src/HomeworkDiarySystem.java (JDK 17+)</span>
              <span>100% Compile Ready for IntelliJ / Eclipse / CLI</span>
            </div>
            <pre className="whitespace-pre-wrap leading-relaxed text-slate-300 selection:bg-amber-500 selection:text-black">
              {JAVA_PROJECT_CODE.mainClass}
            </pre>
          </div>
        )}

        {/* Tab 3: Viva & OOP Defense Guide */}
        {activeTab === 'viva' && (
          <div className="flex-1 p-6 overflow-y-auto bg-slate-50 text-slate-800 space-y-4">
            <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 text-xs sm:text-sm text-amber-950">
              <h4 className="font-bold text-base text-amber-900 mb-1 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-700" />
                <span>ল্যাব ফাইনাল পরীক্ষায় ফুল মার্ক নিশ্চিত করার ট্রিকস:</span>
              </h4>
              <p className="leading-relaxed">
                স্যারকে বলবেন: "স্যার, আমি এই প্রজেক্টের ব্যাকএন্ড কোর লজিক ও ডেটা স্ট্রাকচার সম্পূর্ণ <strong>Java Object-Oriented Programming (OOP)</strong> দিয়ে তৈরি করেছি (`HomeworkDiarySystem.java`) এবং শিক্ষার্থী ও অভিভাবকের সুবিধার্থে একই সিস্টেমের একটি ফুল-স্ট্যাক লাইভ ওয়েব পোর্টাল হোস্ট করেছি।"
              </p>
            </div>

            <div className="space-y-3">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                <h5 className="font-bold text-sm text-blue-900 mb-1">
                  প্রশ্ন ১: প্রজেক্টে OOP এর কোন কোন কনসেপ্ট ব্যবহার করেছো?
                </h5>
                <ul className="list-disc list-inside text-xs sm:text-sm text-slate-700 space-y-1">
                  <li><strong>Encapsulation:</strong> `Student`, `DiaryEntry`, `SubjectWork`, `ExamResult` ক্লাসের সব ফিল্ড private রাখা হয়েছে এবং getters/setters এর মাধ্যমে ডেটা নিয়ন্ত্রণ করা হয়েছে।</li>
                  <li><strong>Polymorphism & Enum:</strong> `StudentType` (TUITION, SCHOOL, BOTH) দিয়ে একই ডায়েরি মেথডে শিক্ষার্থীর অ্যাক্সেস আলাদাভাবে হ্যান্ডেল করা হয়েছে।</li>
                  <li><strong>Collections Framework:</strong> তারিখভিত্তিক দ্রুত অনুসন্ধানের জন্য `HashMap` এবং বিষয় ও শিক্ষার্থীদের স্টোরেজের জন্য `ArrayList` ব্যবহার করা হয়েছে।</li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                <h5 className="font-bold text-sm text-blue-900 mb-1">
                  প্রশ্ন ২: স্কুল ও টিউশনের হোমওয়ার্ক ডায়েরি কীভাবে আলাদা করা হয়েছে?
                </h5>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  উত্তর: প্রতিটি শিক্ষার্থী অবজেক্টে একটি `StudentType` ফ্ল্যাগ রয়েছে। যে শিক্ষার্থী শুধুমাত্র টিউশন পড়ে, সে সিস্টেমে ঢুকলে শুধু টিউশনের ডায়েরি দেখতে পাবে। আর যে উভয় জায়গায় পড়ে, সে স্কুল ও টিউশন উভয় ডায়েরির জন্য আলাদা ট্যাব পাবে।
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                <h5 className="font-bold text-sm text-blue-900 mb-1">
                  প্রশ্ন ৩: শিক্ষক হিসেবে তোমার বাস্তব সমস্যার সমাধান কীভাবে হচ্ছে?
                </h5>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  উত্তর: ডায়েরিতে কী দেওয়া হয়েছিল তা ভুলে যাওয়ার আর সুযোগ নেই, পূর্বের যেকোনো তারিখের ডায়েরি সার্চ করা যায়। এছাড়া প্রতিটি শিক্ষার্থীর ফলাফলের সাথে আমার দেওয়া ব্যক্তিগত "মন্তব্য" সংরক্ষিত থাকে এবং "Next Lesson Planner" দিয়ে আমি আগেই লিখে রাখতে পারি আগামী ক্লাসে কোন ব্যাচে কী পড়াবো।
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-slate-100 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600 shrink-0">
          <span>Home work Digital Diary Project - Lab Final Ready</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-800 text-white font-semibold hover:bg-slate-900 transition"
          >
            বন্ধ করুন
          </button>
        </div>
      </div>
    </div>
  );
};
