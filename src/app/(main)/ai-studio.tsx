import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaWrapper } from '@/components/common/SafeAreaWrapper';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { useI18n } from '@/hooks/useI18n';
import { Colors } from '@/utils/colors';
import { Spacing } from '@/utils/spacing';
import { Typography } from '@/utils/typography';

export default function AIStudioScreen() {
  const { t } = useI18n();

  const styles = StyleSheet.create({
    scrollView: { flex: 1 },
    content: { padding: Spacing.lg },
    title: { ...Typography.h2, color: Colors.white, marginBottom: Spacing.lg },
    card: { marginBottom: Spacing.md, padding: Spacing.md },
    button: { marginBottom: Spacing.md },
  });

  return (
    <SafeAreaWrapper>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <Text style={styles.title}>{t('aiStudio.title')}</Text>
        <Card style={styles.card}>
          <Button title={t('aiStudio.aiDirector')} onPress={() => {}} style={styles.button} fullWidth />
          <Button title={t('aiStudio.textToVideo')} onPress={() => {}} style={styles.button} fullWidth />
          <Button title={t('aiStudio.imageToVideo')} onPress={() => {}} style={styles.button} fullWidth />
          <Button title={t('aiStudio.voiceStudio')} onPress={() => {}} fullWidth />
        </Card>
      </ScrollView>
    </SafeAreaWrapper>
  );
}
