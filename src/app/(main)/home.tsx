import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaWrapper } from '@/components/common/SafeAreaWrapper';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { ProjectCard } from '@/components/project/ProjectCard';
import { useI18n } from '@/hooks/useI18n';
import { useProject } from '@/hooks/useProject';
import { Colors } from '@/utils/colors';
import { Spacing } from '@/utils/spacing';
import { Typography } from '@/utils/typography';

export default function HomeScreen() {
  const router = useRouter();
  const { t } = useI18n();
  const { projects, setCurrentProject } = useProject();

  const recentProjects = projects.slice(0, 3);

  const handleProjectPress = (projectId: string) => {
    const project = projects.find((p) => p.id === projectId);
    if (project) {
      setCurrentProject(project);
      router.push('/(main)/editor');
    }
  };

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
    sectionTitle: {
      ...Typography.h3,
      color: Colors.white,
      marginBottom: Spacing.md,
      marginTop: Spacing.lg,
    },
    card: {
      marginBottom: Spacing.md,
    },
    cardText: {
      ...Typography.body,
      color: Colors.textSecondary,
    },
    projectsList: {
      marginBottom: Spacing.lg,
    },
    newProjectButton: {
      marginBottom: Spacing.lg,
    },
    statsContainer: {
      flexDirection: 'row',
      gap: Spacing.md,
      marginTop: Spacing.lg,
    },
    statCard: {
      flex: 1,
      padding: Spacing.md,
      backgroundColor: Colors.cards,
      borderRadius: 8,
      alignItems: 'center',
    },
    statNumber: {
      ...Typography.h2,
      color: Colors.primary,
    },
    statLabel: {
      ...Typography.bodySmall,
      color: Colors.textSecondary,
      marginTop: Spacing.xs,
    },
  });

  return (
    <SafeAreaWrapper>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <Text style={styles.title}>{t('home.welcome')}</Text>

        <View style={styles.newProjectButton}>
          <Button
            title={`+ ${t('home.createNewProject')}`}
            onPress={() => router.push('/(main)/projects')}
            variant="primary"
            fullWidth
          />
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{projects.length}</Text>
            <Text style={styles.statLabel}>Projects</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {Math.round(projects.reduce((sum, p) => sum + p.duration, 0) / 60)}
            </Text>
            <Text style={styles.statLabel}>Min Total</Text>
          </View>
        </View>

        {recentProjects.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>{t('home.recentProjects')}</Text>
            <View style={styles.projectsList}>
              {recentProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onPress={() => handleProjectPress(project.id)}
                />
              ))}
            </View>
          </>
        )}

        <Card style={styles.card}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing.sm }}>
            <Ionicons name="sparkles" size={20} color={Colors.primary} />
            <Text style={styles.sectionTitle}>{t('home.aiSuggestions')}</Text>
          </View>
          <Text style={[styles.cardText, { marginTop: Spacing.md }]}>
            AI features coming in Phase 6+
          </Text>
        </Card>
      </ScrollView>
    </SafeAreaWrapper>
  );
}
