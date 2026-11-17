import { getLocales } from 'react-native-localize';
import { I18n } from 'i18n-js';
import { I18nManager } from 'react-native';
import en from '@/locales/en.json';
import ar from '@/locales/ar.json';

export const i18n = new I18n({
  en: { ...en },
  ar: { ...ar },
});

i18n.locale = getLocales()[0].languageCode || 'en';
i18n.enableFallback = true;
i18n.defaultLocale = 'en';

// Set RTL for Arabic
if (i18n.locale === 'ar') {
  I18nManager.forceRTL(true);
} else {
  I18nManager.forceRTL(false);
}

export const isRTL = i18n.locale === 'ar';

export const setLanguage = (lang: 'en' | 'ar') => {
  i18n.locale = lang;
  if (lang === 'ar') {
    I18nManager.forceRTL(true);
  } else {
    I18nManager.forceRTL(false);
  }
};

export const t = (key: string, options?: any) => {
  return i18n.t(key, options);
};
