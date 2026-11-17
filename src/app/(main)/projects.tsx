import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaWrapper } from '@/components/common/SafeAreaWrapper';
import { Button } from '@/components/common/Button';
import { ProjectCard } from '@/components/project/ProjectCard';
import { VideoImportBottomSheet } from '@/features/video-import/VideoImportBottomSheet';
import { useProject } from '@/hooks/useProject';
import { useMedia } from '@/hooks/useMedia';
import { useAuth } from '@/hooks/useAuth';
import { useI18n } from '@/hooks/useI18n';
import { Project } from '@/types';
import { Colors } from '@/utils/colors';
import { Spacing } from '@/utils/spacing';
import { Typography } from '@/utils/typography';

export default function ProjectsScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const { t } = useI18n();
  const { projects, addProject, deleteProject, setCurrentProject } = useProject();
  const { mediaAssets, loading: mediaLoading, loadMediaLibrary, requestPermission } = useMedia();
  const [showImport, setShowImport] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    if (showImport) {
      loadMediaLibrary();
    }
  }, [showImport]);

  const handleImportPress = async () => {
    const hasPermission = await requestPermission();
    if (hasPermission) {
      setShowImport(true);
    }
  };

  const handleSelectMedia = async (asset: any) => {
    if (!user) return;

    setIsCreating(true);
    try {
      const newProject: Project = {
        id: `project_${Date.now()}`,
        userId: user.id,
        title: `Project ${new Date().toLocaleDateString()}`,
        thumbnail: asset.thumbnail,
        duration: asset.duration,
        aspectRatio: '16:9',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      addProject(newProject);
      setCurrentProject(newProject);
      setShowImport(false);
      router.push('/(main)/editor');
    } finally {
      setIsCreating(false);
    }
  };

  const handleProjectPress = (project: Project) => {
    setCurrentProject(project);
    router.push('/(main)/editor');
  };

  const styles = StyleSheet.create({
    container: { flex: 1, padding: Spacing.lg, backgroundColor: Colors.background },
    header: { marginBottom: Spacing.lg },
    title: { ...Typography.h2, color: Colors.white, marginBottom: Spacing.sm },
    subtitle: { ...Typography.bodySmall, color: Colors.textSecondary },
    buttonContainer: { marginBottom: Spacing.lg },
    list: { flex: 1 },
    empty: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyText: { ...Typography.body, color: Colors.textSecondary, marginTop: Spacing.md },
    loadingContainer: { justifyContent: 'center', alignItems: 'center', padding: Spacing.lg },
  });

  const renderEmpty = () => (
    <View style={styles.empty}>
      <Text style={styles.emptyText}>{t('projects.noProjects')}</Text>
    </View>
  );

  return (
    <SafeAreaWrapper>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{t('projects.title')}</Text>
          <Text style={styles.subtitle}>
            {projects.length} {projects.length === 1 ? 'project' : 'projects'}
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title={`+ ${t('projects.newProject')}`}
            onPress={handleImportPress}
            variant="primary"
            fullWidth
          />
        </View>

        {projects.length === 0 ? (
          renderEmpty()
        ) : (
          <FlatList
            data={projects}
            renderItem={({ item }) => (
              <ProjectCard
                project={item}
                onPress={() => handleProjectPress(item)}
                onDelete={() => deleteProject(item.id)}
              />
            )}
            keyExtractor={(item) => item.id}
            style={styles.list}
          />
        )}

        <Modal visible={showImport} animationType="slide" transparent>
          {mediaLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={Colors.primary} />
            </View>
          ) : (
            <VideoImportBottomSheet
              mediaAssets={mediaAssets}
              loading={mediaLoading}
              onSelect={handleSelectMedia}
              onClose={() => setShowImport(false)}
            />
          )}
        </Modal>

        {isCreating && (
          <View style={[StyleSheet.absoluteFill, styles.loadingContainer]}>
            <ActivityIndicator size="large" color={Colors.primary} />
          </View>
        )}
      </View>
    </SafeAreaWrapper>
  );
}
