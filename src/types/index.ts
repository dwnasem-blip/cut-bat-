export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  userId: string;
  title: string;
  description?: string;
  thumbnail?: string;
  duration: number; // in seconds
  aspectRatio: AspectRatio;
  createdAt: string;
  updatedAt: string;
}

export type AspectRatio = '9:16' | '16:9' | '1:1';

export interface VideoClip {
  id: string;
  projectId: string;
  url: string;
  duration: number;
  type: 'video' | 'image' | 'ai-generated';
  position: number; // in timeline
  createdAt: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export interface FormErrors {
  [key: string]: string;
}
