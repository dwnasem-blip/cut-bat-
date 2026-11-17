import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Project } from '@/types';
import { Colors } from '@/utils/colors';
import { Spacing } from '@/utils/spacing';
import { Typography } from '@/utils/typography';

interface ProjectCardProps {
  project: Project;
  onPress?: () => void;
  onDelete?: () => void;
}

export const ProjectCard = ({ project, onPress, onDelete }: ProjectCardProps) => {
  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return 'Unknown';
    }
  };

  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: Colors.cards,
      borderRadius: 12,
      overflow: 'hidden',
      marginBottom: Spacing.lg,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    touchable: {
      flexDirection: 'column',
    },
    thumbnailContainer: {
      width: '100%',
      aspectRatio: 16 / 9,
      backgroundColor: Colors.background,
      position: 'relative',
    },
    thumbnail: {
      width: '100%',
      height: '100%',
    },
    playOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    playIcon: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: Colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    info: {
      padding: Spacing.md,
    },
    titleRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: Spacing.sm,
    },
    title: {
      ...Typography.body,
      color: Colors.white,
      flex: 1,
    },
    deleteButton: {
      padding: Spacing.sm,
    },
    metadata: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    metadataText: {
      ...Typography.bodySmall,
      color: Colors.textSecondary,
    },
    durationBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.xs,
    },
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.touchable}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <View style={styles.thumbnailContainer}>
          {project.thumbnail && (
            <Image source={{ uri: project.thumbnail }} style={styles.thumbnail} />
          )}
          <View style={styles.playOverlay}>
            <View style={styles.playIcon}>
              <Ionicons name="play" size={24} color={Colors.white} />
            </View>
          </View>
        </View>

        <View style={styles.info}>
          <View style={styles.titleRow}>
            <Text style={styles.title} numberOfLines={1}>
              {project.title}
            </Text>
            {onDelete && (
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
              >
                <Ionicons name="trash" size={20} color={Colors.textSecondary} />
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.metadata}>
            <Text style={styles.metadataText}>
              {formatDate(project.createdAt)}
            </Text>
            <View style={styles.durationBadge}>
              <Ionicons name="time" size={14} color={Colors.textSecondary} />
              <Text style={styles.metadataText}>
                {formatDuration(project.duration)}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};
