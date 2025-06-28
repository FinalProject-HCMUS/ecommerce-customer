import localizationConstants from '../constants/localization';
import { getCurrentLanguage } from '../helpers/localization';

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat(
    getCurrentLanguage() === localizationConstants.REGIONS.vi.key
      ? localizationConstants.VN
      : localizationConstants.EN,
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
  ).format(date);
};

const formatTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export { formatDate, formatTime };
