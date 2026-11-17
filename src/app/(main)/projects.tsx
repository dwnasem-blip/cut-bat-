import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaWrapper } from '@/components/common/SafeAreaWrapper';
import { Card } from '@/components/common/Card';
import { Colors } from '@/utils/colors';
import { Spacing } from '@/utils/spacing';
import { Typography } from '@/utils/typography';

export default function ProjectsScreen() {
  const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: Spacing.lg },
    title: { ...Typography.h2, color: Colors.white, marginBottom: Spacing.lg, textAlign: 'center' },
    card: { width: '100%', padding: Spacing.lg },
    text: { ...Typography.body, color: Colors.textSecondary, textAlign: 'center' },
  });

  return (
    <SafeAreaWrapper>
      <View style={styles.container}>
        <Card style={styles.card}>
          <Text style={styles.title}>My Projects</Text>
          <Text style={styles.text}>Projects management coming in Phase 10</Text>
        </Card>
      </View>
    </SafeAreaWrapper>
  );
}
