import { Student, DiaryEntry, ExamItem, RoutineItem } from '../types';
import { initialStudents, initialDiaries, initialExams, initialRoutines } from '../data/initialData';

const STORAGE_KEYS = {
  STUDENTS: 'homework_app_tuition_students_v2',
  DIARIES: 'homework_app_tuition_diaries_v2',
  EXAMS: 'homework_app_tuition_exams_v2',
  ROUTINES: 'homework_app_tuition_routines_v2',
};

function getStoredItem<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) return defaultValue;
    return JSON.parse(item) as T;
  } catch (err) {
    console.error(`Error loading key "${key}" from localStorage:`, err);
    return defaultValue;
  }
}

function setStoredItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Error saving key "${key}" to localStorage:`, err);
  }
}

export const StorageService = {
  getStudents: (): Student[] => getStoredItem(STORAGE_KEYS.STUDENTS, initialStudents),
  saveStudents: (students: Student[]): void => setStoredItem(STORAGE_KEYS.STUDENTS, students),

  getDiaries: (): DiaryEntry[] => getStoredItem(STORAGE_KEYS.DIARIES, initialDiaries),
  saveDiaries: (diaries: DiaryEntry[]): void => setStoredItem(STORAGE_KEYS.DIARIES, diaries),

  getExams: (): ExamItem[] => getStoredItem(STORAGE_KEYS.EXAMS, initialExams),
  saveExams: (exams: ExamItem[]): void => setStoredItem(STORAGE_KEYS.EXAMS, exams),

  getRoutines: (): RoutineItem[] => getStoredItem(STORAGE_KEYS.ROUTINES, initialRoutines),
  saveRoutines: (routines: RoutineItem[]): void => setStoredItem(STORAGE_KEYS.ROUTINES, routines),

  resetAllData: (): void => {
    localStorage.removeItem(STORAGE_KEYS.STUDENTS);
    localStorage.removeItem(STORAGE_KEYS.DIARIES);
    localStorage.removeItem(STORAGE_KEYS.EXAMS);
    localStorage.removeItem(STORAGE_KEYS.ROUTINES);
  }
};
