export interface Student {
  id: string;
  name: string;
  class: string;
  pin: string; // PIN or Student ID for student login
  phone?: string;
  guardianName?: string;
  guardianPhone?: string;
}

export interface SubjectWorkItem {
  id: string;
  period: string; // 1st, 2nd, 3rd, 4th, 5th, etc.
  subject: string; // Teacher writes this freely
  classwork: string; // C.W
  homework: string; // H.W
  teacherSigned: boolean;
  completedByStudent?: boolean;
}

export interface DiaryEntry {
  id: string;
  studentId: string; // Tied directly to individual student!
  date: string; // YYYY-MM-DD
  day: string; // Monday, Tuesday, etc.
  items: SubjectWorkItem[];
  notice: string;
  teacherSignature: string;
  guardianSigned?: boolean;
  guardianSignerName?: string;
  guardianSignedAt?: string;
}

export interface ExamItem {
  id: string;
  studentId: string;
  title: string;
  subject: string;
  date: string;
  totalMarks: number;
  marksObtained?: number;
  grade?: string;
  syllabus: string;
  remarks?: string; // Teacher's personal comment ("মন্তব্য")
  isCompleted: boolean;
}

export interface RoutineItem {
  id: string;
  studentId: string;
  day: 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  time: string;
  subject: string;
  topic?: string;
}

export type AuthSession = 
  | { role: 'admin'; name: string }
  | { role: 'student'; student: Student }
  | null;
