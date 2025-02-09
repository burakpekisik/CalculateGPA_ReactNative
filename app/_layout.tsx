import { Stack } from 'expo-router';
import { ThemeProvider } from '@/context/ThemeContext';
import { GradingSystemProvider } from '@/context/GradingSystemContext';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <GradingSystemProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </GradingSystemProvider>
    </ThemeProvider>
  );
}