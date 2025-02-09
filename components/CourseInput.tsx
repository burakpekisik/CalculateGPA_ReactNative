import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ThemedView } from './common/ThemedView';
import { ThemedText } from './common/ThemedText';
import { Course, GradingSystem, GRADING_SCALES, ClassTerm, CLASS_TERMS } from '@/app/types';
import { convertGrade } from '@/utils/calculations';
import Layout from '@/constants/Layout';
import Colors from '@/constants/Colors';
import { useGradingSystem } from '@/context/GradingSystemContext';
import { useTheme } from '@/context/ThemeContext';

interface CourseInputProps {
  gradingSystem: GradingSystem;
  defaultCredits: number;
  onSubmit: (course: Course) => Promise<void>;
}

export default function CourseInput({ defaultCredits, onSubmit }: Omit<CourseInputProps, 'gradingSystem'>) {
  const { gradingSystem } = useGradingSystem();
  const [courseName, setCourseName] = useState('');
  const [grade, setGrade] = useState('');
  const [credits, setCredits] = useState(defaultCredits.toString());
  const [classTerm, setClassTerm] = useState<ClassTerm>('1-1');
  const [error, setError] = useState('');
  const [prevSystem, setPrevSystem] = useState<GradingSystem>(gradingSystem);
  const { theme } = useTheme();

  useEffect(() => {
    if (grade && prevSystem !== gradingSystem) {
      try {
        const newGrade = convertGrade(grade, prevSystem, gradingSystem);
        setGrade(newGrade);
      } catch (error) {
        setGrade('');
      }
      setPrevSystem(gradingSystem);
    }
  }, [gradingSystem]);

  const handleSubmit = () => {
    if (!courseName.trim()) {
      setError('Course name is required');
      return;
    }

    if (!grade) {
      setError('Grade is required');
      return;
    }

    const creditValue = Number(credits);
    if (isNaN(creditValue) || creditValue <= 0) {
      setError('Invalid credits');
      return;
    }

    const courseData: Course = {
      id: Date.now().toString(),
      name: courseName.trim(),
      grade,
      credits: Number(credits),
      semester: 'current',
      classTerm,
      createdAt: Date.now()
    };

    onSubmit(courseData);
    
    setCourseName('');
    setGrade('');
    setCredits(defaultCredits.toString());
    setError('');
  };

  const grades = Object.keys(GRADING_SCALES[gradingSystem]);

  return (
    <ThemedView style={styles.container}>
      <TextInput
        style={[
          styles.input,
          { color: theme === 'dark' ? Colors.dark.text : Colors.light.text }
        ]}
        placeholder="Course Name"
        placeholderTextColor={theme === 'dark' ? Colors.dark.textSecondary : Colors.light.textSecondary}
        value={courseName}
        onChangeText={setCourseName}
      />

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={classTerm}
          onValueChange={(itemValue) => setClassTerm(itemValue as ClassTerm)}
          style={[
            styles.picker,
            { color: theme === 'dark' ? Colors.dark.text : Colors.light.text }
          ]}
          itemStyle={[
            styles.pickerItem,
            { color: theme === 'dark' ? Colors.dark.text : Colors.light.text }
          ]}
        >
          {CLASS_TERMS.map((term) => (
            <Picker.Item 
              key={term.value} 
              label={term.label} 
              value={term.value}
              color={theme === 'dark' ? Colors.dark.text : Colors.light.text}
            />
          ))}
        </Picker>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Credits"
        value={credits}
        onChangeText={setCredits}
        keyboardType="numeric"
      />

      {error ? (
        <ThemedText style={styles.error}>{error}</ThemedText>
      ) : null}

      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit}
      >
        <ThemedText style={styles.submitButtonText}>Add Course</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Layout.spacing.m,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: Layout.borderRadius.medium,
    paddingHorizontal: Layout.spacing.m,
    ...Platform.select({
      ios: {
        backgroundColor: 'transparent',
      },
    }),
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: Layout.borderRadius.medium,
    overflow: 'hidden',
  },
  picker: {
    height: 48,
    ...Platform.select({
      ios: {
        backgroundColor: 'transparent',
      },
    }),
  },
  pickerItem: {
    fontSize: Layout.typography.size.m,
    height: 48,
  },
  gradeSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Layout.spacing.s,
  },
  gradeButton: {
    padding: Layout.spacing.s,
    borderRadius: Layout.borderRadius.small,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  selectedGrade: {
    backgroundColor: Colors.light.primary,
  },
  error: {
    color: Colors.light.error,
    fontSize: Layout.typography.size.s,
  },
  submitButton: {
    backgroundColor: Colors.light.primary,
    padding: Layout.spacing.m,
    borderRadius: Layout.borderRadius.medium,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});