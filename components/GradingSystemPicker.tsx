import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedView } from './common/ThemedView';
import { ThemedText } from './common/ThemedText';
import { GradingSystem, GRADING_SYSTEM_LABELS } from '@/app/types';
import Layout from '@/constants/Layout';
import Colors from '@/constants/Colors';

interface Props {
  selected: GradingSystem;
  onSelect: (system: GradingSystem) => void;
}

export default function GradingSystemPicker({ selected, onSelect }: Props) {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Grade Scale</ThemedText>
      <View style={styles.optionsContainer}>
        {(Object.keys(GRADING_SYSTEM_LABELS) as GradingSystem[]).map((system) => (
          <TouchableOpacity
            key={system}
            style={[
              styles.option,
              selected === system && styles.selectedOption
            ]}
            onPress={() => onSelect(system)}
          >
            <ThemedText style={[
              styles.optionText,
              selected === system && styles.selectedText
            ]}>
              {GRADING_SYSTEM_LABELS[system]}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </View>
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
  },
  optionsContainer: {
    gap: Layout.spacing.s,
  },
  option: {
    padding: Layout.spacing.m,
    borderRadius: Layout.borderRadius.medium,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  selectedOption: {
    backgroundColor: Colors.light.primary,
    borderColor: Colors.light.primary,
  },
  optionText: {
    fontSize: Layout.typography.size.m,
  },
  selectedText: {
    color: '#fff',
    fontWeight: '500',
  },
});