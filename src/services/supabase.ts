import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export interface AuthUser {
  id: string;
  email: string;
  user_metadata?: Record<string, any>;
}

export interface AuthError {
  message: string;
  status?: number;
}

export const authService = {
  async signUp(email: string, password: string): Promise<{ user: AuthUser; error: null } | { user: null; error: AuthError }> {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { email },
        },
      });

      if (error) {
        return { user: null, error: { message: error.message, status: error.status } };
      }

      if (data.user) {
        // Create user profile
        const { error: profileError } = await supabase.from('user_profiles').insert({
          id: data.user.id,
          email: data.user.email,
          name: null,
          avatar_url: null,
        });

        if (profileError && profileError.code !== 'PGRST103') {
          console.error('Profile creation error:', profileError);
        }

        return {
          user: {
            id: data.user.id,
            email: data.user.email || '',
            user_metadata: data.user.user_metadata,
          },
          error: null,
        };
      }

      return { user: null, error: { message: 'Sign up failed' } };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred';
      return { user: null, error: { message } };
    }
  },

  async signIn(email: string, password: string): Promise<{ user: AuthUser; error: null } | { user: null; error: AuthError }> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { user: null, error: { message: error.message, status: error.status } };
      }

      if (data.user) {
        return {
          user: {
            id: data.user.id,
            email: data.user.email || '',
            user_metadata: data.user.user_metadata,
          },
          error: null,
        };
      }

      return { user: null, error: { message: 'Sign in failed' } };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred';
      return { user: null, error: { message } };
    }
  },

  async signOut(): Promise<{ error: null } | { error: AuthError }> {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        return { error: { message: error.message, status: error.status } };
      }

      return { error: null };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred';
      return { error: { message } };
    }
  },

  async resetPassword(email: string): Promise<{ error: null } | { error: AuthError }> {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'com.cutbatai.app://reset-password',
      });

      if (error) {
        return { error: { message: error.message, status: error.status } };
      }

      return { error: null };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred';
      return { error: { message } };
    }
  },

  async getSession() {
    try {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        return { session: null, error: { message: error.message } };
      }

      return { session: data.session, error: null };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred';
      return { session: null, error: { message } };
    }
  },

  async getCurrentUser(): Promise<AuthUser | null> {
    try {
      const { data, error } = await supabase.auth.getUser();

      if (error || !data.user) {
        return null;
      }

      return {
        id: data.user.id,
        email: data.user.email || '',
        user_metadata: data.user.user_metadata,
      };
    } catch (err) {
      return null;
    }
  },

  onAuthStateChange(callback: (user: AuthUser | null) => void) {
    return supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        callback({
          id: session.user.id,
          email: session.user.email || '',
          user_metadata: session.user.user_metadata,
        });
      } else {
        callback(null);
      }
    });
  },
};
