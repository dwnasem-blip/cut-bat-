import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaWrapper } from '@/components/common/SafeAreaWrapper';
import { Card } from '@/components/common/Card';
import { useI18n } from '@/hooks/useI18n';
import { Colors } from '@/utils/colors';
import { Spacing } from '@/utils/spacing';
import { Typography } from '@/utils/typography';

export default function HomeScreen() {
  const { t } = useI18n();

  const styles = StyleSheet.create({
    scrollView: {
      flex: 1,
    },
    content: {
      padding: Spacing.lg,
    },
    title: {
      ...Typography.h2,
      color: Colors.white,
      marginBottom: Spacing.lg,
    },
    card: {
      marginBottom: Spacing.md,
    },
    cardText: {
      ...Typography.body,
      color: Colors.textSecondary,
    },
  });

  return (
    <SafeAreaWrapper>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <Text style={styles.title}>{t('home.welcome')}</Text>

        <Card style={styles.card}>
          <Text style={styles.cardText}>{t('home.recentProjects')}</Text>
          <Text style={[styles.cardText, { marginTop: Spacing.sm }]}>{t('home.noProjects')}</Text>
        </Card>

        <Card style={styles.card}>
          <Text style={styles.cardText}>{t('home.aiSuggestions')}</Text>
          <Text style={[styles.cardText, { marginTop: Spacing.sm }]}>Coming soon...</Text>
        </Card>
      </ScrollView>
    </SafeAreaWrapper>
  );
}
