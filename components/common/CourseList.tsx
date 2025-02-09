import React, {useEffect, useState} from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { Course } from '@/app/types';
import Layout from '@/constants/Layout';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { ErrorMessage } from './ErrorMessage';
import { useGradingSystem } from '@/context/GradingSystemContext';
import { GRADING_SCALES, GRADING_SYSTEM_LABELS, CLASS_TERMS } from '@/app/types';
import { CollapsibleSection } from '../CollapsibleSection';
import { TermGPASummary } from '../TermGPASummary';
import { calculateTermGPA } from '@/utils/calculations';

interface CourseListProps {
  courses: Course[];
  onDeleteCourse: (id: string) => void;
}

export default function CourseList({ courses, onDeleteCourse }: CourseListProps) {
  const { gradingSystem } = useGradingSystem();
  const [error, setError] = useState<string | null>(null);
  const coursesByTerm = CLASS_TERMS.map(term => {
    const termCourses = courses.filter(course => course.classTerm === term.value);
    const termStats = calculateTermGPA(termCourses, gradingSystem);
    
    return {
      ...term,
      courses: termCourses,
      ...termStats
    };
  }).filter(term => term.courses.length > 0);

  useEffect(() => {
    const invalidGrades = courses.filter(course => {
      try {
        if (!GRADING_SCALES[gradingSystem][course.grade]) {
          return true;
        }
      } catch {
        return true;
      }
      return false;
    });

    if (invalidGrades.length > 0) {
      setError(`Some courses have grades from different grading systems. Please update their grades to match the current system (${GRADING_SYSTEM_LABELS[gradingSystem]}).`);
    } else {
      setError(null);
    }
  }, [courses, gradingSystem]);

  const confirmDelete = (courseId: string, courseName: string) => {
    Alert.alert(
      "Delete Course",
      `Are you sure you want to delete ${courseName}?`,
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          onPress: () => onDeleteCourse(courseId),
          style: "destructive"
        }
      ]
    );
  };

  if (courses.length === 0) {
    return (
      <ThemedView style={styles.emptyContainer}>
        <ThemedText style={styles.emptyText}>
          No courses added yet
        </ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      {error && <ErrorMessage message={error} />}
      <ThemedText style={styles.title}>Current Courses</ThemedText>
      
      {coursesByTerm.map(term => (
        <CollapsibleSection 
          key={term.value}
          title={term.label}
          count={term.courses.length}
        >
          <TermGPASummary 
            gpa={term.gpa}
            totalCredits={term.totalCredits}
            courseCount={term.courseCount}
          />
          {term.courses.map((course) => (
            <ThemedView key={course.id} style={styles.courseItem}>
              <View style={styles.courseInfo}>
                <ThemedText style={styles.courseName}>{course.name}</ThemedText>
                <ThemedText style={styles.courseDetails}>
                  Grade: {course.grade} | Credits: {course.credits}
                </ThemedText>
              </View>
              <TouchableOpacity 
                onPress={() => confirmDelete(course.id, course.name)}
                style={styles.deleteButton}
              >
                <Ionicons name="trash-outline" size={20} color={Colors.light.error} />
              </TouchableOpacity>
            </ThemedView>
          ))}
        </CollapsibleSection>
      ))}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Layout.spacing.m,
  },
  title: {
    fontSize: Layout.typography.size.l,
    fontWeight: 'bold',
    marginBottom: Layout.spacing.s,
  },
  courseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Layout.spacing.m,
    borderRadius: Layout.borderRadius.medium,
    borderWidth: 1,
    borderColor: Colors.light.border,
    marginBottom: Layout.spacing.s,
  },
  courseInfo: {
    flex: 1,
  },
  courseName: {
    fontSize: Layout.typography.size.m,
    fontWeight: '500',
  },
  courseDetails: {
    fontSize: Layout.typography.size.s,
    color: Colors.light.textSecondary,
  },
  deleteButton: {
    padding: Layout.spacing.s,
  },
  emptyContainer: {
    padding: Layout.spacing.xl,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: Layout.typography.size.m,
    color: Colors.light.textSecondary,
  },
});