import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaWrapper } from '@/components/common/SafeAreaWrapper';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { useAuth } from '@/hooks/useAuth';
import { Colors } from '@/utils/colors';
import { Spacing } from '@/utils/spacing';
import { Typography } from '@/utils/typography';

export default function ProfileScreen() {
  const { logout } = useAuth();

  const styles = StyleSheet.create({
    container: { flex: 1, padding: Spacing.lg },
    title: { ...Typography.h2, color: Colors.white, marginBottom: Spacing.lg },
    card: { marginBottom: Spacing.lg, padding: Spacing.lg },
    text: { ...Typography.body, color: Colors.textSecondary },
  });

  return (
    <SafeAreaWrapper>
      <View style={styles.container}>
        <Text style={styles.title}>Profile & Settings</Text>
        <Card style={styles.card}>
          <Text style={styles.text}>Settings coming in Phase 3</Text>
        </Card>
        <Button
          title="Logout"
          onPress={logout}
          variant="secondary"
          size="large"
          fullWidth
        />
      </View>
    </SafeAreaWrapper>
  );
}
