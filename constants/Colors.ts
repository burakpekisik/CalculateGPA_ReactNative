export const palette = {
  // Primary colors
  blue: {
    100: '#E6F6FF',
    200: '#BAE3FF',
    300: '#7CC4FA',
    400: '#47A3F3',
    500: '#0A84FF',
    600: '#0060BC',
    700: '#00449E',
    800: '#002C67',
    900: '#001234',
  },
  // Neutral colors
  gray: {
    100: '#F7F7F7',
    200: '#E6E6E6',
    300: '#D4D4D4',
    400: '#A3A3A3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },
  dark: {
    background: '#121212',
    surface: '#1E1E1E',
    elevated: '#2C2C2C',
    border: '#404040',
    primaryText: '#FFFFFF',
    secondaryText: '#A0A0A0',
    disabled: '#666666'
  },
  primary: {
    light: '#4F46E5',
    dark: '#6366F1',
    gradient: ['#4F46E5', '#7C3AED'],
  },
  secondary: {
    light: '#EC4899',
    dark: '#F472B6',
    gradient: ['#EC4899', '#F472B6'],
  },
  background: {
    light: '#F9FAFB',
    dark: '#111827',
    gradient: ['#F9FAFB', '#F3F4F6'],
  },
  // Status colors
  success: '#22C55E',
  warning: '#F59E0B',
  error: '#EF4444',
};

const baseColors = {
  light: {
    primary: palette.blue[500],
    background: '#FFFFFF',
    surface: palette.gray[100],
    text: palette.gray[900],
    textSecondary: palette.gray[600],
    border: palette.gray[200],
    divider: palette.gray[200],
    error: '#EF4444',  // Add error color
    success: '#22C55E',
    warning: '#F59E0B',
  },
  dark: {
    primary: palette.blue[400],
    background: palette.gray[900],
    surface: palette.gray[800],
    text: palette.gray[100],
    textSecondary: palette.gray[400],
    border: palette.gray[700],
    divider: palette.gray[700],
    error: '#EF4444',  // Add error color
    success: '#22C55E',
    warning: '#F59E0B',
  },
};

export default {
  light: {
    ...baseColors.light,
    statusBar: 'dark',
    tint: baseColors.light.primary,
  },
  dark: {
    primary: palette.blue[400],
    background: palette.dark.background,
    surface: palette.dark.surface,
    card: palette.dark.elevated,
    text: palette.dark.primaryText,
    textSecondary: palette.dark.secondaryText,
    border: palette.dark.border,
    divider: palette.dark.border,
    error: '#FF453A',
    success: '#32D74B',
    warning: '#FFD60A',
  },
};