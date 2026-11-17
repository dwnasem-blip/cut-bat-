import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Colors } from '@/utils/colors';
import { Spacing } from '@/utils/spacing';

interface CardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  padding?: number;
}

export const Card = ({ children, style, padding = Spacing.md }: CardProps) => {
  const styles = StyleSheet.create({
    card: {
      backgroundColor: Colors.cards,
      borderRadius: 12,
      padding,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
  });

  return <View style={[styles.card, style]}>{children}</View>;
};
