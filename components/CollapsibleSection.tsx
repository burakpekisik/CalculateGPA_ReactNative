import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedView } from './common/ThemedView';
import { ThemedText } from './common/ThemedText';
import Layout from '@/constants/Layout';
import Colors from '@/constants/Colors';

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  count: number;
}

export function CollapsibleSection({ title, children, count }: CollapsibleSectionProps) {
  const [expanded, setExpanded] = useState(true);
  const [animation] = useState(new Animated.Value(1));

  const toggleExpand = () => {
    Animated.timing(animation, {
      toValue: expanded ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setExpanded(!expanded);
  };

  return (
    <ThemedView style={styles.container}>
      <TouchableOpacity onPress={toggleExpand} style={styles.header}>
        <ThemedText style={styles.title}>
          {title} ({count})
        </ThemedText>
        <Ionicons 
          name={expanded ? 'chevron-up' : 'chevron-down'} 
          size={24} 
          color={Colors.light.text} 
        />
      </TouchableOpacity>
      <Animated.View style={[
        styles.content,
        {
          maxHeight: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1000],
          }),
          opacity: animation,
        },
      ]}>
        {children}
      </Animated.View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Layout.spacing.m,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Layout.spacing.m,
    backgroundColor: Colors.light.surface,
    borderRadius: Layout.borderRadius.medium,
  },
  title: {
    fontSize: Layout.typography.size.l,
    fontWeight: 'bold',
  },
  content: {
    overflow: 'hidden',
  },
});