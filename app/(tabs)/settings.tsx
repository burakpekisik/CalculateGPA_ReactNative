import React from 'react';
import { ScrollView, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { ThemedView } from '@/components/common/ThemedView';
import { ThemedText } from '@/components/common/ThemedText';
import GradingSystemPicker from '@/components/GradingSystemPicker';
import { useStorage } from '@/hooks/useStorage';
import Layout from '@/constants/Layout';
import Colors from '@/constants/Colors';
import { ReactNode } from 'react';
import { GradingSystem, AppSettings } from '@/app/types';
import { useTheme } from '@/context/ThemeContext';
import { useGradingSystem } from '@/context/GradingSystemContext';
import { SafeAreaView } from 'react-native-safe-area-context';

interface SectionProps {
    title: string;
    children: ReactNode;
  }
  
  interface SettingsRowProps {
    label: string;
    control: ReactNode;
  }
  
  interface NumberStepperProps {
    value: number;
    onChange: (value: number) => void;
    min: number;
    max: number;
  }

export default function SettingsScreen() {
  const { theme, toggleTheme } = useTheme();
  const { settings, updateSettings } = useStorage();
  const { gradingSystem, updateGradingSystem } = useGradingSystem();

  const handleGradingSystemChange = async (system: GradingSystem) => {
    try {
      await updateGradingSystem(system);
    } catch (error) {
      console.error('Failed to update grading system:', error);
    }
  };

  const handleThemeToggle = async () => {
    try {
      await toggleTheme();
    } catch (error) {
      console.error('Failed to toggle theme:', error);
    }
  };

  const handleDefaultCreditsChange = async (value: number) => {
    try {
      await updateSettings({ defaultCredits: value });
    } catch (error) {
      console.error('Failed to update default credits:', error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      bounces={false} // Prevent bounce effect
    >
      <ThemedView style={styles.content}>
      <Section title="Grading System">
          <GradingSystemPicker
            selected={gradingSystem}
            onSelect={handleGradingSystemChange}
          />
        </Section>

        <Section title="Appearance">
          <SettingsRow
            label="Dark Mode"
            control={
              <Switch
                value={theme === 'dark'}
                onValueChange={handleThemeToggle}
              />
            }
          />
        </Section>

        <Section title="Default Values">
          <SettingsRow
            label="Default Credits"
            control={
              <NumberStepper
                value={settings.defaultCredits}
                onChange={handleDefaultCreditsChange}
                min={1}
                max={6}
              />
            }
          />
        </Section>
      </ThemedView>
    </ScrollView>
    </SafeAreaView>
  );
}

const Section = ({ title, children }: SectionProps) => (
    <ThemedView style={styles.section}>
      <ThemedText style={styles.sectionTitle}>{title}</ThemedText>
      {children}
    </ThemedView>
  );
  
  const SettingsRow = ({ label, control }: SettingsRowProps) => (
    <ThemedView style={styles.row}>
      <ThemedText>{label}</ThemedText>
      {control}
    </ThemedView>
  );
  
  const NumberStepper = ({ value, onChange, min, max }: NumberStepperProps) => (
    <ThemedView style={styles.stepper}>
      <TouchableOpacity
        onPress={() => value > min && onChange(value - 1)}
        style={styles.stepperButton}
      >
        <ThemedText>-</ThemedText>
      </TouchableOpacity>
      <ThemedText style={styles.stepperValue}>{value}</ThemedText>
      <TouchableOpacity
        onPress={() => value < max && onChange(value + 1)}
        style={styles.stepperButton}
      >
        <ThemedText>+</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.light.background, // Add background color
  },
  scrollContent: {
    flexGrow: 1, // Make content fill screen
  },
  content: {
    padding: Layout.spacing.m,
    gap: Layout.spacing.l,
  },
  title: {
    fontSize: Layout.typography.size.xxl,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: Layout.spacing.m,
  },
  section: {
    gap: Layout.spacing.m,
  },
  sectionTitle: {
    fontSize: Layout.typography.size.l,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Layout.spacing.s,
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Layout.spacing.s,
  },
  stepperButton: {
    padding: Layout.spacing.s,
    borderRadius: Layout.borderRadius.small,
    backgroundColor: Colors.light.primary,
  },
  stepperValue: {
    minWidth: 30,
    textAlign: 'center',
  },
});