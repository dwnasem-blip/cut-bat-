import { useCallback, useState, useEffect } from 'react';
import { i18n, isRTL, setLanguage } from '@/utils/i18n';

interface UseI18nReturn {
  t: (key: string, options?: any) => string;
  locale: string;
  isRTL: boolean;
  setLocale: (locale: 'en' | 'ar') => void;
}

export const useI18n = (): UseI18nReturn => {
  const [, setRender] = useState({});

  const handleSetLocale = useCallback((locale: 'en' | 'ar') => {
    setLanguage(locale);
    setRender({});
  }, []);

  useEffect(() => {
    setRender({});
  }, [i18n.locale]);

  return {
    t: (key: string, options?: any) => i18n.t(key, options),
    locale: i18n.locale,
    isRTL,
    setLocale: handleSetLocale,
  };
};
