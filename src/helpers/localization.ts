import localizationConstants from '../constants/localization';
import localStorageConstants from '../constants/localStorage';

const { LOCALIZATION } = localStorageConstants;
const { REGIONS } = localizationConstants;

const getCurrentLanguage = () => {
  const language = localStorage.getItem(LOCALIZATION);
  return language || REGIONS.vi.key;
};

const changeLanguage = (language: string) => {
  if (language === getCurrentLanguage()) return;
  localStorage.setItem(LOCALIZATION, language);
  window.location.reload();
};

export { getCurrentLanguage, changeLanguage };
