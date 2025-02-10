export type GradingSystem = 'system1' | 'system2' | 'system3' | 'system4';

export type ClassTerm = '1-1' | '1-2' | '2-1' | '2-2' | '3-1' | '3-2' | '4-1' | '4-2';

export type Theme = 'light' | 'dark';

export interface Course {
  id: string;
  name: string;
  grade: string;
  credits: number;
  semester: string;
  classTerm: ClassTerm;
  createdAt: number;
}

export interface Semester {
  id: string;
  name: string;
  courses: Course[];
  gpa: number;
  startDate: string;
  endDate: string;
}

export interface AppSettings {
  gradingSystem: GradingSystem;
  theme: Theme;
  defaultCredits: number;
}

export interface GradingScale {
  [key: string]: number;
}

export const GRADING_SCALES: Record<GradingSystem, GradingScale> = {
  system1: {
    'AA': 4.0, 'BA': 3.5, 'BB': 3.0, 'CB': 2.5, 
    'CC': 2.0, 'DC': 1.5, 'DD': 1.0, 'FD': 0.5, 'FF': 0.0
  },
  system2: {
    'AA': 4.0, 'AB': 3.7, 'BA': 3.3, 'BB': 3.0, 'BC': 2.7,
    'CB': 2.3, 'CC': 2.0, 'CD': 1.7, 'DC': 1.3, 'DD': 1.0, 'FF': 0.0
  },
  system3: {
    'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0, 'B-': 2.7,
    'C+': 2.3, 'C': 2.0, 'C-': 1.7, 'D+': 1.3, 'D': 1.0, 'D-': 0.7, 'F': 0.0
  },
  system4: {
    'A1': 4.0, 'A2': 3.7, 'A3': 3.3, 'B1': 3.0, 'B2': 2.7, 'B3': 2.3,
    'C1': 2.0, 'C2': 1.7, 'C3': 1.3, 'D': 1.0, 'F': 0.0
  }
};

export const GRADING_SYSTEM_LABELS: Record<GradingSystem, string> = {
  system1: 'AA-FF Scale',
  system2: 'Extended AA-FF Scale',
  system3: 'Letter Grade Scale (A-F)',
  system4: 'Numeric Scale (A1-F)'
};

export const CLASS_TERMS: { label: string; value: ClassTerm }[] = [
  { label: '1. Sınıf - Güz', value: '1-1' },
  { label: '1. Sınıf - Bahar', value: '1-2' },
  { label: '2. Sınıf - Güz', value: '2-1' },
  { label: '2. Sınıf - Bahar', value: '2-2' },
  { label: '3. Sınıf - Güz', value: '3-1' },
  { label: '3. Sınıf - Bahar', value: '3-2' },
  { label: '4. Sınıf - Güz', value: '4-1' },
  { label: '4. Sınıf - Bahar', value: '4-2' },
];