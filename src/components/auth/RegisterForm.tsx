import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RegisterSchema } from '@/utils/schemas';
import { useRegisterForm } from '@/hooks/useForm';
import { useI18n } from '@/hooks/useI18n';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { Colors } from '@/utils/colors';
import { Spacing } from '@/utils/spacing';
import { Typography } from '@/utils/typography';

interface RegisterFormProps {
  onSubmit: (data: any) => Promise<void>;
  onBackToLogin: () => void;
}

export const RegisterForm = ({ onSubmit, onBackToLogin }: RegisterFormProps) => {
  const { t } = useI18n();
  const form = useRegisterForm();

  const handleSubmit = async () => {
    form.setErrors({});

    try {
      const validatedData = RegisterSchema.parse({
        email: form.email,
        password: form.password,
        confirmPassword: form.confirmPassword,
        acceptTerms: form.acceptTerms,
      });

      form.setLoading(true);
      await onSubmit(validatedData);
    } catch (err: any) {
      if (err.errors) {
        const errors: any = {};
        err.errors.forEach((error: any) => {
          errors[error.path[0]] = error.message;
        });
        form.setErrors(errors);
      }
    } finally {
      form.setLoading(false);
    }
  };

  const styles = StyleSheet.create({
    form: {
      width: '100%',
    },
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: Spacing.md,
    },
    checkboxText: {
      ...Typography.bodySmall,
      color: Colors.textPrimary,
      marginLeft: Spacing.sm,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: Spacing.lg,
    },
    footerText: {
      ...Typography.bodySmall,
      color: Colors.textSecondary,
    },
    linkText: {
      ...Typography.bodySmall,
      color: Colors.primary,
      marginLeft: Spacing.sm,
    },
  });

  return (
    <Card style={styles.form}>
      <Input
        label={t('auth.email')}
        placeholder={t('auth.email')}
        value={form.email}
        onChangeText={form.setEmail}
        error={form.errors.email}
        keyboardType="email-address"
      />

      <Input
        label={t('auth.password')}
        placeholder={t('auth.password')}
        value={form.password}
        onChangeText={form.setPassword}
        error={form.errors.password}
        secureTextEntry
      />

      <Input
        label={t('auth.confirmPassword')}
        placeholder={t('auth.confirmPassword')}
        value={form.confirmPassword}
        onChangeText={form.setConfirmPassword}
        error={form.errors.confirmPassword}
        secureTextEntry
      />

      <Button
        title={t('auth.registerButton')}
        onPress={handleSubmit}
        loading={form.loading}
        variant="primary"
        size="large"
        fullWidth
      />

      <View style={styles.footer}>
        <Text style={styles.footerText}>{t('auth.haveAccount')}</Text>
        <Button
          title={t('auth.login')}
          onPress={onBackToLogin}
          variant="tertiary"
          size="small"
        />
      </View>
    </Card>
  );
};
