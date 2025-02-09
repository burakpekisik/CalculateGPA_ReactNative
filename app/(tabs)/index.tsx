import React, { useState, useCallback } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { ThemedView } from '@/components/common/ThemedView';
import { ThemedText } from '@/components/common/ThemedText';
import GradingSystemPicker from '@/components/GradingSystemPicker';
import CourseInput from '@/components/CourseInput';
import CourseList from '@/components/common/CourseList';
import GPAResults from '@/components/common/GPAResults';
import { useStorage } from '@/hooks/useStorage';
import { calculateGPA } from '@/utils/calculations';
import Layout from '@/constants/Layout';
import { Course } from '@/app/types';
import Colors from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function GPACalculatorScreen() {
  const { courses, settings, saveCourse, deleteCourse, isLoading } = useStorage();
  const [currentSemesterCourses, setCurrentSemesterCourses] = useState<Course[]>([]);

  useFocusEffect(
    useCallback(() => {
      // Refresh data when screen is focused
      setCurrentSemesterCourses(courses.filter(course => course.semester === 'current'));
    }, [courses])
  );

  const handleAddCourse = async (course: Course) => {
    try {
      await saveCourse(course);
    } catch (error) {
      console.error('Failed to add course:', error);
    }
  };

  const handleDeleteCourse = async (courseId: string) => {
    try {
      await deleteCourse(courseId);
    } catch (error) {
      console.error('Failed to delete course:', error);
    }
  };

  const semesterGPA = calculateGPA(currentSemesterCourses, settings.gradingSystem);

  return (
    <SafeAreaView style={styles.safeArea}>
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      bounces={false} // Prevent bounce effect
    >
      <ThemedView style={styles.content}>
        <ThemedText style={styles.title}>GPA Calculator</ThemedText>

        <CourseInput
          gradingSystem={settings.gradingSystem}
          defaultCredits={settings.defaultCredits}
          onSubmit={handleAddCourse}
        />

        <GPAResults
          semesterGPA={semesterGPA}
          courseCount={currentSemesterCourses.length}
        />

        <CourseList
          courses={currentSemesterCourses}
          onDeleteCourse={handleDeleteCourse}
        />
      </ThemedView>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    padding: Layout.spacing.m,
    gap: Layout.spacing.m,
  },
  title: {
    fontSize: Layout.typography.size.xxl,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: Layout.spacing.s,
  },
});