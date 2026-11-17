import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaWrapper } from '@/components/common/SafeAreaWrapper';
import { Button } from '@/components/common/Button';
import { VideoPlayer } from '@/components/video/VideoPlayer';
import { useProject } from '@/hooks/useProject';
import { useEditorStore } from '@/store/editorStore';
import { useI18n } from '@/hooks/useI18n';
import { Colors } from '@/utils/colors';
import { Spacing } from '@/utils/spacing';
import { Typography } from '@/utils/typography';

export default function EditorScreen() {
  const router = useRouter();
  const { t } = useI18n();
  const { currentProject } = useProject();
  const { currentTime, duration, isPlaying, play, pause, setDuration } = useEditorStore();

  useEffect(() => {
    if (!currentProject) {
      router.replace('/(main)/projects');
    }
  }, [currentProject]);

  if (!currentProject) {
    return null;
  }

  const formatTime = (ms: number): string => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.background },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: Spacing.lg,
      paddingVertical: Spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: Colors.border,
    },
    title: { ...Typography.h3, color: Colors.white, flex: 1 },
    backButton: { padding: Spacing.sm },
    content: { flex: 1, padding: Spacing.lg },
    videoContainer: { marginBottom: Spacing.lg },
    controls: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
    playButton: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: Colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    timeText: { ...Typography.body, color: Colors.white, minWidth: 80 },
    timelineContainer: {
      marginTop: Spacing.lg,
      padding: Spacing.md,
      backgroundColor: Colors.cards,
      borderRadius: 8,
    },
    timelineText: { ...Typography.bodySmall, color: Colors.textSecondary, textAlign: 'center' },
    buttonRow: { flexDirection: 'row', gap: Spacing.md, marginTop: Spacing.lg },
  });

  return (
    <SafeAreaWrapper>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={24} color={Colors.white} />
          </TouchableOpacity>
          <Text style={styles.title} numberOfLines={1}>
            {currentProject.title}
          </Text>
        </View>

        <ScrollView style={styles.content}>
          <View style={styles.videoContainer}>
            <VideoPlayer
              uri={currentProject.thumbnail || 'https://via.placeholder.com/400x300'}
            />
          </View>

          <View style={styles.controls}>
            <TouchableOpacity
              style={styles.playButton}
              onPress={isPlaying ? pause : play}
            >
              <Ionicons
                name={isPlaying ? 'pause' : 'play'}
                size={24}
                color={Colors.white}
              />
            </TouchableOpacity>
            <Text style={styles.timeText}>
              {formatTime(currentTime)} / {formatTime(duration)}
            </Text>
          </View>

          <View style={styles.timelineContainer}>
            <Text style={styles.timelineText}>
              {t('editor.title')} - Phase 5 Coming Soon
            </Text>
            <Text style={styles.timelineText}>
              Multi-track support, clip trimming, and real-time preview
            </Text>
          </View>

          <View style={styles.buttonRow}>
            <Button
              title={t('editor.undo')}
              onPress={() => {}}
              variant="secondary"
              fullWidth
              disabled
            />
            <Button
              title={t('editor.redo')}
              onPress={() => {}}
              variant="secondary"
              fullWidth
              disabled
            />
          </View>

          <Button
            title={t('editor.export')}
            onPress={() => {}}
            variant="primary"
            fullWidth
            style={{ marginTop: Spacing.lg }}
            disabled
          />
        </ScrollView>
      </View>
    </SafeAreaWrapper>
  );
}
