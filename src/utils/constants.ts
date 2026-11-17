export const AppConstants = {
  APP_NAME: 'CUT BAT AI',
  APP_TAGLINE: 'Your Vision. Our Intelligence.',
  APP_VERSION: '1.0.0',

  // Navigation
  ROUTES: {
    AUTH_LOGIN: '/auth/login',
    AUTH_REGISTER: '/auth/register',
    AUTH_FORGOT_PASSWORD: '/auth/forgot-password',
    HOME: '/home',
    AI_STUDIO: '/ai-studio',
    EDITOR: '/editor',
    PROJECTS: '/projects',
    PROFILE: '/profile',
  },

  // Languages
  LANGUAGES: {
    EN: 'en',
    AR: 'ar',
  } as const,

  // Validation
  VALIDATION: {
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PASSWORD_MIN_LENGTH: 6,
    PASSWORD_MIN_COMPLEXITY: 8,
  },
};

export type LanguageCode = typeof AppConstants.LANGUAGES[keyof typeof AppConstants.LANGUAGES];
