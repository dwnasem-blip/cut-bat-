import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Video, AVPlaybackStatus, AVPlaybackStatusToSet } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/utils/colors';
import { Spacing } from '@/utils/spacing';
import { Typography } from '@/utils/typography';

interface VideoPlayerProps {
  uri: string;
  onError?: (error: Error) => void;
}

export const VideoPlayer = ({ uri, onError }: VideoPlayerProps) => {
  const videoRef = useRef<Video>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const handlePlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      setIsLoading(false);
      setCurrentTime(status.positionMillis || 0);
      setDuration(status.durationMillis || 0);
      setIsPlaying(status.isPlaying);

      if (status.didJustFinish) {
        setIsPlaying(false);
      }
    }
  };

  const handlePlayPause = async () => {
    if (videoRef.current) {
      if (isPlaying) {
        await videoRef.current.pauseAsync();
      } else {
        await videoRef.current.playAsync();
      }
    }
  };

  const formatTime = (ms: number): string => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const styles = StyleSheet.create({
    container: {
      width: '100%',
      aspectRatio: 16 / 9,
      backgroundColor: Colors.background,
      borderRadius: 8,
      overflow: 'hidden',
    },
    videoContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    video: {
      width: '100%',
      height: '100%',
    },
    controls: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.sm,
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      gap: Spacing.md,
    },
    playButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: Colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    timeText: {
      ...Typography.bodySmall,
      color: Colors.white,
      flex: 1,
    },
    durationText: {
      ...Typography.bodySmall,
      color: Colors.textSecondary,
    },
    loadingContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.videoContainer}>
        <Video
          ref={videoRef}
          source={{ uri }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode={undefined}
          shouldPlay={false}
          onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
          onError={(error) => {
            if (onError) {
              onError(new Error(`Video playback error: ${error}`));
            }
          }}
          style={styles.video}
        />
        {isLoading && (
          <View style={styles.loadingContainer}>
            <Ionicons name="hourglass" size={40} color={Colors.primary} />
          </View>
        )}
      </View>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.playButton} onPress={handlePlayPause}>
          <Ionicons
            name={isPlaying ? 'pause' : 'play'}
            size={20}
            color={Colors.white}
          />
        </TouchableOpacity>

        <Text style={styles.timeText}>
          {formatTime(currentTime)} / {formatTime(duration)}
        </Text>
      </View>
    </View>
  );
};
