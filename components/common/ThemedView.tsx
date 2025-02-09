import React from 'react';
import { View, ViewProps, StyleSheet, Platform } from 'react-native';
import { useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';
import { useTheme } from '@/context/ThemeContext';

interface ThemedViewProps extends ViewProps {
  variant?: 'primary' | 'secondary' | 'card';
}

export function ThemedView({ style, variant, ...props }: ThemedViewProps) {
  const colorScheme = useColorScheme() || 'light';
  const { theme } = useTheme();
  const colors = Colors[theme];

  const baseStyle = {
    backgroundColor: getBackgroundColor(colors, variant),
    ...getVariantStyle(variant),
  };

  return (
    <View 
      style={[baseStyle, style]} 
      {...props} 
    />
  );
}

const getBackgroundColor = (colors: any, variant?: ThemedViewProps['variant']) => {
  switch (variant) {
    case 'primary':
      return colors.primary;
    case 'secondary':
      return colors.surface;
    case 'card':
      return colors.card;
    default:
      return colors.background;
  }
};

const getVariantStyle = (variant?: ThemedViewProps['variant']) => {
  switch (variant) {
    case 'card':
      return styles.card;
    default:
      return {};
  }
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8
      },
      android: {
        elevation: 3
      }
    })
  },
});