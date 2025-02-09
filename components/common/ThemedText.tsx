import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';
import { useTheme } from '@/context/ThemeContext';

interface ThemedTextProps extends TextProps {
  type?: 'title' | 'subtitle' | 'body' | 'caption';
}

export function ThemedText({ style, type = 'body', ...props }: ThemedTextProps) {
  const colorScheme = useColorScheme() || 'light';
  const { theme } = useTheme();
  const colors = Colors[theme];

  const baseStyle = {
    color: colors.text,
    ...getTextStyle(type),
  };

  return (
    <Text 
      style={[baseStyle, style]} 
      {...props} 
    />
  );
}

const getTextStyle = (type: ThemedTextProps['type']) => {
  switch (type) {
    case 'title':
      return styles.title;
    case 'subtitle':
      return styles.subtitle;
    case 'caption':
      return styles.caption;
    default:
      return styles.body;
  }
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
  },
  body: {
    fontSize: 16,
    lineHeight: 22,
  },
  caption: {
    fontSize: 14,
    lineHeight: 20,
  },
});