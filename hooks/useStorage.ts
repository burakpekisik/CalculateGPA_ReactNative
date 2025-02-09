import { useState, useEffect } from 'react';
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

export const useStorage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setIsLoading(true);
      const [coursesData, semestersData, settingsData] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.COURSES),
        AsyncStorage.getItem(STORAGE_KEYS.SEMESTERS),
        AsyncStorage.getItem(STORAGE_KEYS.SETTINGS)
      ]);

      setCourses(coursesData ? JSON.parse(coursesData) : []);
      setSemesters(semestersData ? JSON.parse(semestersData) : []);
      setSettings(settingsData ? JSON.parse(settingsData) : DEFAULT_SETTINGS);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setIsLoading(false);
    }
  };

  const saveCourse = async (course: Course) => {
    try {
      const newCourses = [...courses, course];
      await AsyncStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(newCourses));
      setCourses(newCourses);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save course');
      throw err;
    }
  };

  const updateCourse = async (courseId: string, updates: Partial<Course>) => {
    try {
      const newCourses = courses.map(course =>
        course.id === courseId ? { ...course, ...updates } : course
      );
      await AsyncStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(newCourses));
      setCourses(newCourses);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update course');
      throw err;
    }
  };

  const deleteCourse = async (courseId: string) => {
    try {
      const newCourses = courses.filter(course => course.id !== courseId);
      await AsyncStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(newCourses));
      setCourses(newCourses);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete course');
      throw err;
    }
  };

  const saveSemester = async (semester: Semester) => {
    try {
      const newSemesters = [...semesters, semester];
      await AsyncStorage.setItem(STORAGE_KEYS.SEMESTERS, JSON.stringify(newSemesters));
      setSemesters(newSemesters);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save semester');
      throw err;
    }
  };

  const updateSemester = async (semesterId: string, updates: Partial<Semester>) => {
    try {
      const newSemesters = semesters.map(semester =>
        semester.id === semesterId ? { ...semester, ...updates } : semester
      );
      await AsyncStorage.setItem(STORAGE_KEYS.SEMESTERS, JSON.stringify(newSemesters));
      setSemesters(newSemesters);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update semester');
      throw err;
    }
  };

  const deleteSemester = async (semesterId: string) => {
    try {
      const newSemesters = semesters.filter(semester => semester.id !== semesterId);
      await AsyncStorage.setItem(STORAGE_KEYS.SEMESTERS, JSON.stringify(newSemesters));
      setSemesters(newSemesters);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete semester');
      throw err;
    }
  };

  const updateSettings = async (updates: Partial<AppSettings>) => {
    try {
      const newSettings = { ...settings, ...updates };
      await AsyncStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(newSettings));
      setSettings(newSettings);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update settings');
      throw err;
    }
  };

  const clearStorage = async () => {
    try {
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.COURSES,
        STORAGE_KEYS.SEMESTERS,
        STORAGE_KEYS.SETTINGS
      ]);
      setCourses([]);
      setSemesters([]);
      setSettings(DEFAULT_SETTINGS);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to clear storage');
      throw err;
    }
  };

  return {
    courses,
    semesters,
    settings,
    isLoading,
    error,
    saveCourse,
    updateCourse,
    deleteCourse,
    saveSemester,
    updateSemester,
    deleteSemester,
    updateSettings,
    clearStorage
  };
};

export default useStorage;