import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default {
  window: {
    width,
    height,
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    small: 4,
    medium: 8,
    large: 12,
    round: 999,
  },
  typography: {
    size: {
      xs: 12,
      s: 14,
      m: 16,
      l: 18,
      xl: 20,
      xxl: 24,
      xxxl: 32,
    },
    lineHeight: {
      xs: 16,
      s: 20,
      m: 24,
      l: 28,
      xl: 32,
      xxl: 36,
      xxxl: 40,
    },
  },
  isSmallDevice: width < 375,
  maxContentWidth: 1080,
};