import { useFormStore } from '@/store/formStore';

export const useLoginForm = () => {
  const formState = useFormStore();

  return {
    email: formState.loginEmail,
    password: formState.loginPassword,
    rememberMe: formState.loginRememberMe,
    errors: formState.loginErrors,
    loading: formState.loginLoading,
    setEmail: formState.setLoginEmail,
    setPassword: formState.setLoginPassword,
    setRememberMe: formState.setLoginRememberMe,
    setErrors: formState.setLoginErrors,
    setLoading: formState.setLoginLoading,
    clear: formState.clearLoginForm,
  };
};

export const useRegisterForm = () => {
  const formState = useFormStore();

  return {
    email: formState.registerEmail,
    password: formState.registerPassword,
    confirmPassword: formState.registerConfirmPassword,
    acceptTerms: formState.registerAcceptTerms,
    errors: formState.registerErrors,
    loading: formState.registerLoading,
    setEmail: formState.setRegisterEmail,
    setPassword: formState.setRegisterPassword,
    setConfirmPassword: formState.setRegisterConfirmPassword,
    setAcceptTerms: formState.setRegisterAcceptTerms,
    setErrors: formState.setRegisterErrors,
    setLoading: formState.setRegisterLoading,
    clear: formState.clearRegisterForm,
  };
};

export const useForgotPasswordForm = () => {
  const formState = useFormStore();

  return {
    email: formState.forgotPasswordEmail,
    errors: formState.forgotPasswordErrors,
    loading: formState.forgotPasswordLoading,
    sent: formState.forgotPasswordSent,
    setEmail: formState.setForgotPasswordEmail,
    setErrors: formState.setForgotPasswordErrors,
    setLoading: formState.setForgotPasswordLoading,
    setSent: formState.setForgotPasswordSent,
    clear: formState.clearForgotPasswordForm,
  };
};
