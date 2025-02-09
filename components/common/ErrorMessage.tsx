import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import Layout from '@/constants/Layout';
import Colors from '@/constants/Colors';

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.text}>{message}</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.error + '20',
    padding: Layout.spacing.m,
    borderRadius: Layout.borderRadius.medium,
    marginVertical: Layout.spacing.s,
  },
  text: {
    color: Colors.light.error,
    fontSize: Layout.typography.size.s,
  },
});