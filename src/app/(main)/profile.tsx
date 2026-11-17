import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaWrapper } from '@/components/common/SafeAreaWrapper';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { useAuth } from '@/hooks/useAuth';
import { Colors } from '@/utils/colors';
import { Spacing } from '@/utils/spacing';
import { Typography } from '@/utils/typography';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.replace('/(auth)/login');
  };

  const styles = StyleSheet.create({
    container: { flex: 1, padding: Spacing.lg },
    title: { ...Typography.h2, color: Colors.white, marginBottom: Spacing.lg },
    card: { marginBottom: Spacing.lg, padding: Spacing.lg },
    text: { ...Typography.body, color: Colors.textSecondary },
    userInfo: { ...Typography.body, color: Colors.textPrimary, marginBottom: Spacing.sm },
  });

  return (
    <SafeAreaWrapper>
      <View style={styles.container}>
        <Text style={styles.title}>Profile & Settings</Text>
        <Card style={styles.card}>
          <Text style={styles.userInfo}>Email: {user?.email}</Text>
          <Text style={styles.text}>Settings coming soon</Text>
        </Card>
        <Button
          title="Logout"
          onPress={handleLogout}
          variant="secondary"
          size="large"
          fullWidth
        />
      </View>
    </SafeAreaWrapper>
  );
}
