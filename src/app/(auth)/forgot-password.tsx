import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaWrapper } from '@/components/common/SafeAreaWrapper';
import { Logo } from '@/components/common/Logo';
import { ForgotPasswordForm } from '@/components/auth/ForgotPasswordForm';
import { Colors } from '@/utils/colors';
import { Spacing } from '@/utils/spacing';

export default function ForgotPasswordScreen() {
  const router = useRouter();

  const handleReset = async (data: any) => {
    // TODO: Implement real password reset with Supabase in Phase 3
    console.log('Reset attempt:', data);
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
