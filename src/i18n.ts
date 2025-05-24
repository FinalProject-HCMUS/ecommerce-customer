import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';

import localizationConstants from './constants/localization';
import { getCurrentLanguage } from './helpers/localization';

const { RESOURCES, REGIONS } = localizationConstants;

i18n.use(initReactI18next).init({
  resources: RESOURCES,
  lng: getCurrentLanguage(),
  fallbackLng: REGIONS.vi.key,

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
