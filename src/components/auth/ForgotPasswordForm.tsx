import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ForgotPasswordSchema } from '@/utils/schemas';
import { useForgotPasswordForm } from '@/hooks/useForm';
import { useI18n } from '@/hooks/useI18n';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { Colors } from '@/utils/colors';
import { Spacing } from '@/utils/spacing';
import { Typography } from '@/utils/typography';

interface ForgotPasswordFormProps {
  onSubmit: (data: any) => Promise<void>;
  onBackToLogin: () => void;
}

export const ForgotPasswordForm = ({ onSubmit, onBackToLogin }: ForgotPasswordFormProps) => {
  const { t } = useI18n();
  const form = useForgotPasswordForm();

  const handleSubmit = async () => {
    form.setErrors({});

    try {
      const validatedData = ForgotPasswordSchema.parse({
        email: form.email,
      });

      form.setLoading(true);
      await onSubmit(validatedData);
      form.setSent(true);
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
    successMessage: {
      ...Typography.body,
      color: Colors.success,
      textAlign: 'center',
      marginBottom: Spacing.lg,
      padding: Spacing.md,
      backgroundColor: Colors.cards,
      borderRadius: 8,
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

  if (form.sent) {
    return (
      <Card style={styles.form}>
        <Text style={styles.successMessage}>{t('auth.resetSent')}</Text>
        <Button
          title={t('auth.backToLogin')}
          onPress={onBackToLogin}
          variant="primary"
          size="large"
          fullWidth
        />
      </Card>
    );
  }

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

      <Button
        title={t('auth.resetButton')}
        onPress={handleSubmit}
        loading={form.loading}
        variant="primary"
        size="large"
        fullWidth
      />

      <View style={styles.footer}>
        <Button
          title={t('auth.backToLogin')}
          onPress={onBackToLogin}
          variant="tertiary"
          size="small"
        />
      </View>
    </Card>
  );
};
