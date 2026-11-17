import { create } from 'zustand';
import { AuthState, User } from '@/types';
import { authService } from '@/services/supabase';

interface AuthStoreState extends AuthState {
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  signUp: (email: string, password: string) => Promise<boolean>;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthStoreState>((set, get) => ({
  isAuthenticated: false,
  user: null,
  token: null,
  loading: false,
  error: null,

  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),

  signUp: async (email: string, password: string) => {
    set({ loading: true, error: null });
    const { user, error } = await authService.signUp(email, password);

    if (error) {
      set({ loading: false, error: error.message });
      return false;
    }

    if (user) {
      set({
        user: {
          id: user.id,
          email: user.email,
          name: null,
        },
        isAuthenticated: true,
        loading: false,
      });
      return true;
    }

    set({ loading: false, error: 'Sign up failed' });
    return false;
  },

  signIn: async (email: string, password: string) => {
    set({ loading: true, error: null });
    const { user, error } = await authService.signIn(email, password);

    if (error) {
      set({ loading: false, error: error.message });
      return false;
    }

    if (user) {
      set({
        user: {
          id: user.id,
          email: user.email,
          name: null,
        },
        isAuthenticated: true,
        loading: false,
      });
      return true;
    }

    set({ loading: false, error: 'Sign in failed' });
    return false;
  },

  signOut: async () => {
    set({ loading: true });
    await authService.signOut();
    set({
      isAuthenticated: false,
      user: null,
      token: null,
      loading: false,
      error: null,
    });
  },

  resetPassword: async (email: string) => {
    set({ loading: true, error: null });
    const { error } = await authService.resetPassword(email);

    if (error) {
      set({ loading: false, error: error.message });
      return false;
    }

    set({ loading: false });
    return true;
  },

  logout: () =>
    set({
      isAuthenticated: false,
      user: null,
      token: null,
      error: null,
    }),
}));
