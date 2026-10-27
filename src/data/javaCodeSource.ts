export const JAVA_PROJECT_CODE = {
  mainClass: `/**
 * Project Name: Home work - Digital Dairy & Study Management System
 * Author: Nur Siam (Teacher & Lab Final Project)
 * Language: Java (JDK 17+)
 * Description: Console & Backend OOP Implementation for School and Tuition Homework Management
 */

import java.util.*;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

enum StudentType {
    TUITION, SCHOOL, BOTH
}

class SubjectWork {
    private String period;
    private String subject;
    private String classwork;
    private String homework;
    private boolean teacherSigned;
    private boolean completedByStudent;

    public SubjectWork(String period, String subject, String classwork, String homework) {
        this.period = period;
        this.subject = subject;
        this.classwork = classwork;
        this.homework = homework;
        this.teacherSigned = true;
        this.completedByStudent = false;
    }

    public String getPeriod() { return period; }
    public String getSubject() { return subject; }
    public String getClasswork() { return classwork; }
    public String getHomework() { return homework; }
    public boolean isTeacherSigned() { return teacherSigned; }
    public boolean isCompletedByStudent() { return completedByStudent; }
    public void setCompletedByStudent(boolean completed) { this.completedByStudent = completed; }

    @Override
    public String toString() {
        return String.format("| %-8s | %-16s | %-25s | %-35s | [Sig: %s] |", 
            period, subject, classwork, homework, (teacherSigned ? "Signed" : "Pending"));
    }
}

class DiaryEntry {
    private String id;
    private String date;
    private String day;
    private String type; // "school" or "tuition"
    private String classOrBatch;
    private List<SubjectWork> items;
    private String notice;
    private boolean guardianSigned;

    public DiaryEntry(String id, String date, String day, String type, String classOrBatch, String notice) {
        this.id = id;
        this.date = date;
        this.day = day;
        this.type = type;
        this.classOrBatch = classOrBatch;
        this.items = new ArrayList<>();
        this.notice = notice;
        this.guardianSigned = false;
    }

    public void addItem(SubjectWork item) { items.add(item); }
    public String getDate() { return date; }
    public String getDay() { return day; }
    public String getType() { return type; }
    public String getClassOrBatch() { return classOrBatch; }
    public List<SubjectWork> getItems() { return items; }
    public String getNotice() { return notice; }
    public boolean isGuardianSigned() { return guardianSigned; }
    public void setGuardianSigned(boolean signed) { this.guardianSigned = signed; }

    public void displayNotebookView() {
        System.out.println("==========================================================================================");
        System.out.println("                         DAILY HOMEWORK DIARY - [ " + type.toUpperCase() + " ]");
        System.out.println("Date: " + date + "  |  Day: " + day + "  |  Class/Batch: " + classOrBatch);
        System.out.println("------------------------------------------------------------------------------------------");
        System.out.printf("| %-8s | %-16s | %-25s | %-35s |\n", "Period", "Subject", "Class Work (C.W)", "Home Work (H.W)");
        System.out.println("------------------------------------------------------------------------------------------");
        for (SubjectWork item : items) {
            System.out.println(item);
        }
        System.out.println("------------------------------------------------------------------------------------------");
        System.out.println("NOTICE: " + notice);
        System.out.println("Teacher's Signature: [Signed by Nur Siam]  |  Guardian Signature: [" + (guardianSigned ? "VERIFIED" : "PENDING") + "]");
        System.out.println("==========================================================================================");
    }
}

class Student {
    private String id;
    private String name;
    private String roll;
    private String className;
    private StudentType type;
    private String batchName;

    public Student(String id, String name, String roll, String className, StudentType type, String batchName) {
        this.id = id;
        this.name = name;
        this.roll = roll;
        this.className = className;
        this.type = type;
        this.batchName = batchName;
    }

    public String getId() { return id; }
    public String getName() { return name; }
    public String getRoll() { return roll; }
    public StudentType getType() { return type; }
    public String getBatchName() { return batchName; }

    public boolean canAccessSchoolDiary() {
        return type == StudentType.SCHOOL || type == StudentType.BOTH;
    }

    public boolean canAccessTuitionDiary() {
        return type == StudentType.TUITION || type == StudentType.BOTH;
    }
}

class ExamResult {
    private String examTitle;
    private String studentName;
    private String subject;
    private int marksObtained;
    private int totalMarks;
    private String grade;
    private String teacherRemark; // "montobbo"

    public ExamResult(String examTitle, String studentName, String subject, int marks, int total, String grade, String remark) {
        this.examTitle = examTitle;
        this.studentName = studentName;
        this.subject = subject;
        this.marksObtained = marks;
        this.totalMarks = total;
        this.grade = grade;
        this.teacherRemark = remark;
    }

    public void printReportCard() {
        System.out.println("---------------------------------------------------------");
        System.out.println("Exam: " + examTitle + " (" + subject + ")");
        System.out.println("Student: " + studentName + " | Marks: " + marksObtained + "/" + totalMarks + " (" + grade + ")");
        System.out.println("Teacher Remark (মন্তব্য): " + teacherRemark);
        System.out.println("---------------------------------------------------------");
    }
}

public class HomeworkDiarySystem {
    private static List<Student> students = new ArrayList<>();
    private static Map<String, List<DiaryEntry>> diaryStore = new HashMap<>();
    private static List<ExamResult> results = new ArrayList<>();
    private static Map<String, String> nextLessonPlan = new HashMap<>();

    public static void main(String[] args) {
        initializeSampleData();
        Scanner scanner = new Scanner(System.in);
        System.out.println("\n**************************************************************");
        System.out.println("*      WELCOME TO 'HOME WORK' DIGITAL DIARY (JAVA BACKEND)    *");
        System.out.println("*    Teacher & Student Management System by Nur Siam         *");
        System.out.println("**************************************************************");

        boolean running = true;
        while (running) {
            System.out.println("\n--- MAIN MENU ---");
            System.out.println("1. Student Panel: View Homework Dairy by Date");
            System.out.println("2. Student Panel: Upcoming Exams & Results with Remarks");
            System.out.println("3. Student Panel: View Routine");
            System.out.println("4. Admin Panel: Add New Homework to Diary (Teacher Control)");
            System.out.println("5. Admin Panel: 'Next Lesson' Planner (কবে কাকে কী পড়াবো)");
            System.out.println("6. Switch Active Student / Role");
            System.out.println("7. Exit Application");
            System.out.print("Select an option (1-7): ");

            String choice = scanner.nextLine().trim();
            switch (choice) {
                case "1":
                    viewDiaryFlow(scanner);
                    break;
                case "2":
                    viewExamResultsFlow();
                    break;
                case "3":
                    viewRoutineFlow();
                    break;
                case "4":
                    teacherAddDiaryFlow(scanner);
                    break;
                case "5":
                    viewNextLessonFlow(scanner);
                    break;
                case "6":
                    switchStudentFlow(scanner);
                    break;
                case "7":
                    System.out.println("Thank you for using Home work Diary System. Best of luck for Lab Final!");
                    running = false;
                    break;
                default:
                    System.out.println("Invalid choice! Please select 1 through 7.");
            }
        }
        scanner.close();
    }

    private static void initializeSampleData() {
        students.add(new Student("STD-101", "Rahim Ahmed", "101", "Class 10", StudentType.TUITION, "Evening Science Batch"));
        students.add(new Student("STD-102", "Fatima Akter", "102", "Class 10", StudentType.BOTH, "Morning Math Batch"));
        students.add(new Student("STD-103", "Tanvir Hossain", "103", "Class 10", StudentType.SCHOOL, "School Section A"));

        // Add today's School Diary matching user notebook image
        DiaryEntry schoolDiary = new DiaryEntry("D-01", "2026-10-26", "Monday", "school", "Class 10 (School)", 
            "Notice: Bring Biology diary and colored figure notebook tomorrow.");
        schoolDiary.addItem(new SubjectWork("1st", "Math", "C.W kora", "Ex 3.2 (1-10) and Ex 5"));
        schoolDiary.addItem(new SubjectWork("2nd", "English 1st", "Unit 5 Lesson 2", "P-5 (a,b,c,d,1), P-6 (a,b,c,e,g)"));
        schoolDiary.addItem(new SubjectWork("3rd", "Biology", "Cell Division", "Page 232-235 read and Fig 10.02"));
        schoolDiary.addItem(new SubjectWork("4th", "Bangla 1st", "Kopotakkho Nod", "S.Q - 1,2,3,5,7,10 ; C.Q - 1,2,4,5,7"));
        schoolDiary.addItem(new SubjectWork("5th", "Physics", "Motion Equations", "C.Q - (1-20) read & write 5, M.C.Q (1-200)"));

        // Add today's Tuition Diary
        DiaryEntry tuitionDiary = new DiaryEntry("D-02", "2026-10-26", "Monday", "tuition", "Evening Science Batch", 
            "Notice: Weekly test on Trigonometry tomorrow evening.");
        tuitionDiary.addItem(new SubjectWork("1st Slot", "Higher Math", "Trigonometry board questions", "5 CQ solutions on separate copy"));
        tuitionDiary.addItem(new SubjectWork("2nd Slot", "Physics Special", "Newtonian Mechanics math", "Board MCQ 1-20 and Ex 4, 5, 6"));

        List<DiaryEntry> dayDiaries = new ArrayList<>();
        dayDiaries.add(schoolDiary);
        dayDiaries.add(tuitionDiary);
        diaryStore.put("2026-10-26", dayDiaries);

        // Results
        results.add(new ExamResult("General Math Model Test", "Rahim Ahmed", "Math", 46, 50, "A+", "Great progress! Pay attention to geometry figures."));
        results.add(new ExamResult("Physics Weekly Test", "Rahim Ahmed", "Physics", 38, 50, "A", "Good math calculation. Allocate time for MCQ revision."));
        results.add(new ExamResult("General Math Model Test", "Fatima Akter", "Math", 49, 50, "A+", "Outstanding score! Highest in class."));

        // Next lesson planner
        nextLessonPlan.put("Class 10 (School)", "Draw motion graphs (v-t and s-t) with scale in class");
        nextLessonPlan.put("Evening Science Batch", "Start Chapter 9: Exponential & Logarithmic Functions");
        nextLessonPlan.put("Rahim Ahmed (Tuition)", "Practice Geometry theorems 15 & 17 step by step");
    }

    private static void viewDiaryFlow(Scanner scanner) {
        System.out.println("\n[Available Diary Dates]: " + diaryStore.keySet());
        System.out.print("Enter Date (e.g., 2026-10-26): ");
        String date = scanner.nextLine().trim();
        List<DiaryEntry> entries = diaryStore.get(date);
        if (entries == null || entries.isEmpty()) {
            System.out.println("No diary records found for date: " + date);
            return;
        }
        for (DiaryEntry entry : entries) {
            entry.displayNotebookView();
        }
    }

    private static void viewExamResultsFlow() {
        System.out.println("\n--- UPCOMING EXAMS & RESULTS ---");
        System.out.println("Upcoming: Physics Chapter 2 & 3 Model Test (Total: 50 Marks) - Date: 2026-10-29");
        System.out.println("Upcoming: Higher Math Trigonometry Test (Total: 30 Marks) - Date: 2026-10-28");
        System.out.println("\n--- PREVIOUS EXAM RESULTS & TEACHER REMARKS ---");
        for (ExamResult res : results) {
            res.printReportCard();
        }
    }

    private static void viewRoutineFlow() {
        System.out.println("\n====================== WEEKLY ROUTINE ======================");
        System.out.println("Monday: 09:00 AM - Math (Class 10) | Room 204");
        System.out.println("Monday: 10:30 AM - Biology (Class 10) | Science Lab");
        System.out.println("Monday: 12:00 PM - Physics (Class 10) | Room 204");
        System.out.println("Monday: 05:30 PM - Tuition Batch (Higher Math & Physics Special)");
        System.out.println("============================================================");
    }

    private static void teacherAddDiaryFlow(Scanner scanner) {
        System.out.println("\n[TEACHER MODE] Add Homework to Diary:");
        System.out.print("Enter Date (YYYY-MM-DD): ");
        String date = scanner.nextLine().trim();
        System.out.print("Category (1: School, 2: Tuition): ");
        String catChoice = scanner.nextLine().trim();
        String type = catChoice.equals("2") ? "tuition" : "school";
        String classBatch = type.equals("school") ? "Class 10 (School)" : "Tuition Batch";

        DiaryEntry entry = new DiaryEntry(UUID.randomUUID().toString(), date, "Active Day", type, classBatch, "Complete before next class.");
        System.out.print("Subject name (e.g. Math): ");
        String sub = scanner.nextLine().trim();
        System.out.print("Classwork (C.W): ");
        String cw = scanner.nextLine().trim();
        System.out.print("Homework (H.W): ");
        String hw = scanner.nextLine().trim();

        entry.addItem(new SubjectWork("1st", sub, cw, hw));
        diaryStore.computeIfAbsent(date, k -> new ArrayList<>()).add(entry);
        System.out.println(">> Homework successfully posted to " + type + " diary for date " + date + "!");
    }

    private static void viewNextLessonFlow(Scanner scanner) {
        System.out.println("\n[TEACHER PLANNER] 'কবে কাকে কী পড়াবো' (Next Lesson Plan):");
        for (Map.Entry<String, String> plan : nextLessonPlan.entrySet()) {
            System.out.println("- Target: [" + plan.getKey() + "] -> Plan: " + plan.getValue());
        }
    }

    private static void switchStudentFlow(Scanner scanner) {
        System.out.println("\nRegistered Students in System:");
        for (int i = 0; i < students.size(); i++) {
            Student s = students.get(i);
            System.out.println((i + 1) + ". " + s.getName() + " [Type: " + s.getType() + "]");
        }
    }
}
`,
  vivaGuide: `
=== LAB FINAL VIVA & PRESENTATION QUESTIONS (Java + Web App) ===

Q1: What problem does this project solve?
A: As a teacher taking both school classes and private tuitions, it is hard to track what homework was assigned, what upcoming exams are scheduled, and what lesson to teach next to each student. "Home work" provides a digital diary matching the physical diary notebook format, separating School and Tuition diaries, tracking exam results with teacher's personalized remarks (মন্তব্য), and planning upcoming lessons.

Q2: Which Object-Oriented Programming (OOP) concepts are implemented in Java?
1. Encapsulation: All data fields in Student, DiaryEntry, SubjectWork, and ExamResult are private with controlled getters/setters.
2. Abstraction: High-level interfaces separating Student views (read-only diary & completion check) from Teacher/Admin views (entry creation, remark writing).
3. Polymorphism & Enums: StudentType enum (TUITION, SCHOOL, BOTH) determines access permissions dynamically.
4. Collections Framework: ArrayList and HashMap for fast date-indexed diary lookups and student record management.

Q3: How does the system handle students who only attend tuition vs both school & tuition?
A: Each student profile has a StudentType flag. When a tuition-only student logs in, the diary displays only tuition homework. For students enrolled in both, dual tabs (School Diary / Tuition Diary) are provided so there is zero confusion.
`
};
