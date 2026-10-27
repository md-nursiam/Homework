import { Student, DiaryEntry, ExamItem, RoutineItem } from '../types';

export const initialStudents: Student[] = [
  {
    id: "std-1",
    name: "রহিম আহমেদ (Rahim)",
    class: "দশম শ্রেণি (Class 10)",
    pin: "101",
    phone: "01711-223344",
    guardianName: "আব্দুল হামিদ",
    guardianPhone: "01811-998877",
  },
  {
    id: "std-2",
    name: "ফাতিমা আক্তার (Fatima)",
    class: "দশম শ্রেণি (Class 10)",
    pin: "102",
    phone: "01722-334455",
    guardianName: "মোছাঃ পারভীন আক্তার",
    guardianPhone: "01822-887766",
  },
  {
    id: "std-3",
    name: "তানভীর হোসেন (Tanvir)",
    class: "নবম শ্রেণি (Class 9)",
    pin: "103",
    phone: "01733-445566",
    guardianName: "মোঃ রফিকুল ইসলাম",
    guardianPhone: "01833-776655",
  },
  {
    id: "std-4",
    name: "নুসরাত জাহান (Nusrat)",
    class: "অষ্টম শ্রেণি (Class 8)",
    pin: "104",
    phone: "01744-556677",
    guardianName: "এম এ বারী",
    guardianPhone: "01844-665544",
  }
];

export const initialDiaries: DiaryEntry[] = [
  // Rahim's Diary for 2026-10-26 (Exact match to User's paper image!)
  {
    id: "diary-std-1-2026-10-26",
    studentId: "std-1",
    date: "2026-10-26",
    day: "Monday (সোমবার)",
    notice: "আগামীকাল বায়োলজি ডায়েরি এবং রঙিন চিত্র খাতা অবশ্যই সাথে নিয়ে আসবে। অভিভাবকের স্বাক্ষর চাই।",
    teacherSignature: "Nur Siam",
    guardianSigned: true,
    guardianSignerName: "আব্দুল হামিদ (পিতা)",
    guardianSignedAt: "2026-10-26 08:30 PM",
    items: [
      {
        id: "r-1",
        period: "1st",
        subject: "Math",
        classwork: "C.W করা",
        homework: "অনুশীলনী ৩.২ (১-১০) নম্বর সমাধান ও উদাহরণ ৫ নং",
        teacherSigned: true,
        completedByStudent: true
      },
      {
        id: "r-2",
        period: "2nd",
        subject: "English 1st",
        classwork: "Unit 5 Lesson 2",
        homework: "P-5 (a,b,c,d,1)\nP-6 (a,b,c,e,g)\nP-7 (e,f,g,h,i,j)",
        teacherSigned: true,
        completedByStudent: true
      },
      {
        id: "r-3",
        period: "3rd",
        subject: "Biology",
        classwork: "মাইটোসিস কোষ বিভাজন",
        homework: "পৃ: ২৩২-২৩৫ পর্যন্ত পড়া ও চিত্র: ১০.০২",
        teacherSigned: true,
        completedByStudent: false
      },
      {
        id: "r-4",
        period: "4th",
        subject: "Bangla 1st",
        classwork: "কপোতাক্ষ নদ মূলভাব",
        homework: "S.Q - ১, ২, ৩, ৫, ৭, ১০ নং;\nC.Q - ১, ২, ৪, ৫, ৭, ৮, ১০ নং",
        teacherSigned: true,
        completedByStudent: false
      },
      {
        id: "r-5",
        period: "5th",
        subject: "Physics",
        classwork: "গতির সমীকরণ প্রতিপাদন",
        homework: "C.Q - (1-20) দেখা ও ৫টা লিখা,\nM.C.Q - (1-200)",
        teacherSigned: true,
        completedByStudent: false
      }
    ]
  },
  // Rahim's previous day diary (2026-10-25)
  {
    id: "diary-std-1-2026-10-25",
    studentId: "std-1",
    date: "2026-10-25",
    day: "Sunday (রবিবার)",
    notice: "গণিতের উৎপাদক বিশ্লেষণ সূত্রগুলো লিখে রিভিশন দিয়ে রাখবে।",
    teacherSignature: "Nur Siam",
    guardianSigned: true,
    guardianSignerName: "আব্দুল হামিদ",
    guardianSignedAt: "2026-10-25 09:10 PM",
    items: [
      {
        id: "r-prev-1",
        period: "1st",
        subject: "Math",
        classwork: "উৎপাদকে বিশ্লেষণ সূত্র আলোচনা",
        homework: "পৃষ্ঠা ৫৬ এর উদাহরণ ৩ ও অনুশীলনী ৩.১ এর ৪ ও ৫ নং",
        teacherSigned: true,
        completedByStudent: true
      },
      {
        id: "r-prev-2",
        period: "2nd",
        subject: "Physics",
        classwork: "গতির মৌলিক সংজ্ঞা ও একক",
        homework: "বোর্ড বইয়ের প্রথম ১০টি বহুনির্বাচনী প্রশ্ন সমাধান",
        teacherSigned: true,
        completedByStudent: true
      }
    ]
  },
  // Fatima's Diary for 2026-10-26
  {
    id: "diary-std-2-2026-10-26",
    studentId: "std-2",
    date: "2026-10-26",
    day: "Monday (সোমবার)",
    notice: "কাল ত্রিকোণমিতি অধ্যায় ৮ এর বোর্ড প্রশ্ন সমাধান টেস্ট নেওয়া হবে।",
    teacherSignature: "Nur Siam",
    guardianSigned: false,
    items: [
      {
        id: "f-1",
        period: "1st",
        subject: "Higher Math",
        classwork: "ত্রিকোণমিতি অধ্যায় ৮.২ ও ৮.৩ এর বোর্ড প্রশ্ন সলভিং",
        homework: "বোর্ড প্রশ্ন ২০১৮-২০২৪ এর ৫টি সৃজনশীল প্রশ্ন (CQ) আলাদা নোটখাতায় করা",
        teacherSigned: true,
        completedByStudent: true
      },
      {
        id: "f-2",
        period: "2nd",
        subject: "Chemistry",
        classwork: "রাসায়নিক বন্ধন ও বিক্রিয়া সমতাকরণ কৌশল",
        homework: "১০টি সমতাকরণ ও আয়নিক যৌগের বৈশিষ্ট্য নোট করা",
        teacherSigned: true,
        completedByStudent: false
      }
    ]
  },
  // Tanvir's Diary
  {
    id: "diary-std-3-2026-10-26",
    studentId: "std-3",
    date: "2026-10-26",
    day: "Monday (সোমবার)",
    notice: "ইংরেজি গ্রামারের রাইট ফর্ম অব ভার্বস নিয়মগুলো পড়ে আসবে।",
    teacherSignature: "Nur Siam",
    guardianSigned: false,
    items: [
      {
        id: "t-1",
        period: "1st",
        subject: "General Math",
        classwork: "বীজগণিত অনুশীলনী ২.১",
        homework: "সেট ও ফাংশন এর ৫ থেকে ১০ নম্বর অংক সমাধান",
        teacherSigned: true,
        completedByStudent: true
      },
      {
        id: "t-2",
        period: "2nd",
        subject: "English 2nd",
        classwork: "Right Form of Verbs Rules 1-10",
        homework: "বোর্ড প্রশ্ন ২০২৩ এর সমাধান খাতায় লেখা",
        teacherSigned: true,
        completedByStudent: false
      }
    ]
  }
];

export const initialExams: ExamItem[] = [
  {
    id: "ex-1",
    studentId: "std-1",
    title: "উচ্চতর গণিত ত্রিকোণমিতি উইকলি টেস্ট",
    subject: "Higher Math",
    date: "2026-10-28",
    totalMarks: 30,
    syllabus: "অধ্যায় ৮.২ ও ৮.৩ এর মান নির্ণয়, প্রমাণ এবং অভেদাবলী সমাধান",
    isCompleted: false
  },
  {
    id: "ex-2",
    studentId: "std-1",
    title: "পদার্থবিজ্ঞান গতি ও বল মডেল টেস্ট",
    subject: "Physics",
    date: "2026-10-30",
    totalMarks: 50,
    syllabus: "গতি সমীকরণ, মহাকর্ষ বল, ভরবেগ সংরক্ষণ সূত্র ও ২০টি MCQ",
    isCompleted: false
  },
  {
    id: "res-1",
    studentId: "std-1",
    title: "সাধারণ গণিত মাসিক পরীক্ষা",
    subject: "Math",
    date: "2026-10-20",
    totalMarks: 50,
    marksObtained: 46,
    grade: "A+",
    syllabus: "অধ্যায় ৩ - বীজগাণিতিক রাশি",
    remarks: "খুব চমৎকার পারফরম্যান্স! তবে জ্যামিতির উপপাদ্য অংশে চিত্র আরো নির্ভুলভাবে আঁকা দরকার। সমীকরণের ধাপগুলো সুন্দর হয়েছে।",
    isCompleted: true
  },
  {
    id: "res-2",
    studentId: "std-1",
    title: "পদার্থবিজ্ঞান অধ্যায় ২ উইকলি টেস্ট",
    subject: "Physics",
    date: "2026-10-15",
    totalMarks: 50,
    marksObtained: 38,
    grade: "A",
    syllabus: "গতির সমীকরণ ও লেখচিত্র",
    remarks: "গাণিতিক সূত্রের প্রয়োগ ভালো হয়েছে। কিন্তু MCQ অংশে তাড়াহুড়ো করে ৫টি ভুল হয়েছে, পরীক্ষার শেষে রিভিশনের সময় বরাদ্দ রাখবে।",
    isCompleted: true
  },
  {
    id: "res-3",
    studentId: "std-2",
    title: "উচ্চতর গণিত সমীকরণ টেস্ট",
    subject: "Higher Math",
    date: "2026-10-20",
    totalMarks: 50,
    marksObtained: 49,
    grade: "A+",
    syllabus: "অধ্যায় ৫ - সমীকরণ সমাধান",
    remarks: "অসাধারণ উত্তরপত্র! ধাপে ধাপে প্রতিটি ক্যালকুলেশন নিখুঁত হয়েছে। ধারাবাহিকতা বজায় রাখো।",
    isCompleted: true
  }
];

export const initialRoutines: RoutineItem[] = [
  { id: "rot-1", studentId: "std-1", day: "Saturday", time: "05:00 PM - 06:30 PM", subject: "Math & Higher Math", topic: "বীজগণিত ও ত্রিকোণমিতি" },
  { id: "rot-2", studentId: "std-1", day: "Monday", time: "05:00 PM - 06:30 PM", subject: "Physics & Chemistry", topic: "গতির সমীকরণ ও বিক্রিয়া" },
  { id: "rot-3", studentId: "std-1", day: "Wednesday", time: "05:00 PM - 06:30 PM", subject: "Biology & English", topic: "কোষ বিভাজন ও গ্রামার" },

  { id: "rot-4", studentId: "std-2", day: "Sunday", time: "06:30 PM - 08:00 PM", subject: "Higher Math", topic: "স্থানাঙ্ক জ্যামিতি" },
  { id: "rot-5", studentId: "std-2", day: "Tuesday", time: "06:30 PM - 08:00 PM", subject: "Physics", topic: "কাজ, ক্ষমতা ও শক্তি" },
  { id: "rot-6", studentId: "std-2", day: "Thursday", time: "06:30 PM - 08:00 PM", subject: "Chemistry", topic: "পর্যায় সারণি ও বন্ধন" },

  { id: "rot-7", studentId: "std-3", day: "Saturday", time: "07:00 PM - 08:30 PM", subject: "General Math", topic: "জ্যামিতি উপপাদ্য" },
  { id: "rot-8", studentId: "std-3", day: "Monday", time: "07:00 PM - 08:30 PM", subject: "English & Science", topic: "প্যারাগ্রাফ ও গতি" },
];
