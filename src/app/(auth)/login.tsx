import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaWrapper } from '@/components/common/SafeAreaWrapper';
import { Logo } from '@/components/common/Logo';
import { LoginForm } from '@/components/auth/LoginForm';
import { Colors } from '@/utils/colors';
import { Spacing } from '@/utils/spacing';

export default function LoginScreen() {
  const router = useRouter();

  const handleLogin = async (data: any) => {
    // TODO: Implement real login with Supabase in Phase 3
    console.log('Login attempt:', data);
    // For now, simulate successful login
    router.replace('/(main)/home');
  };

  const handleForgotPassword = () => {
    router.push('/(auth)/forgot-password');
  };

  const handleCreateAccount = () => {
    router.push('/(auth)/register');
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.background,
    },
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
        <LoginForm
          onSubmit={handleLogin}
          onForgotPassword={handleForgotPassword}
          onCreateAccount={handleCreateAccount}
        />
      </ScrollView>
    </SafeAreaWrapper>
  );
}
