import { useState } from 'react';
import { mediaService, MediaAsset } from '@/services/mediaService';

export const useMedia = () => {
  const [mediaAssets, setMediaAssets] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadMediaLibrary = async () => {
    setLoading(true);
    setError(null);
    try {
      const assets = await mediaService.loadVideoAssets();
      setMediaAssets(assets);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load media';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const requestPermission = async (): Promise<boolean> => {
    try {
      const granted = await mediaService.requestMediaLibraryPermission();
      if (!granted) {
        setError('Media library permission denied');
      }
      return granted;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Permission error';
      setError(errorMessage);
      return false;
    }
  };

  const generateThumbnail = async (uri: string, timeMs?: number): Promise<string | null> => {
    try {
      return await mediaService.generateThumbnail(uri, timeMs);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Thumbnail generation failed';
      setError(errorMessage);
      return null;
    }
  };

  return {
    mediaAssets,
    loading,
    error,
    loadMediaLibrary,
    requestPermission,
    generateThumbnail,
  };
};
