import React from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaWrapper } from '@/components/common/SafeAreaWrapper';
import { Logo } from '@/components/common/Logo';
import { LoginForm } from '@/components/auth/LoginForm';
import { Colors } from '@/utils/colors';
import { Spacing } from '@/utils/spacing';
import { useAuthStore } from '@/store/authStore';

export default function LoginScreen() {
  const router = useRouter();
  const signIn = useAuthStore((state) => state.signIn);

  const handleLogin = async (data: any) => {
    const success = await signIn(data.email, data.password);
    if (success) {
      router.replace('/(main)/home');
    } else {
      const error = useAuthStore.getState().error;
      Alert.alert('Login Failed', error || 'Please check your credentials and try again');
    }
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
