import { createI18n } from 'vue-i18n';
import { datetimeFormats } from '@/locales/locales';

const isSerbian = () => {
  const userLanguages = navigator.languages || [navigator.language];
  return userLanguages.some((lang) => lang.startsWith('sr'));
};

export const i18n = createI18n({
  locale: isSerbian() ? 'sr' : 'en',
  fallbackLocale: 'en',
  datetimeFormats,
});
