import React from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaWrapper } from '@/components/common/SafeAreaWrapper';
import { Logo } from '@/components/common/Logo';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { Colors } from '@/utils/colors';
import { Spacing } from '@/utils/spacing';
import { useAuthStore } from '@/store/authStore';

export default function RegisterScreen() {
  const router = useRouter();
  const signUp = useAuthStore((state) => state.signUp);

  const handleRegister = async (data: any) => {
    const success = await signUp(data.email, data.password);
    if (success) {
      Alert.alert('Success', 'Account created! Please check your email to confirm your account.');
      router.replace('/(auth)/login');
    } else {
      const error = useAuthStore.getState().error;
      Alert.alert('Registration Failed', error || 'Please try again');
    }
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
