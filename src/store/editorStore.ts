import { create } from 'zustand';
import { Project } from '@/types';

export interface TimelineClip {
  id: string;
  trackId: string;
  videoUri: string;
  startTime: number; // Timeline position in ms
  duration: number;
  trimStart?: number;
  trimEnd?: number;
}

export interface TimelineTrack {
  id: string;
  clips: TimelineClip[];
  muted?: boolean;
  type: 'video' | 'audio';
}

interface EditorState {
  currentProject: Project | null;
  tracks: TimelineTrack[];
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  selectedClipId: string | null;
  error: string | null;

  // Actions
  setCurrentProject: (project: Project | null) => void;
  setTracks: (tracks: TimelineTrack[]) => void;
  addTrack: (type: 'video' | 'audio') => void;
  removeTrack: (trackId: string) => void;

  addClip: (trackId: string, clip: TimelineClip) => void;
  removeClip: (trackId: string, clipId: string) => void;
  moveClip: (trackId: string, clipId: string, startTime: number) => void;
  trimClip: (trackId: string, clipId: string, trimStart: number, trimEnd: number) => void;

  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  play: () => void;
  pause: () => void;
  seek: (time: number) => void;

  selectClip: (clipId: string | null) => void;
  setError: (error: string | null) => void;
}

let trackCounter = 0;
let clipCounter = 0;

const generateTrackId = (): string => `track_${++trackCounter}`;
const generateClipId = (): string => `clip_${++clipCounter}`;

export const useEditorStore = create<EditorState>((set, get) => ({
  currentProject: null,
  tracks: [],
  currentTime: 0,
  duration: 0,
  isPlaying: false,
  selectedClipId: null,
  error: null,

  setCurrentProject: (project) => set({ currentProject: project }),

  setTracks: (tracks) => set({ tracks }),

  addTrack: (type) =>
    set((state) => ({
      tracks: [
        ...state.tracks,
        {
          id: generateTrackId(),
          clips: [],
          muted: false,
          type,
        },
      ],
    })),

  removeTrack: (trackId) =>
    set((state) => ({
      tracks: state.tracks.filter((t) => t.id !== trackId),
    })),

  addClip: (trackId, clipData) =>
    set((state) => ({
      tracks: state.tracks.map((track) =>
        track.id === trackId
          ? {
              ...track,
              clips: [...track.clips, { ...clipData, id: generateClipId() }],
            }
          : track
      ),
    })),

  removeClip: (trackId, clipId) =>
    set((state) => ({
      tracks: state.tracks.map((track) =>
        track.id === trackId
          ? { ...track, clips: track.clips.filter((c) => c.id !== clipId) }
          : track
      ),
    })),

  moveClip: (trackId, clipId, startTime) =>
    set((state) => ({
      tracks: state.tracks.map((track) =>
        track.id === trackId
          ? {
              ...track,
              clips: track.clips.map((clip) =>
                clip.id === clipId ? { ...clip, startTime } : clip
              ),
            }
          : track
      ),
    })),

  trimClip: (trackId, clipId, trimStart, trimEnd) =>
    set((state) => ({
      tracks: state.tracks.map((track) =>
        track.id === trackId
          ? {
              ...track,
              clips: track.clips.map((clip) =>
                clip.id === clipId
                  ? { ...clip, trimStart, trimEnd }
                  : clip
              ),
            }
          : track
      ),
    })),

  setCurrentTime: (time) => set({ currentTime: time }),

  setDuration: (duration) => set({ duration }),

  play: () => set({ isPlaying: true }),

  pause: () => set({ isPlaying: false }),

  seek: (time) => set({ currentTime: time }),

  selectClip: (clipId) => set({ selectedClipId: clipId }),

  setError: (error) => set({ error }),
}));
