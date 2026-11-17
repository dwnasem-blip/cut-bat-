import * as MediaLibrary from 'expo-media-library';
import * as VideoThumbnails from 'expo-video-thumbnails';
import { supabase } from './supabase';

export interface MediaAsset {
  id: string;
  uri: string;
  duration: number;
  width: number;
  height: number;
  thumbnail?: string;
}

export const mediaService = {
  async requestMediaLibraryPermission(): Promise<boolean> {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      return status === 'granted';
    } catch (err) {
      console.error('Permission request failed:', err);
      return false;
    }
  },

  async getMediaLibraryPermission(): Promise<boolean> {
    try {
      const { status } = await MediaLibrary.getPermissionsAsync();
      return status === 'granted';
    } catch (err) {
      console.error('Get permission failed:', err);
      return false;
    }
  },

  async loadVideoAssets(): Promise<MediaAsset[]> {
    try {
      const hasPermission = await mediaService.getMediaLibraryPermission();
      if (!hasPermission) {
        const granted = await mediaService.requestMediaLibraryPermission();
        if (!granted) return [];
      }

      const albums = await MediaLibrary.getAlbumsAsync();
      const cameraRoll = albums.find((a) => a.title === 'Camera Roll') || albums[0];

      if (!cameraRoll) return [];

      const media = await MediaLibrary.getAssetsAsync({
        album: cameraRoll,
        mediaType: 'video',
        first: 100,
      });

      const assets: MediaAsset[] = [];
      for (const asset of media.assets) {
        try {
          const thumbnail = await VideoThumbnails.getThumbnailAsync(asset.uri, {
            time: 0,
          });

          assets.push({
            id: asset.id,
            uri: asset.uri,
            duration: asset.duration,
            width: asset.width,
            height: asset.height,
            thumbnail: thumbnail.uri,
          });
        } catch (err) {
          console.warn('Thumbnail generation failed for asset:', asset.id);
          assets.push({
            id: asset.id,
            uri: asset.uri,
            duration: asset.duration,
            width: asset.width,
            height: asset.height,
          });
        }
      }

      return assets;
    } catch (err) {
      console.error('Load video assets failed:', err);
      return [];
    }
  },

  async generateThumbnail(uri: string, timeMs: number = 0): Promise<string | null> {
    try {
      const thumbnail = await VideoThumbnails.getThumbnailAsync(uri, {
        time: timeMs,
      });
      return thumbnail.uri;
    } catch (err) {
      console.error('Generate thumbnail failed:', err);
      return null;
    }
  },

  async saveProjectToSupabase(
    userId: string,
    projectName: string,
    videoUri: string,
    thumbnailUri?: string
  ): Promise<{ id: string } | null> {
    try {
      const { data, error } = await supabase.from('projects').insert({
        user_id: userId,
        title: projectName,
        description: `Imported from camera roll`,
        video_uri: videoUri,
        thumbnail_uri: thumbnailUri,
        created_at: new Date().toISOString(),
      });

      if (error) {
        console.error('Save project failed:', error);
        return null;
      }

      return { id: data?.[0]?.id || '' };
    } catch (err) {
      console.error('Save project error:', err);
      return null;
    }
  },
};
