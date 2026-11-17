import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  ActivityIndicator,
  I18nManager,
} from 'react-native';
import { Colors } from '@/utils/colors';
import { Spacing } from '@/utils/spacing';
import { Typography } from '@/utils/typography';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  fullWidth?: boolean;
}

export const Button = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  style,
  fullWidth = false,
}: ButtonProps) => {
  const getBackgroundColor = () => {
    if (disabled) return Colors.textTertiary;
    if (variant === 'primary') return Colors.primary;
    if (variant === 'secondary') return Colors.cards;
    return 'transparent';
  };

  const getTextColor = () => {
    if (variant === 'tertiary') return Colors.primary;
    return Colors.white;
  };

  const getPadding = () => {
    if (size === 'small') return Spacing.sm;
    if (size === 'large') return Spacing.lg;
    return Spacing.md;
  };

  const styles = StyleSheet.create({
    button: {
      backgroundColor: getBackgroundColor(),
      paddingHorizontal: getPadding() * 1.5,
      paddingVertical: getPadding(),
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
      width: fullWidth ? '100%' : 'auto',
      borderWidth: variant === 'tertiary' ? 1 : 0,
      borderColor: variant === 'tertiary' ? Colors.primary : 'transparent',
      minHeight: size === 'small' ? 36 : size === 'large' ? 56 : 44,
    },
    text: {
      color: getTextColor(),
      ...Typography.button,
    },
  });

  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} size="small" />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};
