import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MediaAsset } from '@/services/mediaService';
import { useI18n } from '@/hooks/useI18n';
import { Colors } from '@/utils/colors';
import { Spacing } from '@/utils/spacing';
import { Typography } from '@/utils/typography';

interface VideoImportBottomSheetProps {
  mediaAssets: MediaAsset[];
  loading: boolean;
  onSelect: (asset: MediaAsset) => void;
  onClose: () => void;
}

export const VideoImportBottomSheet = ({
  mediaAssets,
  loading,
  onSelect,
  onClose,
}: VideoImportBottomSheetProps) => {
  const { t } = useI18n();

  const formatDuration = (ms: number): string => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const renderMediaItem = ({ item }: { item: MediaAsset }) => (
    <TouchableOpacity
      style={styles.mediaItem}
      onPress={() => onSelect(item)}
    >
      {item.thumbnail && (
        <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
      )}
      <View style={styles.itemInfo}>
        <View style={styles.durationBadge}>
          <Ionicons name="time" size={12} color={Colors.white} />
          <Text style={styles.durationText}>{formatDuration(item.duration)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const styles = StyleSheet.create({
    container: {
      backgroundColor: Colors.cards,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingTop: Spacing.lg,
      paddingBottom: Spacing.lg,
      maxHeight: '80%',
    },
    header: {
      paddingHorizontal: Spacing.lg,
      marginBottom: Spacing.lg,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    title: {
      ...Typography.h3,
      color: Colors.white,
    },
    closeButton: {
      padding: Spacing.sm,
    },
    mediaGrid: {
      paddingHorizontal: Spacing.lg,
    },
    mediaItem: {
      marginBottom: Spacing.md,
      borderRadius: 8,
      overflow: 'hidden',
      backgroundColor: Colors.background,
      position: 'relative',
    },
    thumbnail: {
      width: '100%',
      aspectRatio: 16 / 9,
    },
    itemInfo: {
      position: 'absolute',
      bottom: Spacing.sm,
      right: Spacing.sm,
    },
    durationBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      paddingHorizontal: Spacing.sm,
      paddingVertical: 2,
      borderRadius: 4,
    },
    durationText: {
      color: Colors.white,
      fontSize: 12,
      fontWeight: '600',
    },
    loadingContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: Spacing.xl,
    },
    emptyContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: Spacing.xl,
    },
    emptyText: {
      ...Typography.body,
      color: Colors.textSecondary,
      marginTop: Spacing.md,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Import Video</Text>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Ionicons name="close" size={24} color={Colors.white} />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      ) : mediaAssets.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="videocam-off" size={40} color={Colors.textSecondary} />
          <Text style={styles.emptyText}>No videos found</Text>
        </View>
      ) : (
        <FlatList
          data={mediaAssets}
          renderItem={renderMediaItem}
          keyExtractor={(item) => item.id}
          scrollEnabled={true}
          style={styles.mediaGrid}
        />
      )}
    </View>
  );
};
