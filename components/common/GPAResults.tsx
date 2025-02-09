import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import Layout from '@/constants/Layout';
import Colors from '@/constants/Colors';

interface GPAResultsProps {
  semesterGPA: number;
  cumulativeGPA?: number;
  totalCredits?: number;
  courseCount: number;
}

export default function GPAResults({
  semesterGPA,
  cumulativeGPA,
  totalCredits,
  courseCount,
}: GPAResultsProps) {
  const getGPAColor = (gpa: number) => {
    if (gpa >= 3.5) return Colors.light.success;
    if (gpa >= 2.0) return Colors.light.warning;
    return Colors.light.error;
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.gpaContainer}>
        <ThemedView style={styles.gpaCard}>
          <ThemedText style={styles.label}>Semester GPA</ThemedText>
          <ThemedText 
            style={[
              styles.gpaValue, 
              { color: getGPAColor(semesterGPA) }
            ]}
          >
            {semesterGPA.toFixed(2)}
          </ThemedText>
          <ThemedText style={styles.subtitle}>
            {courseCount} Course{courseCount !== 1 ? 's' : ''}
          </ThemedText>
        </ThemedView>

        {cumulativeGPA !== undefined && (
          <ThemedView style={styles.gpaCard}>
            <ThemedText style={styles.label}>Cumulative GPA</ThemedText>
            <ThemedText 
              style={[
                styles.gpaValue, 
                { color: getGPAColor(cumulativeGPA) }
              ]}
            >
              {cumulativeGPA.toFixed(2)}
            </ThemedText>
            {totalCredits && (
              <ThemedText style={styles.subtitle}>
                {totalCredits} Total Credits
              </ThemedText>
            )}
          </ThemedView>
        )}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Layout.spacing.m,
    minHeight: 150, // Add minimum height
  },
  gpaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: Layout.spacing.m,
    paddingVertical: Layout.spacing.m, // Add vertical padding
  },
  gpaCard: {
    flex: 1,
    alignItems: 'center',
    padding: Layout.spacing.l, // Increase padding
    borderRadius: Layout.borderRadius.medium,
    borderWidth: 1,
    borderColor: Colors.light.border,
    minHeight: 120, // Add minimum height
  },
  label: {
    fontSize: Layout.typography.size.s,
    color: Colors.light.textSecondary,
    marginBottom: Layout.spacing.m, // Increase bottom margin
  },
  gpaValue: {
    fontSize: Layout.typography.size.xxxl,
    fontWeight: 'bold',
    lineHeight: 40, // Add line height
  },
  subtitle: {
    fontSize: Layout.typography.size.s,
    color: Colors.light.textSecondary,
    marginTop: Layout.spacing.m, // Increase top margin
  },
});