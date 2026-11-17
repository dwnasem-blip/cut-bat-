import React, { useState } from 'react';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  I18nManager,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/utils/colors';
import { Spacing } from '@/utils/spacing';
import { Typography } from '@/utils/typography';

interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}

export const Input = ({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  secureTextEntry: initialSecure = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
}: InputProps) => {
  const [secureTextEntry, setSecureTextEntry] = useState(initialSecure);

  const toggleSecure = () => setSecureTextEntry(!secureTextEntry);

  const styles = StyleSheet.create({
    container: {
      marginBottom: Spacing.md,
    },
    label: {
      ...Typography.bodySmall,
      color: Colors.textPrimary,
      marginBottom: Spacing.sm,
    },
    inputContainer: {
      flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
      alignItems: 'center',
      backgroundColor: Colors.cards,
      borderRadius: 8,
      borderWidth: error ? 2 : 1,
      borderColor: error ? Colors.error : Colors.border,
      paddingHorizontal: Spacing.md,
    },
    input: {
      flex: 1,
      paddingVertical: Spacing.md,
      ...Typography.body,
      color: Colors.textPrimary,
      textAlign: I18nManager.isRTL ? 'right' : 'left',
    },
    toggleButton: {
      padding: Spacing.sm,
    },
    errorText: {
      ...Typography.caption,
      color: Colors.error,
      marginTop: Spacing.sm,
    },
  });

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={Colors.textTertiary}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
        />
        {initialSecure && (
          <TouchableOpacity onPress={toggleSecure} style={styles.toggleButton}>
            <Ionicons
              name={secureTextEntry ? 'eye-off' : 'eye'}
              size={20}
              color={Colors.textSecondary}
            />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};
