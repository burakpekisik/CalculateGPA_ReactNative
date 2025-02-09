import { Course, GradingSystem, GRADING_SCALES, GRADING_SYSTEM_LABELS } from '@/app/types';


export const isValidGrade = (grade: string, gradingSystem: GradingSystem): boolean => {
  return grade in GRADING_SCALES[gradingSystem];
};

export const convertGrade = (grade: string, fromSystem: GradingSystem, toSystem: GradingSystem): string => {
  const gradePoint = GRADING_SCALES[fromSystem][grade];
  const targetGrades = GRADING_SCALES[toSystem];
  
  let closestGrade = Object.keys(targetGrades)[0];
  let minDiff = Math.abs(targetGrades[closestGrade] - gradePoint);

  Object.entries(targetGrades).forEach(([targetGrade, point]) => {
    const diff = Math.abs(point - gradePoint);
    if (diff < minDiff) {
      minDiff = diff;
      closestGrade = targetGrade;
    }
  });

  return closestGrade;
};

export const calculateGPA = (courses: Course[], gradingSystem: GradingSystem): number => {
  if (!courses.length) return 0;

  try {
    let totalPoints = 0;
    let totalCredits = 0;

    courses.forEach(course => {
      let gradeToUse = course.grade;
      
      // Convert grade if it's from a different system
      if (!GRADING_SCALES[gradingSystem][course.grade]) {
        // Try to detect original system and convert
        for (const system of Object.keys(GRADING_SCALES) as GradingSystem[]) {
          if (GRADING_SCALES[system][course.grade]) {
            gradeToUse = convertGrade(course.grade, system, gradingSystem);
            break;
          }
        }
      }

      if (!GRADING_SCALES[gradingSystem][gradeToUse]) {
        throw new Error(`Unable to convert grade ${course.grade} to ${GRADING_SYSTEM_LABELS[gradingSystem]}`);
      }

      totalPoints += GRADING_SCALES[gradingSystem][gradeToUse] * course.credits;
      totalCredits += course.credits;
    });

    return totalCredits > 0 ? Number((totalPoints / totalCredits).toFixed(2)) : 0;
  } catch (error) {
    console.error('GPA calculation error:', error);
    throw error;
  }
};

export const detectGradingSystem = (grade: string): GradingSystem => {
  for (const [system, grades] of Object.entries(GRADING_SCALES)) {
    if (grade in grades) {
      return system as GradingSystem;
    }
  }
  throw new Error(`Unable to detect grading system for grade: ${grade}`);
};

export const calculateTermGPA = (courses: Course[], gradingSystem: GradingSystem): {
  gpa: number;
  totalCredits: number;
  courseCount: number;
} => {
  if (!courses.length) return { gpa: 0, totalCredits: 0, courseCount: 0 };

  try {
    let totalPoints = 0;
    let totalCredits = 0;

    courses.forEach(course => {
      const originalSystem = detectGradingSystem(course.grade);
      const gradeToUse = originalSystem === gradingSystem 
        ? course.grade 
        : convertGrade(course.grade, originalSystem, gradingSystem);

      totalPoints += GRADING_SCALES[gradingSystem][gradeToUse] * course.credits;
      totalCredits += course.credits;
    });

    return {
      gpa: totalCredits > 0 ? Number((totalPoints / totalCredits).toFixed(2)) : 0,
      totalCredits,
      courseCount: courses.length
    };
  } catch (error) {
    console.error('Term GPA calculation error:', error);
    return { gpa: 0, totalCredits: 0, courseCount: courses.length };
  }
};