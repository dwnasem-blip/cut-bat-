import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaWrapper } from '@/components/common/SafeAreaWrapper';
import { Logo } from '@/components/common/Logo';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { Colors } from '@/utils/colors';
import { Spacing } from '@/utils/spacing';

export default function RegisterScreen() {
  const router = useRouter();

  const handleRegister = async (data: any) => {
    // TODO: Implement real registration with Supabase in Phase 3
    console.log('Register attempt:', data);
    // For now, simulate successful registration
    router.replace('/(main)/home');
  };

  const handleBackToLogin = () => {
    router.back();
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
        <RegisterForm
          onSubmit={handleRegister}
          onBackToLogin={handleBackToLogin}
        />
      </ScrollView>
    </SafeAreaWrapper>
  );
}
