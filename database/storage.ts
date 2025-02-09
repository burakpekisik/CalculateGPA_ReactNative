import AsyncStorage from '@react-native-async-storage/async-storage';
import { Course, Semester, AppSettings, GradingSystem } from '../app/types';

const STORAGE_KEYS = {
  COURSES: '@gpa_calculator_courses',
  SEMESTERS: '@gpa_calculator_semesters',
  SETTINGS: '@gpa_calculator_settings'
};

const DEFAULT_SETTINGS: AppSettings = {
  gradingSystem: 'system1' as GradingSystem,
  theme: 'light',
  defaultCredits: 3
};

export class Storage {
  static async initializeStorage(): Promise<void> {
    try {
      const settings = await AsyncStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (!settings) {
        await AsyncStorage.setItem(
          STORAGE_KEYS.SETTINGS,
          JSON.stringify(DEFAULT_SETTINGS)
        );
      }
    } catch (error) {
      console.error('Failed to initialize storage:', error);
      throw error;
    }
  }

  // Course Operations
  static async getCourses(): Promise<Course[]> {
    try {
      const coursesJSON = await AsyncStorage.getItem(STORAGE_KEYS.COURSES);
      return coursesJSON ? JSON.parse(coursesJSON) : [];
    } catch (error) {
      console.error('Failed to get courses:', error);
      throw error;
    }
  }

  static async saveCourse(course: Course): Promise<void> {
    try {
      const courses = await this.getCourses();
      courses.push(course);
      await AsyncStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(courses));
    } catch (error) {
      console.error('Failed to save course:', error);
      throw error;
    }
  }

  static async updateCourse(courseId: string, updates: Partial<Course>): Promise<void> {
    try {
      const courses = await this.getCourses();
      const updatedCourses = courses.map(course =>
        course.id === courseId ? { ...course, ...updates } : course
      );
      await AsyncStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(updatedCourses));
    } catch (error) {
      console.error('Failed to update course:', error);
      throw error;
    }
  }

  static async deleteCourse(courseId: string): Promise<void> {
    try {
      const courses = await this.getCourses();
      const filteredCourses = courses.filter(course => course.id !== courseId);
      await AsyncStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(filteredCourses));
    } catch (error) {
      console.error('Failed to delete course:', error);
      throw error;
    }
  }

  // Semester Operations
  static async getSemesters(): Promise<Semester[]> {
    try {
      const semestersJSON = await AsyncStorage.getItem(STORAGE_KEYS.SEMESTERS);
      return semestersJSON ? JSON.parse(semestersJSON) : [];
    } catch (error) {
      console.error('Failed to get semesters:', error);
      throw error;
    }
  }

  static async saveSemester(semester: Semester): Promise<void> {
    try {
      const semesters = await this.getSemesters();
      semesters.push(semester);
      await AsyncStorage.setItem(STORAGE_KEYS.SEMESTERS, JSON.stringify(semesters));
    } catch (error) {
      console.error('Failed to save semester:', error);
      throw error;
    }
  }

  static async updateSemester(semesterId: string, updates: Partial<Semester>): Promise<void> {
    try {
      const semesters = await this.getSemesters();
      const updatedSemesters = semesters.map(semester =>
        semester.id === semesterId ? { ...semester, ...updates } : semester
      );
      await AsyncStorage.setItem(STORAGE_KEYS.SEMESTERS, JSON.stringify(updatedSemesters));
    } catch (error) {
      console.error('Failed to update semester:', error);
      throw error;
    }
  }

  static async deleteSemester(semesterId: string): Promise<void> {
    try {
      const semesters = await this.getSemesters();
      const filteredSemesters = semesters.filter(semester => semester.id !== semesterId);
      await AsyncStorage.setItem(STORAGE_KEYS.SEMESTERS, JSON.stringify(filteredSemesters));
    } catch (error) {
      console.error('Failed to delete semester:', error);
      throw error;
    }
  }

  // Settings Operations
  static async getSettings(): Promise<AppSettings> {
    try {
      const settingsJSON = await AsyncStorage.getItem(STORAGE_KEYS.SETTINGS);
      return settingsJSON ? JSON.parse(settingsJSON) : DEFAULT_SETTINGS;
    } catch (error) {
      console.error('Failed to get settings:', error);
      throw error;
    }
  }

  static async updateSettings(updates: Partial<AppSettings>): Promise<void> {
    try {
      const currentSettings = await this.getSettings();
      const newSettings = { ...currentSettings, ...updates };
      await AsyncStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(newSettings));
    } catch (error) {
      console.error('Failed to update settings:', error);
      throw error;
    }
  }

  // Utility Methods
  static async clearStorage(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.COURSES,
        STORAGE_KEYS.SEMESTERS,
        STORAGE_KEYS.SETTINGS
      ]);
    } catch (error) {
      console.error('Failed to clear storage:', error);
      throw error;
    }
  }
}