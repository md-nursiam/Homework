import React, { useState, useEffect } from 'react';
import { X, Play, Pause, RotateCcw, Clock, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface StudyTimerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StudyTimerModal: React.FC<StudyTimerModalProps> = ({ isOpen, onClose }) => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState(25);

  useEffect(() => {
    let interval: any = null;
    if (isActive) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds((prev) => prev - 1);
        } else if (minutes > 0) {
          setMinutes((prev) => prev - 1);
          setSeconds(59);
        } else {
          // Timer finished!
          setIsActive(false);
          confetti({
            particleCount: 100,
            spread: 80,
            origin: { y: 0.6 },
          });
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, minutes, seconds]);

  if (!isOpen) return null;

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = (newDuration?: number) => {
    const dur = newDuration !== undefined ? newDuration : selectedDuration;
    setIsActive(false);
    setSelectedDuration(dur);
    setMinutes(dur);
    setSeconds(0);
  };

  const formatNumber = (num: number) => (num < 10 ? `0${num}` : num);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 text-center relative overflow-hidden">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mb-3 shadow-xs">
          <Clock className="w-6 h-6" />
        </div>

        <h3 className="text-lg font-bold text-slate-900">
          হোমওয়ার্ক ফোকাস টাইমার (Pomodoro)
        </h3>
        <p className="text-xs text-slate-500 mt-1 mb-5">
          মনোযোগ সহকারে পড়ার জন্য সময় নির্ধারণ করুন
        </p>

        {/* Big Time Display */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 mb-5 shadow-inner">
          <div className="font-mono text-5xl font-extrabold tracking-tight text-amber-400">
            {formatNumber(minutes)}:{formatNumber(seconds)}
          </div>
          <span className="text-[11px] text-slate-400 uppercase tracking-widest mt-1 block">
            {isActive ? 'পড়ার সময় চলমান...' : minutes === 0 && seconds === 0 ? 'অভিনন্দন! পড়া সম্পন্ন হয়েছে!' : 'প্রস্তুত'}
          </span>
        </div>

        {/* Duration presets */}
        <div className="flex items-center justify-center gap-2 mb-5">
          {[15, 25, 45].map((dur) => (
            <button
              key={dur}
              type="button"
              onClick={() => resetTimer(dur)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold transition ${
                selectedDuration === dur
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {dur} মিনিট
            </button>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={toggleTimer}
            className={`px-6 py-2.5 rounded-xl font-bold text-sm shadow-md transition flex items-center gap-2 ${
              isActive
                ? 'bg-rose-600 hover:bg-rose-700 text-white'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
            }`}
          >
            {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isActive ? 'বিরতি নিন (Pause)' : 'শুরু করুন (Start)'}</span>
          </button>

          <button
            type="button"
            onClick={() => resetTimer()}
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition"
            title="রিসেট"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
