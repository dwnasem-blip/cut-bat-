import React from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaWrapper } from '@/components/common/SafeAreaWrapper';
import { Logo } from '@/components/common/Logo';
import { ForgotPasswordForm } from '@/components/auth/ForgotPasswordForm';
import { Colors } from '@/utils/colors';
import { Spacing } from '@/utils/spacing';
import { useAuthStore } from '@/store/authStore';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const resetPassword = useAuthStore((state) => state.resetPassword);

  const handleReset = async (data: any) => {
    const success = await resetPassword(data.email);
    if (success) {
      Alert.alert('Success', 'Password reset link sent! Check your email.');
      router.back();
    } else {
      const error = useAuthStore.getState().error;
      Alert.alert('Failed', error || 'Could not send reset link');
    }
  };

  const handleBackToLogin = () => {
    router.back();
  };

  const styles = StyleSheet.create({
    scrollView: {
      flex: 1,
    },
    content: {
      padding: Spacing.lg,
      justifyContent: 'center',
      alignItems: 'center',
    },
    logoContainer: {
      marginBottom: Spacing.xl,
    },
  });

  return (
    <SafeAreaWrapper>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <View style={styles.logoContainer}>
          <Logo size="large" />
        </View>
        <ForgotPasswordForm
          onSubmit={handleReset}
          onBackToLogin={handleBackToLogin}
        />
      </ScrollView>
    </SafeAreaWrapper>
  );
}
