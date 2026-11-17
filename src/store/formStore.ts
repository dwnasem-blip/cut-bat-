import { create } from 'zustand';
import { FormErrors } from '@/types';

interface FormStoreState {
  loginEmail: string;
  loginPassword: string;
  loginRememberMe: boolean;
  loginErrors: FormErrors;
  loginLoading: boolean;

  registerEmail: string;
  registerPassword: string;
  registerConfirmPassword: string;
  registerAcceptTerms: boolean;
  registerErrors: FormErrors;
  registerLoading: boolean;

  forgotPasswordEmail: string;
  forgotPasswordErrors: FormErrors;
  forgotPasswordLoading: boolean;
  forgotPasswordSent: boolean;

  // Login actions
  setLoginEmail: (email: string) => void;
  setLoginPassword: (password: string) => void;
  setLoginRememberMe: (rememberMe: boolean) => void;
  setLoginErrors: (errors: FormErrors) => void;
  setLoginLoading: (loading: boolean) => void;
  clearLoginForm: () => void;

  // Register actions
  setRegisterEmail: (email: string) => void;
  setRegisterPassword: (password: string) => void;
  setRegisterConfirmPassword: (password: string) => void;
  setRegisterAcceptTerms: (accept: boolean) => void;
  setRegisterErrors: (errors: FormErrors) => void;
  setRegisterLoading: (loading: boolean) => void;
  clearRegisterForm: () => void;

  // Forgot password actions
  setForgotPasswordEmail: (email: string) => void;
  setForgotPasswordErrors: (errors: FormErrors) => void;
  setForgotPasswordLoading: (loading: boolean) => void;
  setForgotPasswordSent: (sent: boolean) => void;
  clearForgotPasswordForm: () => void;
}

export const useFormStore = create<FormStoreState>((set) => ({
  // Login initial state
  loginEmail: '',
  loginPassword: '',
  loginRememberMe: false,
  loginErrors: {},
  loginLoading: false,

  // Register initial state
  registerEmail: '',
  registerPassword: '',
  registerConfirmPassword: '',
  registerAcceptTerms: false,
  registerErrors: {},
  registerLoading: false,

  // Forgot password initial state
  forgotPasswordEmail: '',
  forgotPasswordErrors: {},
  forgotPasswordLoading: false,
  forgotPasswordSent: false,

  // Login actions
  setLoginEmail: (email) => set({ loginEmail: email }),
  setLoginPassword: (password) => set({ loginPassword: password }),
  setLoginRememberMe: (rememberMe) => set({ loginRememberMe: rememberMe }),
  setLoginErrors: (errors) => set({ loginErrors: errors }),
  setLoginLoading: (loading) => set({ loginLoading: loading }),
  clearLoginForm: () =>
    set({
      loginEmail: '',
      loginPassword: '',
      loginRememberMe: false,
      loginErrors: {},
      loginLoading: false,
    }),

  // Register actions
  setRegisterEmail: (email) => set({ registerEmail: email }),
  setRegisterPassword: (password) => set({ registerPassword: password }),
  setRegisterConfirmPassword: (password) => set({ registerConfirmPassword: password }),
  setRegisterAcceptTerms: (accept) => set({ registerAcceptTerms: accept }),
  setRegisterErrors: (errors) => set({ registerErrors: errors }),
  setRegisterLoading: (loading) => set({ registerLoading: loading }),
  clearRegisterForm: () =>
    set({
      registerEmail: '',
      registerPassword: '',
      registerConfirmPassword: '',
      registerAcceptTerms: false,
      registerErrors: {},
      registerLoading: false,
    }),

  // Forgot password actions
  setForgotPasswordEmail: (email) => set({ forgotPasswordEmail: email }),
  setForgotPasswordErrors: (errors) => set({ forgotPasswordErrors: errors }),
  setForgotPasswordLoading: (loading) => set({ forgotPasswordLoading: loading }),
  setForgotPasswordSent: (sent) => set({ forgotPasswordSent: sent }),
  clearForgotPasswordForm: () =>
    set({
      forgotPasswordEmail: '',
      forgotPasswordErrors: {},
      forgotPasswordLoading: false,
      forgotPasswordSent: false,
    }),
}));
