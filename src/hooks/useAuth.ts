import { useAuthStore } from '@/store/authStore';

export const useAuth = () => {
  const authState = useAuthStore();

  return {
    isAuthenticated: authState.isAuthenticated,
    user: authState.user,
    token: authState.token,
    loading: authState.loading,
    error: authState.error,
    setUser: authState.setUser,
    setToken: authState.setToken,
    setLoading: authState.setLoading,
    setError: authState.setError,
    setIsAuthenticated: authState.setIsAuthenticated,
    logout: authState.logout,
  };
};
