import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/utils/colors';
import { Spacing } from '@/utils/spacing';

interface VideoThumbnailProps {
  uri: string;
  duration: number;
  onPress?: () => void;
}

export const VideoThumbnail = ({ uri, duration, onPress }: VideoThumbnailProps) => {
  const formatDuration = (ms: number): string => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const styles = StyleSheet.create({
    container: {
      position: 'relative',
      aspectRatio: 16 / 9,
      borderRadius: 8,
      overflow: 'hidden',
      backgroundColor: Colors.background,
    },
    thumbnail: {
      width: '100%',
      height: '100%',
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    playIcon: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: Colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    durationBadge: {
      position: 'absolute',
      bottom: Spacing.sm,
      right: Spacing.sm,
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
  });

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri }} style={styles.thumbnail} />
      <View style={styles.overlay}>
        <View style={styles.playIcon}>
          <Ionicons name="play" size={24} color={Colors.white} />
        </View>
      </View>
      <View style={styles.durationBadge}>
        <Text style={styles.durationText}>{formatDuration(duration)}</Text>
      </View>
    </TouchableOpacity>
  );
};
