import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemedView } from './common/ThemedView';
import { ThemedText } from './common/ThemedText';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';

interface TermGPASummaryProps {
  gpa: number;
  totalCredits: number;
  courseCount: number;
}

export function TermGPASummary({ gpa, totalCredits, courseCount }: TermGPASummaryProps) {
  const getGPAColor = (gpa: number) => {
    if (gpa >= 3.5) return Colors.light.success;
    if (gpa >= 2.0) return Colors.light.warning;
    return Colors.light.error;
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={[styles.gpa, { color: getGPAColor(gpa) }]}>
        GPA: {gpa.toFixed(2)}
      </ThemedText>
      <ThemedText style={styles.details}>
        {courseCount} Courses | {totalCredits} Credits
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Layout.spacing.s,
    borderLeftWidth: 3,
    borderLeftColor: Colors.light.primary,
    marginVertical: Layout.spacing.s,
  },
  gpa: {
    fontSize: Layout.typography.size.l,
    fontWeight: 'bold',
  },
  details: {
    fontSize: Layout.typography.size.s,
    color: Colors.light.textSecondary,
  },
});